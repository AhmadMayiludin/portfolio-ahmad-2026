"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Sapuan kuas yang membuka versi ilustrasi, dari kanan ke kiri
const strokes = [
  { d: "M262 40 C 210 74, 150 26, 72 70", width: 104 },
  { d: "M268 158 C 196 124, 112 196, 4 166", width: 132 },
  { d: "M262 276 C 206 250, 150 306, 92 286", width: 112 },
];

export default function PhotoReveal() {
  const [revealed, setRevealed] = useState(false);
  const lastPointer = useRef<string>("mouse");

  return (
    <div
      className="relative aspect-[240/312] w-[13.5rem] cursor-pointer select-none overflow-hidden border border-[rgb(var(--hero-line))] bg-white sm:w-[15rem] dark:bg-black"
      onPointerDown={(e) => (lastPointer.current = e.pointerType)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setRevealed(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setRevealed(false)}
      onClick={() => lastPointer.current !== "mouse" && setRevealed((r) => !r)}
      role="img"
      aria-label="Foto Ahmad Mayiludin"
    >
      {/* Foto asli memudar ke hitam saat di-hover */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: revealed ? 0.3 : 0.45 }}
      >
        <Image
          src="/images/profile-cutout.png"
          alt=""
          fill
          priority
          sizes="240px"
          className="object-cover object-top"
        />
      </motion.div>

      {/* Versi ilustrasi muncul lewat sapuan kuas */}
      <svg
        viewBox="0 0 240 312"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <filter id="brush-rough" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="26" />
          </filter>
          <mask id="brush-mask">
            <g filter="url(#brush-rough)">
              {strokes.map((s, i) => (
                <motion.path
                  key={s.d}
                  d={s.d}
                  stroke="white"
                  strokeWidth={s.width}
                  strokeLinecap="butt"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    revealed
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    pathLength: {
                      duration: revealed ? 0.6 : 0.3,
                      delay: revealed ? 0.3 + i * 0.16 : 0,
                      ease: [0.65, 0, 0.35, 1],
                    },
                    opacity: { duration: 0.01, delay: revealed ? 0.3 + i * 0.16 : 0.3 },
                  }}
                />
              ))}
            </g>
          </mask>
        </defs>
        <image
          href="/images/profile-manga.png"
          x="0"
          y="0"
          width="240"
          height="312"
          preserveAspectRatio="xMidYMin slice"
          mask="url(#brush-mask)"
        />
      </svg>
    </div>
  );
}
