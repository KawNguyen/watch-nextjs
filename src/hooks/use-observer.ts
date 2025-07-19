//Create function useObserver
import { useEffect, useRef } from "react";
export function useObserver(
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      }, options);

      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current && elementRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observerRef.current.unobserve(elementRef.current);
      }
    };
  }, [callback, options]);

  return elementRef;
}

export function useInfiniteScroll(
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  const observerRef = useObserver(callback, options);

  return observerRef;
}

export function useScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return scrollToTop;
}
