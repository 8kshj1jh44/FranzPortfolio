"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  text: string;
  className?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

export default function ScrollFloat({
  text,
  className = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "top bottom-=10%",
  scrollEnd = "top 25%",
  stagger = 0.03,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const chars = useMemo(
    () =>
      text.split("").map((char, index) => (
        <span key={index} aria-hidden="true" className="sf-char inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      )),
    [text]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const charElements = el.querySelectorAll(".sf-char");
    if (charElements.length === 0) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(charElements, { opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1 });
      return;
    }

    const tween = gsap.fromTo(
      charElements,
      {
        willChange: "opacity, transform",
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: "50% 0%",
      },
      {
        duration: animationDuration,
        ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger,
        scrollTrigger: {
          trigger: el,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`overflow-hidden ${className}`}>
      <span className="inline-block">{chars}</span>
    </h2>
  );
}