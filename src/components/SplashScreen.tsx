"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const STORAGE_KEY = "src_splash_shown";

function alreadyShown(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function SplashScreen() {
  // Hide on initial render if we've already played the splash this session.
  const [isVisible, setIsVisible] = useState(() => !alreadyShown());
  const [isFading, setIsFading] = useState(false);
  const [animationData, setAnimationData] = useState<unknown>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // If we've already shown the splash, clean up any lingering cover/nav-hide and bail
    if (alreadyShown()) {
      const cover = document.getElementById("__splash_cover");
      if (cover) cover.remove();
      document.body.style.backgroundColor = "";
      const hideNav = document.getElementById("__hide_nav");
      if (hideNav) hideNav.remove();
      return;
    }

    // First visit of this session — play the splash and remember we did
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}

    // Remove the static cover — SplashScreen takes over
    const cover = document.getElementById("__splash_cover");
    if (cover) cover.style.display = "none";

    document.body.style.overflow = "hidden";

    // Lazy-load the brain animation JSON so it doesn't bloat the initial bundle
    let cancelled = false;
    import("../../public/animations/brain-loading.json")
      .then((m) => { if (!cancelled) setAnimationData(m.default); })
      .catch(() => { if (!cancelled) setAnimationData(null); });

    // Only show the logo fallback if the animation hasn't arrived after 600 ms
    const fallbackTimer = setTimeout(() => setShowFallback(true), 600);

    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "";
        document.body.style.backgroundColor = "";
        const hideNav = document.getElementById("__hide_nav");
        if (hideNav) hideNav.remove();
      }, 400);
    }, 800);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#001222] transition-opacity duration-[400ms] ease-in-out"
      style={{ opacity: isFading ? 0 : 1 }}
    >
      <div className="w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center">
        {animationData ? (
          <Lottie animationData={animationData} loop />
        ) : showFallback ? (
          <div
            className="h-20 w-20 bg-white/90"
            style={{
              WebkitMaskImage: "url('/Logo.png')",
              maskImage: "url('/Logo.png')",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
            aria-hidden="true"
          />
        ) : null}
      </div>
    </div>
  );
}