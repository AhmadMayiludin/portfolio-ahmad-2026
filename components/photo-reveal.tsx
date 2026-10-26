"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Goresan kuas tipis yang mendahului sapuan utama, dari kanan ke kiri
const strokes = [
  { d: "M262 70 C 210 96, 150 52, 60 104", width: 54 },
  { d: "M268 168 C 196 140, 112 206, 10 172", width: 66 },
  { d: "M262 262 C 206 240, 150 290, 70 268", width: 58 },
];

const ease: [number, number, number, number] = [0.65, 0, 0.35, 1];

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
                      duration: revealed ? 0.65 : 0.3,
                      delay: revealed ? 0.3 + i * 0.12 : 0,
                      ease,
                    },
                    opacity: { duration: 0.01, delay: revealed ? 0.3 + i * 0.12 : 0.3 },
                  }}
                />
              ))}
              {/* Sapuan utama: membuka seluruh gambar, bentuk akhirnya mengikuti siluet gambar */}
              <motion.rect
                y="-40"
                width="320"
                height="392"
                fill="white"
                initial={{ x: 250 }}
                animate={{ x: revealed ? -40 : 250 }}
                transition={{
                  duration: revealed ? 1 : 0.3,
                  delay: revealed ? 0.4 : 0,
                  ease,
                }}
              />
            </g>
          </mask>
        </defs>
        <image
          href="/images/profile-anime.webp"
          x="0"
          y="0"
          width="240"
          height="312"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#brush-mask)"
        />
      </svg>
    </div>
  );
}
