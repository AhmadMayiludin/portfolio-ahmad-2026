"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projectsData } from "@/lib/data";
import BurstBload2 from "./burst-bload-2";
import { useSectionInView } from "@/lib/hooks";
import { useInView } from "react-intersection-observer";
import { FaArrowDown, FaGithub } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import SectionHeading from "./section-heading";

type Project = (typeof projectsData)[number];

const ProjectSection: React.FC = () => {
  const { ref } = useSectionInView("Projects", 0.5);
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
  });
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const displayedProjects = showAllProjects
    ? projectsData
    : projectsData.slice(0, 4);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setZoomedImage(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mb-28 w-full scroll-mt-28"
      ref={ref}
    >
      <div ref={sectionRef} className="mx-auto w-full max-w-6xl px-4">
        <div className="flex justify-center mb-2">
          <SectionHeading>Projects</SectionHeading>
          <BurstBload2 />
        </div>
        <p className="mx-auto mb-8 max-w-2xl text-center leading-relaxed text-gray-700 dark:text-white/75">
          Project pilihan dari GitHub dan folder lokal: aplikasi operasional,
          dashboard, mobile app, UI/UX, data, dan computer vision dengan fitur
          yang bisa dinilai langsung.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-8 md:grid-cols-2">
          {displayedProjects.map((project, index) => (
            <motion.article
              key={project.title}
              onClick={() => handleProjectClick(project)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.96 }}
              transition={{ duration: 0.45, delay: 0.08 * index }}
              whileHover={{ y: -4 }}
              className="cursor-pointer overflow-hidden rounded-lg border border-black/5 bg-white text-black shadow-lg transition hover:shadow-xl dark:border-white/10 dark:bg-[#232D3F]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-56 w-full bg-gray-100 object-cover dark:bg-white/5"
                width="640"
                height="224"
              />
              <div className="p-5">
                <h3 className="mb-2 text-xl font-semibold dark:text-white">
                  {project.title}
                </h3>
                <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-200">
                  {project.description}
                </p>
                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <img
                        key={`${project.title}-${techIndex}`}
                        src={tech}
                        alt=""
                        className="h-6 w-6 object-contain"
                        width="24"
                        height="24"
                      />
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="text-xl text-gray-600 hover:text-gray-950 dark:text-gray-200 dark:hover:text-white"
                        aria-label={`Buka demo ${project.title}`}
                      >
                        <BiLinkExternal />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="text-xl text-gray-600 hover:text-gray-950 dark:text-gray-200 dark:hover:text-white"
                        aria-label={`Buka repository ${project.title}`}
                      >
                        <FaGithub />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {!showAllProjects && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAllProjects(true)}
              className="group flex min-h-[3rem] items-center justify-center gap-2 rounded-md bg-gray-900 px-5 text-white outline-none transition-all hover:scale-105 hover:bg-gray-950 focus:scale-105 active:scale-100 dark:bg-white dark:bg-opacity-10"
            >
              Lihat Lainnya
              <FaArrowDown className="text-xs opacity-70 transition-all" />
            </button>
          </div>
        )}
      </div>

      {selectedProject && (
        <div className="modal-overlay">
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleCloseModal}
          >
            <div
              className="relative mx-auto max-h-[85vh] w-full max-w-[900px] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#232D3F] sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20 dark:hover:text-white"
                aria-label="Tutup detail project"
              >
                <span className="text-2xl leading-none">&times;</span>
              </button>
              <h2 className="mb-2 pr-8 text-2xl font-bold dark:text-white">
                {selectedProject.title}
              </h2>
              <p className="mb-5 leading-relaxed text-gray-600 dark:text-gray-200">
                {selectedProject.description}
              </p>

              <div className="mb-5">
                <h3 className="mb-2 text-lg font-semibold dark:text-white">
                  Fitur Utama
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  {selectedProject.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-gray-600 dark:text-gray-200"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <h4 className="mb-2 text-lg font-semibold dark:text-white">
                Galeri Project
              </h4>
              <div className="mb-5 flex flex-wrap gap-4">
                {selectedProject.screenshots.map((screenshot, index) => (
                  <img
                    key={`${selectedProject.title}-${index}`}
                    src={screenshot}
                    alt={`${selectedProject.title} screenshot ${index + 1}`}
                    className="h-28 w-36 cursor-pointer rounded-lg bg-gray-100 object-cover shadow-sm transition hover:scale-105 dark:bg-white/5"
                    onClick={() => setZoomedImage(screenshot)}
                  />
                ))}
              </div>

              <h4 className="mb-2 text-lg font-semibold dark:text-white">
                Bahasa dan Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.languages.map((language) => (
                  <span
                    key={language}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-white/10 dark:text-gray-200"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {zoomedImage && (
        <div className="image-modal-overlay">
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setZoomedImage(null)}
          >
            <div
              className="relative mx-auto max-w-[1000px] w-full rounded-2xl bg-white p-4 shadow-2xl dark:bg-[#192D3E] sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20 dark:hover:text-white"
                aria-label="Tutup gambar"
              >
                <span className="text-2xl leading-none">&times;</span>
              </button>
              <div className="flex max-h-[75vh] w-full items-center justify-center overflow-hidden pt-6">
                <img
                  src={zoomedImage}
                  alt="Screenshot project"
                  className="max-h-[70vh] max-w-full rounded-lg object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.section>
  );
};

export default ProjectSection;
