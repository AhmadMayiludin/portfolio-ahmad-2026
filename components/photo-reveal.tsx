"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Gerak tangan cukup rata lalu melambat di akhir, seperti di video
const easePull: [number, number, number, number] = [0.3, 0.6, 0.4, 1];
const easeIn: [number, number, number, number] = [0.7, 0, 0.84, 0];

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
        transition={{ duration: 0.3, delay: revealed ? 0 : 0.3 }}
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

      {/* Ilustrasi meluncur dari kanan: tangannya di depan, seperti menarik hordeng */}
      <motion.div
        className="absolute inset-0"
        initial={{ x: "100%" }}
        animate={{ x: revealed ? "0%" : "100%" }}
        transition={
          revealed
            ? { duration: 1, delay: 0.3, ease: easePull }
            : { duration: 0.45, ease: easeIn }
        }
      >
        <Image
          src="/images/profile-anime.webp"
          alt=""
          fill
          sizes="240px"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
