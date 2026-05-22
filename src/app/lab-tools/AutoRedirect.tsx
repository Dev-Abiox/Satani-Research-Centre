"use client";

import { useEffect } from "react";

export default function AutoRedirect({
  redirectUrl,
  email,
  toolName,
  toolSlug,
}: {
  redirectUrl: string;
  email: string;
  toolName: string;
  toolSlug: string;
}) {
  useEffect(() => {
    window.location.replace(redirectUrl);
  }, [redirectUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6 pt-[64px]">
      <div className="max-w-md text-center">
        <h1 className="text-[22px] font-semibold text-neutral-900 mb-2">
          Launching {toolName}…
        </h1>
        <p className="text-neutral-600 mb-6">
          Signed in as <span className="font-medium">{email}</span>
        </p>
        <p className="text-[14px] text-neutral-500 leading-relaxed">
          If the redirect doesn&apos;t happen automatically,{" "}
          <a href={redirectUrl} className="text-accent underline inline-block py-1">
            click here
          </a>
          . Not you?{" "}
          <a
            href={`/api/lab-access/signout?tool=${toolSlug}`}
            className="text-accent underline inline-block py-1"
          >
            Switch user
          </a>
          .
        </p>
      </div>
    </div>
  );
}
