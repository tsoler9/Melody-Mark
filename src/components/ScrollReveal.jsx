import { useLayoutEffect, useRef } from "react";

export default function ScrollReveal({ as: Element = "div", className = "", children }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (
      !element ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    element.classList.add("reveal-pending");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.classList.remove("reveal-pending");
      observer.unobserve(element);
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

    observer.observe(element);
    return () => {
      observer.disconnect();
      element.classList.remove("reveal-pending");
    };
  }, []);

  return (
    <Element ref={ref} className={`scroll-reveal${className ? ` ${className}` : ""}`}>
      {children}
    </Element>
  );
}
