"use client";

import { useState, useEffect } from "react";

type PendingItem = {
  requestId: string;
  email: string;
  approveUrl: string;
  denyUrl: string;
};

type ToolData = {
  slug: string;
  name: string;
  page: string;
  url: string;
  pending: PendingItem[];
  approved: string[];
};

export default function LabToolsAdminPage() {
  const [password, setPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const [tools, setTools] = useState<ToolData[]>([]);
  const [activeSlug, setActiveSlug] = useState<string>("src-exvivo-spectra");
  const [manualEmail, setManualEmail] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Check saved session
  useEffect(() => {
    const stored = sessionStorage.getItem("src_lab_admin_pass");
    if (stored) {
      setSavedPassword(stored);
      fetchData(stored);
    }
  }, []);

  async function fetchData(pass: string) {
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch(`/api/lab-access/admin?password=${encodeURIComponent(pass)}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        setIsAuthenticated(false);
        setAuthError(data.error || "Incorrect password");
        sessionStorage.removeItem("src_lab_admin_pass");
        return;
      }
      setIsAuthenticated(true);
      setSavedPassword(pass);
      sessionStorage.setItem("src_lab_admin_pass", pass);
      setTools(data.tools || []);
      if (data.tools && data.tools.length > 0 && !activeSlug) {
        setActiveSlug(data.tools[0].slug);
      }
    } catch {
      setAuthError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    fetchData(password.trim());
  }

  function handleLogout() {
    sessionStorage.removeItem("src_lab_admin_pass");
    setIsAuthenticated(false);
    setPassword("");
    setSavedPassword("");
    setTools([]);
  }

  async function handleAction(action: "approve" | "deny" | "revoke", email: string, requestId?: string) {
    setActionLoading(`${action}-${email}`);
    setMessage(null);
    try {
      const res = await fetch("/api/lab-access/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": savedPassword,
        },
        body: JSON.stringify({
          action,
          tool: activeSlug,
          email,
          requestId,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setMessage({ text: data.error || "Action failed", type: "error" });
        return;
      }
      setMessage({ text: data.message || "Success!", type: "success" });
      if (action === "approve" && data.launchUrl) {
        setCopiedLink(data.launchUrl);
      }
      // Refresh tool data
      await fetchData(savedPassword);
      if (action === "approve") {
        setManualEmail("");
      }
    } catch {
      setMessage({ text: "Network error performing action", type: "error" });
    } finally {
      setActionLoading(null);
    }
  }

  const activeTool = tools.find((t) => t.slug === activeSlug) || tools[0];
  const totalPending = tools.reduce((acc, t) => acc + (t.pending?.length || 0), 0);
  const totalApproved = tools.reduce((acc, t) => acc + (t.approved?.length || 0), 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-200/80 p-8 sm:p-10">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent font-semibold text-[12px] uppercase tracking-wider rounded-full mb-3">
              Staff Portal
            </span>
            <h1 className="text-[24px] font-bold text-neutral-900 tracking-tight">
              Lab Tools Administration
            </h1>
            <p className="text-[14px] text-neutral-600 mt-2">
              Sign in to manage access requests and approved researchers
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="admin-pass" className="block text-[13px] font-semibold text-neutral-700 mb-2">
                Administrator Password
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 text-[15px] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>

            {authError && (
              <p className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition disabled:opacity-50 text-[15px]"
            >
              {loading ? "Authenticating…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-[12px] font-bold rounded-full uppercase">
                Active Session
              </span>
              <span className="text-[13px] text-neutral-500">Satani Research Centre</span>
            </div>
            <h1 className="text-[28px] font-light text-neutral-900 tracking-tight mt-1">
              Lab Tools Access Management
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchData(savedPassword)}
              disabled={loading}
              className="px-4 py-2 border border-neutral-300 rounded-lg text-[14px] font-medium text-neutral-700 hover:bg-neutral-100 transition"
            >
              {loading ? "Refreshing…" : "Refresh"}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-neutral-200 rounded-lg text-[14px] font-medium text-neutral-700 hover:bg-neutral-300 transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-neutral-200/80 shadow-sm">
            <div className="text-[13px] uppercase font-semibold tracking-wider text-neutral-500">
              Total Pending Requests
            </div>
            <div className={`text-[32px] font-semibold mt-1 ${totalPending > 0 ? "text-amber-600" : "text-neutral-900"}`}>
              {totalPending}
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-neutral-200/80 shadow-sm">
            <div className="text-[13px] uppercase font-semibold tracking-wider text-neutral-500">
              Total Approved Users
            </div>
            <div className="text-[32px] font-semibold text-neutral-900 mt-1">
              {totalApproved}
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-neutral-200/80 shadow-sm">
            <div className="text-[13px] uppercase font-semibold tracking-wider text-neutral-500">
              Email-Gated Tools
            </div>
            <div className="text-[32px] font-semibold text-accent mt-1">
              {tools.length}
            </div>
          </div>
        </div>

        {/* Action feedback */}
        {message && (
          <div
            className={`p-4 rounded-xl border mb-6 text-[14px] font-medium flex items-center justify-between ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-900"
                : "bg-red-50 border-red-200 text-red-900"
            }`}
          >
            <span>{message.text}</span>
            <button onClick={() => setMessage(null)} className="text-neutral-500 hover:text-neutral-700 text-sm">
              ✕
            </button>
          </div>
        )}

        {copiedLink && (
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50 text-blue-900 mb-6">
            <div className="font-semibold text-[14px] mb-1">Direct Launch Link Generated:</div>
            <div className="text-[13px] font-mono break-all bg-white p-2.5 rounded border border-blue-200 select-all mb-2">
              {copiedLink}
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(copiedLink);
                alert("Copied launch link to clipboard!");
              }}
              className="px-3 py-1.5 bg-accent text-white text-[12px] font-semibold rounded hover:bg-accent-dark transition"
            >
              Copy Link to Clipboard
            </button>
          </div>
        )}

        {/* Tool Tabs */}
        <div className="flex border-b border-neutral-300 gap-2 mb-6 overflow-x-auto">
          {tools.map((tool) => {
            const isActive = tool.slug === activeSlug;
            const pendingCount = tool.pending?.length || 0;
            return (
              <button
                key={tool.slug}
                onClick={() => {
                  setActiveSlug(tool.slug);
                  setMessage(null);
                  setCopiedLink(null);
                }}
                className={`py-3 px-5 text-[15px] font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? "border-accent text-accent font-semibold"
                    : "border-transparent text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <span>{tool.name}</span>
                {pendingCount > 0 && (
                  <span className="px-2 py-0.5 bg-amber-500 text-white text-[11px] font-bold rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {activeTool && (
          <div className="space-y-8">
            {/* Direct Grant Access Form */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-sm">
              <h2 className="text-[17px] font-bold text-neutral-900 mb-1">
                Directly Grant Access to {activeTool.name}
              </h2>
              <p className="text-[13px] text-neutral-600 mb-4">
                Instantly approve an email without waiting for them to fill out the form.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!manualEmail.trim()) return;
                  handleAction("approve", manualEmail.trim());
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  required
                  placeholder="researcher@university.edu"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-300 text-[14px] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={actionLoading === `approve-${manualEmail}`}
                  className="px-6 py-2.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition disabled:opacity-50 text-[14px] whitespace-nowrap"
                >
                  {actionLoading === `approve-${manualEmail}` ? "Granting…" : "Grant Immediate Access"}
                </button>
              </form>
            </div>

            {/* Pending Requests */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                <div>
                  <h2 className="text-[18px] font-bold text-neutral-900">
                    Pending Access Requests ({activeTool.pending?.length || 0})
                  </h2>
                  <p className="text-[13px] text-neutral-600 mt-0.5">
                    Requests submitted via the website awaiting owner decision
                  </p>
                </div>
              </div>

              {!activeTool.pending || activeTool.pending.length === 0 ? (
                <div className="p-8 text-center text-neutral-500 text-[14px]">
                  No pending requests for {activeTool.name}.
                </div>
              ) : (
                <div className="divide-y divide-neutral-200">
                  {activeTool.pending.map((req) => (
                    <div
                      key={req.requestId}
                      className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/50 transition"
                    >
                      <div>
                        <div className="font-semibold text-neutral-900 text-[16px]">{req.email}</div>
                        <div className="text-[12px] text-neutral-500 font-mono mt-0.5">
                          ID: {req.requestId}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleAction("approve", req.email, req.requestId)}
                          disabled={actionLoading === `approve-${req.email}`}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-[13px] rounded-lg transition disabled:opacity-50 flex items-center gap-1.5"
                        >
                          <span>✅</span> Approve
                        </button>
                        <button
                          onClick={() => handleAction("deny", req.email, req.requestId)}
                          disabled={actionLoading === `deny-${req.email}`}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-[13px] rounded-lg transition disabled:opacity-50 flex items-center gap-1.5"
                        >
                          <span>❌</span> Deny
                        </button>
                        <a
                          href={req.approveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 border border-neutral-300 rounded-lg text-[13px] text-neutral-600 hover:bg-neutral-100 transition"
                        >
                          Direct Approve Link ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Approved Users */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-[18px] font-bold text-neutral-900">
                  Approved Researchers ({activeTool.approved?.length || 0})
                </h2>
                <p className="text-[13px] text-neutral-600 mt-0.5">
                  Users currently authorized to launch and access {activeTool.name}
                </p>
              </div>

              {!activeTool.approved || activeTool.approved.length === 0 ? (
                <div className="p-8 text-center text-neutral-500 text-[14px]">
                  No approved researchers yet for {activeTool.name}.
                </div>
              ) : (
                <div className="divide-y divide-neutral-200 max-h-96 overflow-y-auto">
                  {activeTool.approved.map((email) => (
                    <div
                      key={email}
                      className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-neutral-50/50 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
                        <span className="font-medium text-neutral-800 text-[15px]">{email}</span>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to revoke access for ${email}?`)) {
                            handleAction("revoke", email);
                          }
                        }}
                        disabled={actionLoading === `revoke-${email}`}
                        className="px-3 py-1.5 border border-red-200 text-red-700 hover:bg-red-50 rounded-lg text-[12px] font-semibold transition disabled:opacity-50"
                      >
                        Revoke Access
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
