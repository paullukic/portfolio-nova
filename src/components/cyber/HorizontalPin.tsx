import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Horizontal-pin scroll container. At lg+ the user's vertical scroll is
 * translated into horizontal movement of the inner track while the section
 * stays pinned to the viewport. Below lg children render as a standard
 * flex column (fallback).
 *
 * Wrap plate children directly — each child is laid out as a fixed-width
 * flex item.
 */
export function HorizontalPin({
  children,
  gap = "1.25rem",
}: {
  children: React.ReactNode;
  gap?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackPx, setTrackPx] = useState(0);
  const [vw, setVw] = useState(0);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)");
    const sync = () => setIsLg(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackPx(trackRef.current.scrollWidth);
        setVw(window.innerWidth);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [children, isLg]);

  const distance = Math.max(0, trackPx - vw);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(xRaw, { damping: 38, stiffness: 220, mass: 0.6 });

  if (!isLg) {
    return (
      <div className="flex flex-col gap-6">
        {children}
      </div>
    );
  }

  // outer height provides enough vertical scroll to cover horizontal distance
  const outerH = distance + (typeof window !== "undefined" ? window.innerHeight : 800);

  return (
    <div
      ref={ref}
      style={{ height: `${outerH}px` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x, gap }}
          className="flex items-stretch will-change-transform px-4 md:px-7"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
