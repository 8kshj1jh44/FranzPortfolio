"use client";

import { useEffect, useRef, useState } from "react";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
}

export default function BlurText({
  text,
  delay = 0.05,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
}: BlurTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    let observer: IntersectionObserver | null = null;

    if (el && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setInView(true);
        },
        { threshold }
      );
      observer.observe(el);
    } else {
      setInView(true);
    }

    const fallback = setTimeout(() => setInView(true), 900);

    return () => {
      observer?.disconnect();
      clearTimeout(fallback);
    };
  }, [threshold]);

  const show = inView;
  const tokens = text.split(/(\s+)/).filter((t) => t.length > 0);

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {tokens.map((token, index) => {
        const group = animateBy === "words" ? [token] : Array.from(token);
        return group.map((char, charIndex) => {
          const globalIndex = animateBy === "words" ? index : index + charIndex;
          const transitionDelay = `${delay * globalIndex}s`;
          const fromTop = direction === "top";
          return (
            <span
              key={`${index}-${charIndex}`}
              aria-hidden="true"
              className="inline-block will-change-transform"
              style={{
                opacity: show ? 1 : 0,
                transform: show
                  ? "translateY(0)"
                  : `translateY(${fromTop ? "-2em" : "2em"})`,
                transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${transitionDelay}, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${transitionDelay}`,
                whiteSpace: "pre",
              }}
            >
              {char}
            </span>
          );
        });
      })}
    </span>
  );
}