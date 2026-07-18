"use client";
import { motion, useInView, useAnimation, AnimationProps } from "framer-motion";
import { useRef, useEffect, RefObject } from "react";

interface SlideProps extends AnimationProps {
  children: React.ReactNode;
  delay?: number;
  /** Item position in a list — combined with `stagger` to compute delay,
   *  so list renders (timeline rows, cards, chips) don't need to hand-roll
   *  `i * 0.1` at every call site. Ignored when `delay` is set explicitly. */
  index?: number;
  stagger?: number;
  className?: string;
}

export const Slide = ({ children, className, delay, index, stagger = 0.1 }: SlideProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInview = useInView(ref as RefObject<Element>, { once: true });
  const controls = useAnimation();
  const computedDelay = delay ?? (index ? index * stagger : delay);

  useEffect(() => {
    if (isInview) {
      controls.start("stop");
    }
  }, [controls, isInview]);

  return (
    <motion.div
      ref={ref}
      variants={{
        start: { opacity: 0, translateY: 10 },
        stop: { opacity: 1, translateY: 0 },
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
        delay: computedDelay,
        stiffness: 0.5,
      }}
      animate={controls}
      initial="start"
    >
      <div className={className}>{children}</div>
    </motion.div>
  );
};
