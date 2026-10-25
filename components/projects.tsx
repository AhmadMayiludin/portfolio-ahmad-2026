"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import BurstBload2 from "./burst-bload-2";

export default function Projects() {
  const { ref } = useSectionInView("Projects");

  return (
    <section id="projects" ref={ref} className="scroll-mt-28 mb-28">
      <div className="text-center">
        <SectionHeading>🚀 Projects</SectionHeading>
        <BurstBload2 />
        {/* DIUBAH: Paragraf deskripsi diterjemahkan */}
        <p className="mb-10 max-w-[42rem] mx-auto leading-relaxed">
          Saya telah mengerjakan berbagai proyek, mulai dari MVP (Minimum Viable
          Product) sederhana hingga aplikasi skala penuh, serta mengembangkan
          beragam fitur dan fungsionalitas di dalamnya.
        </p>
      </div>

      {/* DIUBAH: div ini menggunakan grid untuk layout yang lebih baik */}
      <div className="grid sm:grid-cols-2 gap-8">
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}