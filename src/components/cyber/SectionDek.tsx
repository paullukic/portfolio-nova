import { sectionDek } from "@/content/sections";

/** Plain-language line under a section title: the payoff for the flavor kicker above it. */
export function SectionDek({ id }: { id: string }) {
  const dek = sectionDek(id);
  if (!dek) return null;
  return (
    <p className="mt-5 max-w-xl text-ash text-[15px] md:text-base leading-relaxed text-pretty">
      {dek}
    </p>
  );
}
