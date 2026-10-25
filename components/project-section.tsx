"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { projectsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { FaGithub } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import { HiArrowLeft, HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import SectionHeading from "./section-heading";
import { ScrambleText } from "./text-effects";

type Project = (typeof projectsData)[number];

const TOTAL = projectsData.length;
const LIST_COUNT = 6;
const pad = (n: number) => String(n).padStart(2, "0");

// Jarak terpendek (melingkar) dari kartu aktif
function circularOffset(index: number, active: number) {
  let d = index - active;
  if (d > TOTAL / 2) d -= TOTAL;
  if (d < -TOTAL / 2) d += TOTAL;
  return d;
}

function Coverflow({
  active,
  setActive,
  onOpen,
}: {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  onOpen: (p: Project) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [spacing, setSpacing] = useState(260);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setSpacing(Math.min(el.offsetWidth * 0.27, 330))
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative h-[200px] touch-pan-y select-none [--card-w:270px] [perspective:1400px] sm:h-[300px] sm:[--card-w:440px] lg:h-[380px] lg:[--card-w:580px]"
      onPanEnd={(_, info) => {
        if (info.offset.x < -40) setActive((a) => (a + 1) % TOTAL);
        else if (info.offset.x > 40) setActive((a) => (a - 1 + TOTAL) % TOTAL);
      }}
    >
      {projectsData.map((project, i) => {
        const o = circularOffset(i, active);
        const abs = Math.abs(o);
        if (abs > 3) return null;
        const x = o === 0 ? 0 : Math.sign(o) * (abs === 1 ? spacing : spacing * 1.7);
        return (
          <motion.button
            key={project.title}
            type="button"
            className="absolute left-1/2 top-0 overflow-hidden rounded-xl border border-ink/10 bg-surface shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] outline-none focus-visible:ring-2 focus-visible:ring-ink"
            style={{
              width: "var(--card-w)",
              marginLeft: "calc(var(--card-w) / -2)",
              zIndex: 10 - abs,
            }}
            initial={false}
            animate={{
              x,
              scale: 1 - abs * 0.15,
              rotateY: o * -16,
              opacity: abs > 2 ? 0 : 1,
              filter: abs === 0 ? "brightness(1)" : "brightness(0.62)",
            }}
            transition={{ type: "spring", stiffness: 240, damping: 30 }}
            onClick={() => (o === 0 ? onOpen(project) : setActive(i))}
            aria-label={o === 0 ? `Lihat detail ${project.title}` : `Tampilkan ${project.title}`}
            tabIndex={abs > 1 ? -1 : 0}
          >
            <img
              src={project.image}
              alt={project.title}
              draggable={false}
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </motion.button>
        );
      })}
    </motion.div>
  );
}

