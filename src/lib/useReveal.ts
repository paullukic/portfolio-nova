import { useEffect, useRef } from "react";

/**
 * Attach a ref to any element; it receives `is-revealed` once it enters viewport.
 * Pair with CSS `[data-reveal] { opacity:0; transform: translateY(20px); transition: ... }`
 * and `[data-reveal].is-revealed { opacity:1; transform:none; }`
 */
export function useReveal<T extends HTMLElement = HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-revealed");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12, ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
