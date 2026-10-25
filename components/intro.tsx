"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

const NAME = "AHMAD MAYILUDIN";

export default function Intro() {
  const { ref } = useSectionInView("Home");
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative scroll-mt-[100rem]"
    >
      <div
        ref={sectionRef}
        className="relative h-[100svh] min-h-[560px] overflow-hidden"
      >
        {/* Nama outline berjalan di belakang foto */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[44%] -translate-y-1/2 select-none md:top-[40%]"
        >
          <motion.div style={{ y: nameY, opacity: fade }}>
            <div className="flex w-max animate-marquee">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="text-outline whitespace-nowrap pr-[0.35em] text-[clamp(5.5rem,24vw,17rem)] font-semibold leading-none tracking-[-0.02em]"
                >
                  {NAME}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Foto tanpa background */}
        <motion.div
          className="absolute bottom-0 left-1/2 h-[66svh] md:h-[82svh]"
          style={{ x: "-50%", y: photoY }}
        >
          <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/profile-cutout.png"
              alt="Ahmad Mayiludin"
              width={569}
              height={858}
              priority
              quality={95}
              sizes="(min-width: 768px) 560px, 70vw"
              className="h-full w-auto max-w-none object-contain [-webkit-mask-image:linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)] [mask-image:linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)]"
            />
          </motion.div>
        </motion.div>

        {/* Info kiri bawah */}
        <motion.div
          className="absolute bottom-8 left-5 z-10 hidden max-w-xs md:left-10 md:block"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="mono-label !text-ink">Junior Full Stack</p>
          <p className="mono-label mt-1 !text-ink">&amp; Mobile Developer</p>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
            </span>
            Terbuka untuk kesempatan kerja
          </p>
        </motion.div>

        {/* Scroll down vertikal */}
        <motion.a
          href="#projects"
          aria-label="Scroll ke bawah"
          className="absolute right-5 top-[42%] z-10 hidden flex-col items-center gap-3 md:right-10 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="relative h-14 w-px overflow-hidden bg-ink/15">
            <span className="absolute inset-0 animate-scroll-line bg-ink" />
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted [writing-mode:vertical-rl]">
            Scroll Down
          </span>
        </motion.a>
      </div>

      {/* Info versi HP */}
      <div className="container-page -mt-px border-t border-ink/10 py-5 md:hidden">
        <p className="mono-label !text-ink">Junior Full Stack &amp; Mobile Developer</p>
        <p className="mt-2 flex items-center gap-2 text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-ink" />
          Terbuka untuk kesempatan kerja
        </p>
      </div>
    </section>
  );
}
