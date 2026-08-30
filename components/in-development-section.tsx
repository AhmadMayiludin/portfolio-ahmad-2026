"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { inDevelopmentProjects } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "./section-heading";
import { FaGithub, FaHammer } from "react-icons/fa";
import { BiChip } from "react-icons/bi";

type DevProject = (typeof inDevelopmentProjects)[number];

export default function InDevelopmentSection() {
  const { ref } = useSectionInView("Projects", 0.2);
  const [selectedProject, setSelectedProject] = useState<DevProject | null>(null);

  return (
    <motion.section
      id="in-development"
      ref={ref}
      className="mb-28 w-full scroll-mt-28"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Section Header */}
        <div className="mb-2 flex items-center justify-center gap-3">
          <SectionHeading>
            <span className="gradient-text">Sedang Dikembangkan</span>
          </SectionHeading>
        </div>

        <p className="mx-auto mb-10 max-w-2xl text-center leading-relaxed text-gray-600 dark:text-white/70">
          Project-project yang sedang dalam proses pengembangan aktif. Pantau
          terus untuk update terbaru! 🔨
        </p>

        {/* Project Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {inDevelopmentProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-indigo-100/60 bg-white/80 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-200/40 dark:border-indigo-500/20 dark:bg-white/5 dark:hover:shadow-indigo-500/20"
              onClick={() => setSelectedProject(project)}
            >
              {/* Gradient border glow effect */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.05) 100%)",
                }}
              />

              {/* Top row */}
              <div className="mb-4 flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-white/50">
                    Target: {project.expectedDate}
                  </p>
                </div>

                {/* Badge */}
                <span className="dev-badge flex shrink-0 items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
                  <FaHammer className="text-[10px]" />
                  In Dev
                </span>
              </div>

              {/* Description */}
              <p className="mb-5 text-sm leading-relaxed text-gray-600 dark:text-white/65">
                {project.description}
              </p>

              {/* Progress Bar */}
              <div className="mb-5">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-500 dark:text-white/50">
                    Progress
                  </span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {project.progress}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                  <motion.div
                    className="progress-bar-shimmer h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${project.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: index * 0.15, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Tech icons */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <img
                      key={i}
                      src={t}
                      alt=""
                      className="h-5 w-5 object-contain opacity-75 transition group-hover:opacity-100"
                    />
                  ))}
                </div>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-400 transition hover:text-indigo-600 dark:hover:text-indigo-400"
                    aria-label={`GitHub ${project.title}`}
                  >
                    <FaGithub className="text-lg" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-[#12122a]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal gradient top bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

            <div className="p-6">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20"
                aria-label="Tutup"
              >
                <span className="text-lg leading-none">&times;</span>
              </button>

              <div className="mb-1 flex items-center gap-2">
                <BiChip className="text-2xl text-indigo-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h2>
              </div>

              <p className="mb-1 text-xs text-indigo-500 dark:text-indigo-400">
                Target selesai: {selectedProject.expectedDate}
              </p>

              <p className="mb-5 mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/70">
                {selectedProject.description}
              </p>

              {/* Progress */}
              <div className="mb-5">
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-gray-500 dark:text-white/50">Progress pengembangan</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {selectedProject.progress}%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                  <div
                    className="progress-bar-shimmer h-full rounded-full"
                    style={{ width: `${selectedProject.progress}%` }}
                  />
                </div>
              </div>

              {/* Features */}
              <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Fitur yang sedang dibangun:
              </h3>
              <ul className="mb-5 space-y-1.5">
                {selectedProject.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600 dark:text-white/65">
                    <span className="mt-0.5 text-indigo-500">▸</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Languages */}
              <div className="flex flex-wrap gap-2">
                {selectedProject.languages.map((l) => (
                  <span
                    key={l}
                    className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
}
