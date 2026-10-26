"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import MobileHeader from "./mobile-header";
import ThemeSwitch from "./theme-switch";
import LogoMark from "./logo-mark";

// Home lewat logo, Contact lewat tombol "Hire Me"
const navLinks = links.filter((l) => l.name !== "Home" && l.name !== "Contact");

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const [scrolled, setScrolled] = useState(false);
  // Navbar disembunyikan selama masih di halaman pertama
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setOnHero(window.scrollY < window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (name: (typeof links)[number]["name"]) => {
    setActiveSection(name);
    setTimeOfLastClick(Date.now());
  };

  return (
    <header className="relative z-[999]">
      <MobileHeader scrolled={scrolled} visible={!onHero} />

      <motion.div
        className={clsx(
          "fixed inset-x-0 top-5 hidden px-6 md:block",
          onHero && "pointer-events-none"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={onHero ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
      >
        <div
          className={clsx(
            "mx-auto flex max-w-5xl items-center justify-between rounded-2xl border px-3 py-2.5 backdrop-blur-xl transition duration-300",
            scrolled
              ? "border-ink/10 bg-surface/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
              : "border-ink/[0.06] bg-surface/70"
          )}
        >
          <Link
            href="#home"
            onClick={() => go("Home")}
            className="flex items-center gap-3 pl-1"
          >
            <LogoMark />
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.24em]">
              Ahmad
            </span>
          </Link>

          <nav>
            <ul className="flex items-center gap-1 lg:gap-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name;
                return (
                  <li key={link.hash}>
                    <Link
                      href={link.hash}
                      onClick={() => go(link.name)}
                      className={clsx(
                        "relative block px-3 py-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] transition-colors",
                        isActive ? "text-ink" : "text-muted hover:text-ink"
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-ink"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeSwitch />
            <Link
              href="#contact"
              onClick={() => go("Contact")}
              className="rounded-xl border border-ink px-4 py-2 text-[0.72rem] font-semibold transition hover:bg-ink hover:text-invert"
            >
              Hire Me
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
