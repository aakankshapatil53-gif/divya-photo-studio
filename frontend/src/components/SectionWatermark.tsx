// Large faint background word used behind section headings for an
// editorial, Pinterest-board-title feel. Purely decorative — aria-hidden.
export default function SectionWatermark({
  text, align = "center", variant = "auto",
}: { text: string; align?: "left" | "center" | "right"; variant?: "auto" | "onDark" }) {
  const alignment = align === "left" ? "text-left left-0" : align === "right" ? "text-right right-0" : "text-center inset-x-0";
  const color = variant === "onDark" ? "text-warmwhite/[0.05]" : "text-charcoal/[0.035] dark:text-warmwhite/[0.045]";
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute top-1/2 ${alignment} -translate-y-1/2 select-none whitespace-nowrap font-display text-[18vw] font-semibold leading-none ${color} md:text-[10vw]`}
    >
      {text}
    </span>
  );
}
