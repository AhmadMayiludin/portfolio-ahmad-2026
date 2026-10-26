"use client";

import React from "react";
import { motion } from "framer-motion";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { revealOrigin, toggleThemeWithReveal } from "@/lib/theme-transition";
import PhotoReveal from "./photo-reveal";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function HeroDivider({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <div className="flex items-center justify-center gap-4 px-5">
      <motion.span
        className="h-px w-full max-w-[22rem] origin-right bg-gradient-to-r from-transparent to-[rgb(var(--hero-line))]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay, ease }}
      />
      <motion.span
        className="shrink-0 whitespace-nowrap font-mono text-[0.52rem] uppercase tracking-[0.45em] text-[rgb(var(--hero-accent))] sm:text-[0.58rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.4 }}
      >
        {text}
      </motion.span>
      <motion.span
        className="h-px w-full max-w-[22rem] origin-left bg-gradient-to-l from-transparent to-[rgb(var(--hero-line))]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay, ease }}
      />
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Ganti tema terang/gelap"
      onClick={(e) => {
        const { x, y } = revealOrigin(e);
        toggleThemeWithReveal(toggleTheme, x, y);
      }}
      className="relative flex h-[1.15rem] w-9 items-center rounded-full bg-ink/15 px-[3px] transition hover:bg-ink/25 dark:bg-ink/25 dark:hover:bg-ink/35"
    >
      <motion.span
        className="flex h-3 w-3 items-center justify-center text-[0.62rem] text-ink"
        animate={{ x: dark ? 18 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      >
        {dark ? <BsMoonFill /> : <BsSunFill />}
      </motion.span>
    </button>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export default function Intro() {
  const { ref } = useSectionInView("Home");

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] scroll-mt-[100rem] flex-col justify-between bg-white py-6 dark:bg-black"
    >
      <HeroDivider text="Ahmad Mayiludin || Portfolio 2026" />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 px-6 py-16 md:flex-row md:items-center md:gap-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease }}
        >
          <PhotoReveal />
        </motion.div>

        <div className="text-center md:text-left">
          <motion.h1
            {...fadeUp(0.3)}
            className="font-mono text-[2rem] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[2.6rem] lg:text-[3rem]"
          >
            Ahmad Mayiludin
          </motion.h1>

          <motion.p
            {...fadeUp(0.42)}
            className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.42em] text-muted sm:text-[0.68rem]"
          >
            Junior Full Stack &amp; Mobile Developer
          </motion.p>

          <motion.p
            {...fadeUp(0.5)}
            className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[0.68rem] text-muted md:justify-start"
          >
            <HiOutlineAcademicCap className="text-sm" />
            Universitas Buana Perjuangan Karawang
          </motion.p>

          <motion.div
            {...fadeUp(0.6)}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            <a
              href="/cv/resume.pdf"
              download
              className="border border-ink bg-ink px-7 py-3 font-mono text-[0.62rem] font-bold uppercase tracking-[0.22em] text-invert transition hover:opacity-80"
            >
              Get Resume
            </a>
            <a
              href="mailto:if23.ahmadmayiludin@mhs.ubpkarawang.ac.id"
              className="border border-ink/25 px-7 py-3 font-mono text-[0.62rem] font-bold uppercase tracking-[0.22em] text-ink transition hover:border-ink"
            >
              Email Me
            </a>
          </motion.div>

          <motion.div
            {...fadeUp(0.7)}
            className="mt-6 flex justify-center md:justify-start"
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </div>

      <HeroDivider text="Solving Problems Through Code" delay={0.3} />
    </section>
  );
}
