"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { ScrambleText } from "./text-effects";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function CtaSection() {
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section className="container-page">
      <div className="flex flex-col gap-10 border-y border-ink/10 py-20 md:flex-row md:items-end md:justify-between sm:py-24">
        <div>
          <ScrambleText text="Have a Project in Mind?" className="mono-label block" />
          <motion.h2
            className="mt-5 text-5xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-7xl"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Let&apos;s build
            <br />
            something useful.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="#contact"
            onClick={() => {
              setActiveSection("Contact");
              setTimeOfLastClick(Date.now());
            }}
            className="btn-outline group !px-8 !py-4"
          >
            Hire Me
            <HiArrowRight className="transition group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
