"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFirst = useRef(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    window.scrollTo(0, 0);
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0.4";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.2s ease-out";
      el.style.opacity = "1";
    });
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}