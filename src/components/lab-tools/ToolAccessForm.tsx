"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error" | "redirecting";

type Props = {
  /** Tool registry slug — sent to the API to scope the request. */
  toolSlug: string;
  /** Human-readable tool name, used in status messages. */
  toolName: string;
};

export default function ToolAccessForm({ toolSlug, toolName }: Props) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [captchaSvg, setCaptchaSvg] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [captchaCode, setCaptchaCode] = useState<string>("");
  const [captchaLoading, setCaptchaLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [mountedAt] = useState(() => Date.now());

  useEffect(() => {
    fetchCaptcha();
  }, []);

  async function fetchCaptcha() {
    setCaptchaLoading(true);
    try {
      const r = await fetch("/api/lab-access/captcha");
      const data = await r.json();
      if (data.success) {
        setCaptchaSvg(data.svg);
        setCaptchaToken(data.token);
        setCaptchaCode("");
      }
    } catch (err) {
      console.error("[lab-tools] Failed to load captcha:", err);
    } finally {
      setCaptchaLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!captchaCode.trim()) {
      setStatus("error");
      setErrorMsg("Please enter the security verification code.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");
    try {
      const r = await fetch("/api/lab-access/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tool: toolSlug,
          captchaCode: captchaCode.trim(),
          captchaToken,
          _honeypot: honeypot,
          _timestamp: mountedAt,
        }),
      });
      const data = await r.json();
      if (!r.ok || !data.success) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        // Refresh captcha on failure
        fetchCaptcha();
        return;
      }
      // Already approved → server set cookie, redirect to the tool
      if (data.approved && data.redirectUrl) {
        setRedirectUrl(data.redirectUrl);
        setStatus("redirecting");
        window.location.replace(data.redirectUrl);
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
      fetchCaptcha();
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-5 sm:p-6">
        <h3 className="text-[18px] font-semibold text-green-900 mb-2">Request received</h3>
        <p className="text-[15px] text-green-800 leading-relaxed">
          Thanks — we&apos;ve sent your request to the team. You&apos;ll hear back by email within 24 hours.
          Check your inbox (and spam folder) for our reply.
        </p>
      </div>
    );
  }

  if (status === "redirecting") {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 sm:p-6">
        <h3 className="text-[18px] font-semibold text-blue-900 mb-2">Opening {toolName}…</h3>
        <p className="text-[15px] text-blue-800 leading-relaxed">
          If the redirect doesn&apos;t happen automatically,{" "}
          <a href={redirectUrl} className="font-semibold underline">click here</a> to open {toolName}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="_hp"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute opacity-0 h-0 w-0 pointer-events-none"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        aria-label="Do not fill this field"
      />

      <div>
        <label htmlFor="lab-email" className="block text-[14px] font-semibold text-neutral-800 mb-2">
          Your email address
        </label>
        <input
          id="lab-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-[15px] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {/* Security Verification (Captcha) */}
      <div className="pt-1">
        <label htmlFor="lab-captcha" className="block text-[14px] font-semibold text-neutral-800 mb-1">
          Security verification
        </label>
        <p className="text-[13px] text-neutral-500 mb-2.5">
          Enter the characters shown in the box below:
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="bg-slate-50 rounded-lg overflow-hidden border border-slate-300 shadow-sm flex items-center justify-center min-w-[150px] min-h-[48px]"
              dangerouslySetInnerHTML={{ __html: captchaSvg }}
            />
            <button
              type="button"
              onClick={fetchCaptcha}
              disabled={captchaLoading}
              title="Refresh security code"
              className="p-3 text-neutral-600 hover:text-accent hover:bg-neutral-100 rounded-lg transition-colors border border-neutral-200"
              aria-label="Generate new security code"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-5 h-5 ${captchaLoading ? "animate-spin text-accent" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1">
            <input
              id="lab-captcha"
              type="text"
              required
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck="false"
              maxLength={6}
              value={captchaCode}
              onChange={(e) => setCaptchaCode(e.target.value.toUpperCase())}
              placeholder="Enter code"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-[15px] font-mono tracking-widest uppercase focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>
      </div>

      {status === "error" && (
        <p className="text-[14px] text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto px-7 py-3 bg-accent text-white text-[15px] font-semibold rounded-full hover:bg-accent-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Checking…" : "Continue"}
      </button>
    </form>
  );
}
