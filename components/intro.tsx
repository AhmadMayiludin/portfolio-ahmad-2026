"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsInstagram, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);

  return (
    <section
      id="home"
      ref={ref}
      className="mb-28 max-w-[54rem] scroll-mt-[50rem] text-center sm:mb-0"
    >
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: 0.2 }}
      >
        <div className="relative">
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 opacity-40 blur-lg" />
          <Image
            src="/images/profile_2.jpg"
            alt="Ahmad Mayiludin"
            width="192"
            height="192"
            quality="95"
            priority={true}
            className="relative h-40 w-40 rounded-full border-4 border-white object-cover shadow-2xl"
          />
        </div>
      </motion.div>

      <motion.h1
        className="mb-5 mt-5 px-4 text-3xl font-bold !leading-[1.2] sm:text-5xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="gradient-text">Ahmad Mayiludin</span>
      </motion.h1>
      <motion.p
        className="mx-auto mb-10 max-w-3xl px-4 text-lg !leading-[1.7] text-gray-700 dark:text-white/80 sm:text-xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Junior Full Stack & Mobile Developer yang membangun aplikasi web,
        dashboard operasional, aplikasi mobile Ionic Angular, dan solusi
        Computer Vision. Terbuka untuk kesempatan kerja di bidang web/mobile
        development, frontend, backend, dan software engineering.
      </motion.p>
      <motion.div
        className="flex flex-col items-center justify-center gap-3 px-4 text-lg font-medium sm:flex-row"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Link
          href="#projects"
          className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3 text-base text-white shadow-lg shadow-indigo-500/30 outline-none transition hover:scale-105 hover:shadow-indigo-500/50 focus:scale-105 active:scale-100"
        >
          Lihat Projects
          <BsArrowRight className="opacity-80 transition group-hover:translate-x-1" />
        </Link>

        <a
          className="group flex cursor-pointer items-center gap-2 rounded-full border border-indigo-200/60 bg-white/80 px-7 py-3 text-base text-gray-800 shadow-sm backdrop-blur-sm outline-none transition hover:scale-105 hover:border-indigo-400/60 hover:shadow-indigo-200/40 focus:scale-105 active:scale-100 dark:bg-white/10 dark:text-white dark:border-white/20 dark:hover:border-indigo-400/40"
          href="/cv/resume.pdf"
          download
        >
          Download CV
          <HiDownload className="opacity-70 transition group-hover:translate-y-1" />
        </a>

        <Link
          href="#contact"
          className="flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white/80 px-7 py-3 text-base text-gray-800 shadow-sm backdrop-blur-sm outline-none transition hover:scale-105 hover:border-indigo-400/60 focus:scale-105 active:scale-100 dark:bg-white/10 dark:text-white dark:border-white/20"
        >
          Hubungi Saya
        </Link>
      </motion.div>
      <motion.div
        className="mt-5 flex flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <a
          className="flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-gray-700 transition hover:scale-[1.12] hover:text-gray-950 focus:scale-[1.12] active:scale-100 borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://www.linkedin.com/in/ahmad-mayiludin-462371250/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Ahmad Mayiludin"
        >
          <BsLinkedin />
        </a>

        <a
          className="flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-[1.35rem] text-gray-700 transition hover:scale-[1.12] hover:text-gray-950 focus:scale-[1.12] active:scale-100 borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://github.com/AhmadMayiludin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Ahmad Mayiludin"
        >
          <FaGithubSquare />
        </a>
        <a
          className="flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-[1.35rem] text-gray-700 transition hover:scale-[1.12] hover:text-gray-950 focus:scale-[1.12] active:scale-100 borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://www.instagram.com/ahmadmayiludin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Ahmad Mayiludin"
        >
          <BsInstagram />
        </a>
      </motion.div>
    </section>
  );
}