const ProjectSection: React.FC = () => {
  const { ref } = useSectionInView("Projects");
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryInView = useInView(galleryRef, { margin: "-120px" });
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const current = projectsData[active];
  const listed = showAll ? projectsData : projectsData.slice(0, LIST_COUNT);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    setZoomedImage(null);
    document.body.style.overflow = "auto";
  };

  // Galeri berputar otomatis selama terlihat dan tidak di-hover
  useEffect(() => {
    if (!galleryInView || hovering || selectedProject) return;
    const id = setInterval(() => setActive((a) => (a + 1) % TOTAL), 4500);
    return () => clearInterval(id);
  }, [galleryInView, hovering, selectedProject]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (zoomedImage) setZoomedImage(null);
      else if (selectedProject) closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomedImage, selectedProject]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="scroll-mt-24 overflow-x-clip py-24 sm:py-32"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Selected Work"
          description="Project pilihan dari GitHub dan folder lokal: aplikasi operasional, dashboard, mobile app, UI/UX, data, dan computer vision dengan fitur yang bisa dinilai langsung."
        >
          Work Gallery
        </SectionHeading>
      </div>

      {/* Galeri 3D */}
      <div
        ref={galleryRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Coverflow active={active} setActive={setActive} onOpen={openProject} />

        <div className="container-page mt-12 grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <p className="mono-label">
                {pad(active + 1)} / {pad(TOTAL)}
              </p>
              <h3 className="mt-3 max-w-3xl text-2xl font-bold tracking-[-0.03em] sm:text-4xl">
                {current.title}
              </h3>
              <p className="mt-3 line-clamp-2 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
                {current.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {current.languages.slice(0, 5).map((l) => (
                  <span key={l} className="tag">
                    {l}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Project sebelumnya"
              onClick={() => setActive((a) => (a - 1 + TOTAL) % TOTAL)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition hover:border-ink hover:bg-ink hover:text-invert"
            >
              <HiArrowLeft />
            </button>
            <button
              type="button"
              aria-label="Project berikutnya"
              onClick={() => setActive((a) => (a + 1) % TOTAL)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition hover:border-ink hover:bg-ink hover:text-invert"
            >
              <HiArrowRight />
            </button>
            <button
              type="button"
              onClick={() => openProject(current)}
              className="btn-outline ml-2"
            >
              Detail <HiArrowUpRight />
            </button>
          </div>
        </div>
      </div>

      {/* Daftar semua project */}
      <div className="container-page mt-28">
        <div className="flex items-end justify-between border-b border-ink/15 pb-4">
          <ScrambleText text="All Projects" className="mono-label" />
          <span className="mono-label">{TOTAL} Projects</span>
        </div>

        <ul>
          {listed.map((project, i) => (
            <motion.li
              key={project.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % LIST_COUNT) * 0.04 }}
            >
              <button
                type="button"
                onClick={() => openProject(project)}
                className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-start gap-4 border-b border-ink/10 py-6 text-left transition-colors hover:bg-ink/[0.025] sm:grid-cols-[3rem_1fr_auto] sm:px-3"
              >
                <span className="pt-1 font-mono text-xs text-muted">{pad(i + 1)}</span>
                <span>
                  <span className="block text-lg font-semibold tracking-tight underline-offset-4 group-hover:underline">
                    {project.title}
                  </span>
                  <span className="mt-1.5 line-clamp-2 block max-w-3xl text-sm leading-relaxed text-muted">
                    {project.description}
                  </span>
                  <span className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-ink/70">
                      {project.languages.slice(0, 3).join(" · ")}
                    </span>
                    <span className="flex gap-1.5">
                      {project.tech.map((t, ti) => (
                        <img key={ti} src={t} alt="" className="logo-icon h-4 w-4 object-contain" />
                      ))}
                    </span>
                  </span>
                </span>
                <HiArrowUpRight className="mt-1 text-lg text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
              </button>
            </motion.li>
          ))}
        </ul>

        {TOTAL > LIST_COUNT && (
          <button
            type="button"
            onClick={() => setShowAll((s) => !s)}
            className="btn-outline mt-10"
          >
            {showAll ? "Tampilkan lebih sedikit" : `Lihat semua project (${TOTAL})`}
          </button>
        )}
      </div>

      {/* Modal detail project */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="project-modal"
            className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selectedProject.title}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-ink/10 bg-surface shadow-2xl sm:rounded-3xl"
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/8] overflow-hidden bg-ink/5">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <button
                onClick={closeModal}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-ink shadow-md backdrop-blur transition hover:bg-surface"
                aria-label="Tutup detail project"
              >
                <IoClose className="text-lg" />
              </button>

              <div className="px-6 pb-8 pt-7 sm:px-9">
                <p className="mono-label">Project Detail</p>
                <h2 className="mt-2 pr-8 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                  {selectedProject.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  {selectedProject.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedProject.languages.map((language) => (
                    <span key={language} className="tag">
                      {language}
                    </span>
                  ))}
                </div>

                <p className="mono-label mb-3 mt-8">Fitur Utama</p>
                <ul className="divide-y divide-ink/10 border-y border-ink/10">
                  {selectedProject.features.map((feature, fi) => (
                    <li
                      key={feature}
                      className="flex gap-4 py-3 text-[0.95rem] leading-relaxed text-ink/85"
                    >
                      <span className="pt-0.5 font-mono text-xs text-muted">{pad(fi + 1)}</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="mono-label mb-3 mt-8">Galeri Project</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {selectedProject.screenshots.map((screenshot, index) => (
                    <button
                      key={`${selectedProject.title}-${index}`}
                      type="button"
                      onClick={() => setZoomedImage(screenshot)}
                      className="group/thumb relative aspect-[4/3] overflow-hidden rounded-xl border border-ink/10 bg-ink/5"
                      aria-label={`Perbesar screenshot ${index + 1}`}
                    >
                      <img
                        src={screenshot}
                        alt={`${selectedProject.title} screenshot ${index + 1}`}
                        className="h-full w-full object-cover object-top transition duration-500 group-hover/thumb:scale-105"
                      />
                    </button>
                  ))}
                </div>

                {(selectedProject.githubUrl || selectedProject.demoUrl) && (
                  <div className="mt-8 flex flex-wrap gap-3 border-t border-ink/10 pt-6">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ink"
                      >
                        <FaGithub /> Repository
                      </a>
                    )}
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline"
                      >
                        <BiLinkExternal /> Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox gambar */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
          >
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Tutup gambar"
            >
              <IoClose className="text-xl" />
            </button>
            <motion.img
              src={zoomedImage}
              alt="Screenshot project"
              className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectSection;
