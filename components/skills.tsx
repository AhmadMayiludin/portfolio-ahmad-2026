"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineCodeBracket,
  HiOutlineCpuChip,
  HiOutlineDevicePhoneMobile,
  HiOutlinePaintBrush,
} from "react-icons/hi2";
import SectionHeading from "./section-heading";
import { skills } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

const capabilities = [
  {
    label: "Web Development",
    icon: <HiOutlineCodeBracket />,
    desc: "Membangun aplikasi web, dashboard operasional, dan sistem administrasi yang terhubung dengan database dan API.",
    tags: ["Laravel", "PHP", "MySQL", "React", "Tailwind CSS"],
  },
  {
    label: "Mobile Development",
    icon: <HiOutlineDevicePhoneMobile />,
    desc: "Mengembangkan aplikasi mobile internal dengan Ionic Angular, mulai dari form dinamis, scanner QR/Barcode, sampai build APK.",
    tags: ["Ionic", "Angular", "TypeScript", "Capacitor", "REST API"],
  },
  {
    label: "Data & Computer Vision",
    icon: <HiOutlineCpuChip />,
    desc: "Mengolah data dan membangun solusi Computer Vision seperti face recognition dan deteksi objek menggunakan Python.",
    tags: ["Python", "OpenCV", "YOLO", "Pandas", "Data Mining"],
  },
  {
    label: "UI/UX Design",
    icon: <HiOutlinePaintBrush />,
    desc: "Memecah kebutuhan menjadi alur pengguna dan merancang tampilan yang rapi serta mudah dipakai.",
    tags: ["Figma", "Canva", "Wireframe", "Prototype"],
  },
];

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="container-page scroll-mt-24 py-24 sm:py-32"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="My Capabilities"
            description="Saya menggabungkan kemampuan teknis dan problem solving untuk membangun aplikasi web, mobile, dan dashboard yang rapi serta mudah dipakai."
            className="!mb-10"
          >
            What I Can Do
          </SectionHeading>

          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.03 * index, duration: 0.4 }}
                className="group relative"
              >
                <div
                  className="card flex aspect-square items-center justify-center transition duration-300 group-hover:-translate-y-1 group-hover:border-ink/30"
                  title={skill.name}
                >
                  <img
                    src={skill.imgUrl}
                    alt={skill.name}
                    className="logo-icon h-8 w-8 object-contain sm:h-9 sm:w-9"
                  />
                </div>
                <span className="pointer-events-none absolute -bottom-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-invert opacity-0 transition group-hover:opacity-100">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {capabilities.map((c, i) => (
            <motion.article
              key={c.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
              className="card group flex flex-col p-6 transition duration-300 hover:border-ink/25 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-5xl font-light tracking-tight">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mono-label max-w-[9rem] text-right !leading-relaxed !tracking-[0.2em]">
                  {c.label}
                </span>
              </div>

              <span className="mt-8 flex h-12 w-12 items-center justify-center rounded-xl border border-ink/15 text-xl transition duration-300 group-hover:bg-ink group-hover:text-invert">
                {c.icon}
              </span>

              <p className="mt-6 text-sm leading-relaxed text-ink/80">{c.desc}</p>

              <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                {c.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
