import { useEffect, useState } from "react";

export const useMediaQuery = (query: string = "(min-width: 1024px)") => {
  const [matches, setMatches] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const updateMatch = () => setMatches(mediaQuery.matches);

    updateMatch();
    setHasMounted(true);

    mediaQuery.addEventListener("change", updateMatch);
    return () => {
      mediaQuery.removeEventListener("change", updateMatch);
    };
  }, [query]);

  return hasMounted ? matches : false;
};
