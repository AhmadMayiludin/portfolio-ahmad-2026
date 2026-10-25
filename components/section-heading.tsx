"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScrambleText, TypewriterText } from "./text-effects";

type SectionHeadingProps = {
  children: string;
  eyebrow?: string;
  description?: React.ReactNode;
  className?: string;
};

export default function SectionHeading({
  children,
  eyebrow,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 max-w-3xl ${className}`}>
      {eyebrow && <ScrambleText text={eyebrow} className="mono-label block" />}
      <TypewriterText
        text={children}
        className="mt-4 text-5xl font-bold tracking-[-0.04em] text-ink sm:text-6xl"
      />
      {description && (
        <motion.p
          className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-muted"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
