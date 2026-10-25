"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { links } from "@/lib/data";
import { useActiveSectionContext } from "@/context/active-section-context";
import ThemeSwitch from "./theme-switch";
import LogoMark from "./logo-mark";

export default function MobileHeader({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <div className="fixed inset-x-0 top-0 z-[999] px-3 pt-3 md:hidden">
      <div
        className={clsx(
          "flex items-center justify-between rounded-2xl border px-3 py-2 backdrop-blur-xl transition",
          scrolled || open
            ? "border-ink/10 bg-surface/85 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            : "border-ink/[0.06] bg-surface/70"
        )}
      >
        <a href="#home" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.24em]">
            Ahmad
          </span>
        </a>

        <div className="flex items-center gap-1">
          <ThemeSwitch />
          <button
            onClick={() => setOpen((o) => !o)}
            type="button"
            aria-label="Buka/tutup menu"
            aria-expanded={open}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink transition hover:bg-ink/5"
          >
            <span
              className={clsx(
                "absolute h-[1.5px] w-4 bg-current transition duration-300",
                open ? "rotate-45" : "-translate-y-[3px]"
              )}
            />
            <span
              className={clsx(
                "absolute h-[1.5px] w-4 bg-current transition duration-300",
                open ? "-rotate-45" : "translate-y-[3px]"
              )}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mt-2 overflow-hidden rounded-2xl border border-ink/10 bg-surface/95 p-2 shadow-xl backdrop-blur-xl"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                  setOpen(false);
                }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 * i }}
                className={clsx(
                  "flex items-center justify-between rounded-xl px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.2em] transition",
                  activeSection === link.name
                    ? "bg-ink/[0.06] text-ink"
                    : "text-muted hover:bg-ink/[0.03] hover:text-ink"
                )}
              >
                {link.label}
                <span className="text-[0.65rem] opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
