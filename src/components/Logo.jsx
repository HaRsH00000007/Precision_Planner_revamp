const TAGLINE = ["Events", "Fabrications", "Audio/Visual", "Customised Stall"];

/**
 * Wordmark image + tagline rendered as real text.
 * (The tagline baked into logo-white.png was ~3px tall at navbar size and unreadable.)
 */
export default function Logo({ size = "nav", className = "" }) {
  const s =
    size === "footer"
      ? { wrap: "w-[300px] sm:w-[420px]", text: "text-[9px] tracking-[0.04em] sm:text-[11px] sm:tracking-[0.1em]", gap: "mt-2.5 pt-2" }
      : { wrap: "w-[250px] sm:w-[340px]", text: "text-[8px] tracking-[0.03em] sm:text-[9.5px] sm:tracking-[0.1em]", gap: "mt-1.5 pt-1.5" };

  return (
    <span className={`flex flex-col ${s.wrap} ${className}`}>
      <img src="/images/wordmark-white.png" alt="Precision Planners" width="1316" height="114" className="block h-auto w-full" />
      <span
        className={`flex justify-between border-t border-ivory/25 font-sans font-semibold uppercase leading-none text-ivory/80 ${s.gap} ${s.text}`}
      >
        {TAGLINE.map((t) => (
          <span key={t} className="whitespace-nowrap">
            {t}
          </span>
        ))}
      </span>
    </span>
  );
}
