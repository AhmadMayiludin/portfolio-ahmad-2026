"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, motion, useInView } from "framer-motion";
import { MdVerified } from "react-icons/md";
import { useSectionInView } from "@/lib/hooks";
import { experiencesData, projectsData } from "@/lib/data";
import { ScrambleText } from "./text-effects";

const stats = [
  { label: "Projects", value: projectsData.length, decimals: 0, suffix: "+" },
  { label: "IPK", value: 3.77, decimals: 2, suffix: "" },
  { label: "Kepanitiaan", value: experiencesData.length, decimals: 0, suffix: "" },
];

function Counter({
  value,
  decimals,
  suffix,
}: {
  value: number;
  decimals: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, suffix]);

  return <span ref={ref}>{(0).toFixed(decimals) + suffix}</span>;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <section
      id="about"
      ref={ref}
      className="container-page scroll-mt-24 py-24 sm:py-32"
    >
      <ScrambleText text="About Me" className="mono-label block" />
      <motion.h2
        {...fadeUp}
        transition={{ duration: 0.7 }}
        className="mt-4 max-w-4xl text-5xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-7xl"
      >
        Full Stack. Mobile.
        <br />
        <span className="text-ink/45">Computer Vision.</span>
      </motion.h2>

      <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-[auto_1fr] md:gap-12">
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="relative h-28 w-28 overflow-hidden rounded-full border border-ink/10 sm:h-32 sm:w-32">
            <Image
              src="/images/profile_2.jpg"
              alt="Ahmad Mayiludin"
              fill
              sizes="128px"
              className="object-cover object-[center_35%]"
            />
          </div>
        </motion.div>

        <div>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center gap-2 text-lg font-bold uppercase tracking-[0.04em]"
          >
            Ahmad Mayiludin
            <MdVerified className="text-xl" aria-label="Terverifikasi" />
          </motion.p>

          <motion.dl
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 flex flex-wrap gap-x-10 gap-y-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="mono-label !text-[0.62rem]">{s.label}</dt>
                <dd className="mt-1 font-mono text-lg font-semibold">
                  <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 max-w-3xl space-y-5 text-[0.98rem] leading-[1.85] text-ink/80"
          >
            <p>
              Halo, saya <strong className="text-ink">Ahmad Mayiludin</strong>,
              mahasiswa Universitas Buana Perjuangan Karawang dengan IPK{" "}
              <strong className="text-ink">3.77</strong>. Saya fokus membangun
              produk digital yang dekat dengan kebutuhan operasional: dashboard
              bisnis, aplikasi mobile internal, sistem administrasi, dan otomasi
              berbasis data.
            </p>
            <p>
              Stack utama saya mencakup{" "}
              <strong className="text-ink">
                Laravel, PHP, MySQL, React, Ionic Angular, TypeScript, Tailwind
                CSS, Python, OpenCV,
              </strong>{" "}
              dan desain UI/UX menggunakan Figma. Saya terbiasa memecah
              kebutuhan menjadi fitur, membuat alur pengguna, mengintegrasikan
              API, serta menyiapkan tampilan yang mudah dipakai.
            </p>
            <p>
              Di luar teknis, pengalaman organisasi dan kepanitiaan membantu saya
              lebih rapi dalam komunikasi, koordinasi, dan menyelesaikan
              pekerjaan bersama tim. Saat ini saya siap untuk role junior
              web/mobile developer, frontend developer, backend developer, atau
              software engineer intern.
            </p>
            <p className="text-muted">
              Ingin tahu pengalaman saya lebih lanjut?{" "}
              <a
                href="/cv/resume.pdf"
                download
                className="font-semibold text-ink underline underline-offset-4 transition hover:opacity-70"
              >
                Download CV saya
              </a>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
