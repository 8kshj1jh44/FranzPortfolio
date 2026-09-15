"use client";

import { Fragment, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  stagger?: number;
}

export default function ScrollFloat({
  text,
  className = "",
  as: Tag = "h2",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "top bottom-=10%",
  stagger = 0.03,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLElement>(null);

  const words = useMemo(() => text.split(" "), [text]);

  const content = words.map((word, wordIndex) => (
    <Fragment key={wordIndex}>
      {wordIndex > 0 ? " " : null}
      <span className="sf-word inline-block whitespace-nowrap">
        {Array.from(word).map((char, charIndex) => (
          <span key={charIndex} aria-hidden="true" className="sf-char inline-block">
            {char}
          </span>
        ))}
      </span>
    </Fragment>
  ));

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
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [animationDuration, ease, scrollStart, stagger]);

  return (
    <Tag
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      aria-label={text}
    >
      <span className="inline-block">{content}</span>
    </Tag>
  );
}