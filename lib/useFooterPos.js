import { useState, useRef, useEffect } from "react";

const isClient = () =>
  typeof document !== "undefined" && typeof window !== "undefined";
const findRoot = () => isClient() && document.getElementById("__next");

export function useFooterPos() {
  const root = useRef(findRoot());
  const [pos, setPos] = useState("relative");

  useEffect(() => {
    if (!isClient()) return;
    const __next = root.current;

    const revalidate = () => {
      const clientHeight = window.innerHeight;
      const [content] = __next.getClientRects();
      setPos(content.height < clientHeight ? "fixed" : "relative");
    };

    window.addEventListener("resize", revalidate);
    revalidate();

    return () => window.removeEventListener("resize", revalidate);
  }, []);

  return pos;
}
