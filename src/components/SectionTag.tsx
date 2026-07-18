type SectionTagProps = {
  index: number;
  total?: number;
  label: string;
  variant?: "dark" | "light";
};

export default function SectionTag({
  index,
  total = 0,

  label,
  variant = "dark",
}: SectionTagProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`inline-flex items-center gap-3 sm:gap-3.5 rounded-full py-1.5 pl-1.5 pr-4 sm:pr-5 border backdrop-blur-md ${
        isDark
          ? "border-white/10 bg-white/[0.04]"
          : "border-navy/10 bg-navy/[0.03]"
      }`}
    >
      <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[11px] sm:text-xs font-semibold text-white bg-gradient-to-br from-horizon-orange to-[#CC4E00] shadow-[0_4px_14px_-4px_rgba(255,106,0,0.75)]">
        {String(index).padStart(2, "0")}
      </span>
      <span className={`h-3 w-px ${isDark ? "bg-white/15" : "bg-navy/15"}`} />
      <span
        className={`text-[11px] sm:text-xs font-medium uppercase tracking-[0.16em] ${
          isDark ? "text-white/60" : "text-navy/60"
        }`}
      >
        {label}
      </span>
      {total > 0 && (
        <span
          className={`text-[10px] sm:text-[11px] font-medium tabular-nums ${
            isDark ? "text-white/25" : "text-navy/25"
          }`}
        >
          /{String(total).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}
