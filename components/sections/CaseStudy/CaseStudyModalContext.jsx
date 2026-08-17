"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const CaseStudyModalContext = createContext(null);

export function useCaseStudyModal() {
  const ctx = useContext(CaseStudyModalContext);
  if (!ctx) throw new Error("useCaseStudyModal must be used within CaseStudyModalProvider");
  return ctx;
}

// Replaces the old `(.)case-studies/[slug]` intercepting route, which static
// export doesn't support. The modal's open/closed state and the browser URL
// are kept in sync purely via the History API (pushState on open/navigate,
// back() on close) so deep-linking and the back button still work without a
// real Next.js navigation - the actual /case-studies/[slug] route stays a
// standalone page for hard loads, crawlers, and shares.
export function CaseStudyModalProvider({ children }) {
  const [slug, setSlug] = useState(null);

  const open = useCallback((nextSlug) => {
    setSlug(nextSlug);
    window.history.pushState({ caseStudyModal: true, slug: nextSlug }, "", `/case-studies/${nextSlug}`);
  }, []);

  const close = useCallback(() => {
    if (window.history.state?.caseStudyModal) {
      window.history.back();
    } else {
      setSlug(null);
    }
  }, []);

  useEffect(() => {
    const onPopState = (event) => {
      setSlug(event.state?.caseStudyModal ? event.state.slug : null);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <CaseStudyModalContext.Provider value={{ slug, open, close }}>
      {children}
    </CaseStudyModalContext.Provider>
  );
}
