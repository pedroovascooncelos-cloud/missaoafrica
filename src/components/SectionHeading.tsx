type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className="mb-4 inline-flex rounded-full border border-amber-200 bg-white/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-amber-700 shadow-sm">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-[2.6rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
