import React from "react";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { HiArrowUp } from "react-icons/hi2";

const socials = [
  {
    href: "https://www.linkedin.com/in/ahmad-mayiludin-462371250/",
    label: "LinkedIn",
    icon: <BsLinkedin />,
  },
  {
    href: "https://github.com/AhmadMayiludin",
    label: "GitHub",
    icon: <FaGithub />,
  },
  {
    href: "https://www.instagram.com/ahmadmayiludin",
    label: "Instagram",
    icon: <BsInstagram />,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-ink/10">
      <div className="container-page flex flex-col items-center justify-between gap-5 py-8 sm:flex-row">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-muted">
          &copy; {currentYear} Ahmad Mayiludin
        </p>

        <div className="flex items-center gap-1">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-ink/5 hover:text-ink"
            >
              {s.icon}
            </a>
          ))}
          <a
            href="#home"
            aria-label="Kembali ke atas"
            className="ml-3 flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-invert"
          >
            <HiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
