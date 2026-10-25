"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { ScrambleText } from "./text-effects";
import { experiencesData, workExperienceData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

function GroupLabel({ index, text }: { index: string; text: string }) {
  return (
    <div className="flex items-center gap-4 pb-2 pt-6">
      <span className="font-mono text-xs text-muted">{index}</span>
      <span className="h-px w-8 bg-ink/30" />
      <ScrambleText text={text} className="mono-label !text-ink" />
    </div>
  );
}

export default function Experience() {
  const { ref } = useSectionInView("Experience");

  return (
    <section
      id="experience"
      ref={ref}
      className="container-page scroll-mt-24 py-24 sm:py-32"
    >
      <SectionHeading
        eyebrow="Growth & Experience"
        description="Pengalaman kerja, magang, dan kepanitiaan yang membentuk kemampuan teknis dan kolaborasi saya."
      >
        Experience
      </SectionHeading>

      {/* Pengalaman kerja */}
      <GroupLabel index="01" text="Pengalaman Kerja" />
      {workExperienceData.map((item) => (
        <motion.article
          key={item.title}
          {...fadeUp}
          className="grid grid-cols-1 gap-8 border-t border-ink/10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14"
        >
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="text-2xl font-bold tracking-[-0.03em]">{item.title}</h3>
              <span className="font-mono text-xs text-muted">{item.date}</span>
            </div>
            <p className="mt-2 font-semibold">{item.company}</p>
            <p className="text-sm text-muted">{item.division}</p>

            <ul className="mt-6 space-y-3">
              {item.description.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/80"
                >
                  <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-ink/50" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {item.tech.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 self-start">
            {item.imageUrls.map((img, i) => (
              <div
                key={img}
                className="group overflow-hidden rounded-xl border border-ink/10 bg-ink/5"
              >
                <img
                  src={img}
                  alt={`${item.title} dokumentasi ${i + 1}`}
                  className="aspect-[3/4] w-full object-cover object-top transition duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </motion.article>
      ))}

      {/* Kepanitiaan */}
      <div className="mt-10">
        <GroupLabel index="02" text="Kepanitiaan & Organisasi" />
        {experiencesData.map((item, index) => {
          const reverse = index % 2 === 1;
          const [first, ...rest] = item.imageUrls;
          return (
            <motion.article
              key={item.title}
              {...fadeUp}
              className="grid grid-cols-1 gap-8 border-t border-ink/10 py-12 lg:grid-cols-2 lg:items-center lg:gap-14"
            >
              <div className={reverse ? "lg:order-2" : ""}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">
                    {item.title}
                  </h3>
                  <span className="font-mono text-xs text-muted">{item.date}</span>
                </div>
                <p className="mt-2 font-semibold text-ink/90">{item.location}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/75">
                  {item.description}
                </p>
              </div>

              <div className={`grid grid-cols-2 gap-2 ${reverse ? "lg:order-1" : ""}`}>
                <div
                  className={`group relative overflow-hidden rounded-xl border border-ink/10 bg-ink/5 ${
                    rest.length === 1 ? "aspect-[4/3]" : "col-span-2 aspect-[16/9]"
                  }`}
                >
                  <Image
                    src={first}
                    alt={`${item.title} foto 1`}
                    fill
                    sizes="(min-width: 1024px) 520px, 90vw"
                    placeholder="blur"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                {rest.map((img, i) => (
                  <div
                    key={i}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-ink/10 bg-ink/5"
                  >
                    <Image
                      src={img}
                      alt={`${item.title} foto ${i + 2}`}
                      fill
                      sizes="(min-width: 1024px) 260px, 45vw"
                      placeholder="blur"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
