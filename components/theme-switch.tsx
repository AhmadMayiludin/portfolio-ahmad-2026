"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsMoon, BsSun } from "react-icons/bs";
import { revealOrigin, toggleThemeWithReveal } from "@/lib/theme-transition";

export default function ThemeSwitch({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Ganti tema terang/gelap"
      className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg text-[0.95rem] text-ink transition hover:bg-ink/5 ${className}`}
      onClick={(e) => {
        const { x, y } = revealOrigin(e);
        toggleThemeWithReveal(toggleTheme, x, y);
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -14, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 14, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          {theme === "light" ? <BsSun /> : <BsMoon />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
