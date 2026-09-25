interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
}

// Pure CSS entrance animation: it starts on first paint instead of waiting for
// hydration, and the full text stays readable for crawlers and screen readers.
export default function BlurText({
  text,
  delay = 0.05,
  className = "",
  animateBy = "words",
  direction = "top",
}: BlurTextProps) {
  const tokens = text.split(/(\s+)/).filter((t) => t.length > 0);
  const offset = direction === "top" ? "-2em" : "2em";

  return (
    <span className={className}>
      {tokens.map((token, index) => {
        const group = animateBy === "words" ? [token] : Array.from(token);
        return group.map((char, charIndex) => {
          const globalIndex = animateBy === "words" ? index : index + charIndex;
          return (
            <span
              key={`${index}-${charIndex}`}
              className="blur-text-token inline-block"
              style={
                {
                  "--blur-text-offset": offset,
                  animationDelay: `${delay * globalIndex}s`,
                  whiteSpace: "pre",
                } as React.CSSProperties
              }
            >
              {char}
            </span>
          );
        });
      })}
    </span>
  );
}
