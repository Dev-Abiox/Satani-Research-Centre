"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function ScrollToSectionInner() {
  const searchParams = useSearchParams();
  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      const el = document.getElementById(section);
      if (el) {
        setTimeout(() => {
          const top = el.getBoundingClientRect().top + window.scrollY - 64;
          window.scrollTo({ top, behavior: "smooth" });
        }, 100);
      }
    }
  }, [searchParams]);
  return null;
}

export default function ScrollToSection() {
  return (
    <Suspense fallback={null}>
      <ScrollToSectionInner />
    </Suspense>
  );
}
