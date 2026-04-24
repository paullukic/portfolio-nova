import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

type Side = "left" | "right";

/**
 * Giant numeric watermark for each section. Parallax y against scroll, and
 * velocity-reactive rotateX / letterSpacing so it breathes when the page
 * is moving. Wired per-section — pass number + side + optional label.
 */
export function SectionWatermark({
  number,
  side = "right",
}: {
  number: string;
  side?: Side;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const v = useVelocity(scrollY);
  const vSmooth = useSpring(v, { damping: 40, stiffness: 220, mass: 0.4 });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const skewX = useTransform(vSmooth, [-3000, 0, 3000], ["-4deg", "0deg", "4deg"]);
  const letterSpacing = useTransform(vSmooth, [-3000, 0, 3000], ["-0.04em", "0em", "0.06em"]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0">
      <motion.div
        aria-hidden
        style={{ y, skewX, letterSpacing }}
        className={`pointer-events-none absolute -top-6 ${
          side === "left" ? "left-4 md:left-10" : "right-4 md:right-10"
        } font-zen text-[28vw] md:text-[22vw] lg:text-[18vw] leading-none text-rule-strong/60 select-none will-change-transform`}
      >
        {number}
      </motion.div>
    </div>
  );
}
