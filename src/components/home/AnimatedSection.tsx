"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  /* Opacity stays 1: fast scroll never leaves content invisible (no white “holes”). */
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 1, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "80px 0px 80px 0px", amount: 0.08 }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.section>
  );
}
