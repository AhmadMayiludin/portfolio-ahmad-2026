"use client";

import React from "react";
import { motion } from "framer-motion";
import { inDevelopmentProjects } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { FaGithub } from "react-icons/fa";
import SectionHeading from "./section-heading";

export default function InDevelopmentSection() {
  const { ref } = useSectionInView("Projects");

  return (
    <section
      id="in-development"
      ref={ref}
      className="container-page scroll-mt-24 pb-24 sm:pb-32"
    >
      <SectionHeading
        eyebrow="Work in Progress"
        description="Project yang sedang dalam proses pengembangan aktif. Pantau terus untuk update terbaru."
      >
        Currently Building
      </SectionHeading>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {inDevelopmentProjects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
            className="card flex flex-col p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-4xl font-light tracking-tight text-ink/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mono-label flex items-center gap-2 !tracking-[0.2em] !text-ink">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
                </span>
                In Progress
              </span>
            </div>

            <h3 className="mt-6 text-xl font-bold tracking-tight">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {project.description}
            </p>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                <span>Progress</span>
                <span className="text-ink">{project.progress}%</span>
              </div>
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
                <motion.div
                  className="h-full rounded-full bg-ink"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${project.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            <ul className="mb-8 mt-6 space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-ink/80">
                  <span className="mt-[0.55rem] h-px w-3 shrink-0 bg-ink/50" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center justify-between gap-4 border-t border-ink/10 pt-5">
              <div className="flex items-center gap-2">
                {project.tech.map((t, i) => (
                  <img key={i} src={t} alt="" className="logo-icon h-5 w-5 object-contain" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">
                  Target · {project.expectedDate}
                </span>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition hover:text-ink"
                    aria-label={`GitHub ${project.title}`}
                  >
                    <FaGithub />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
