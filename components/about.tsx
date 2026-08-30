"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import BurstBload from "./burst-bload";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[48rem] scroll-mt-28 text-center leading-8 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <div className="flex justify-center">
        <SectionHeading>About Me</SectionHeading>
        <BurstBload />
      </div>
      <p className="mb-4">
        Halo, saya <span className="font-medium">Ahmad Mayiludin</span>,
        mahasiswa Universitas Buana Perjuangan Karawang dengan IPK{" "}
        <span className="font-medium">3.77</span>. Saya fokus membangun produk
        digital yang dekat dengan kebutuhan operasional: dashboard bisnis,
        aplikasi mobile internal, sistem administrasi, dan otomasi berbasis
        data.
      </p>

      <p className="mb-4">
        Stack utama saya mencakup{" "}
        <span className="font-medium">Laravel, PHP, MySQL, React, Ionic Angular,
        TypeScript, Tailwind CSS, Python, OpenCV,</span> dan desain UI/UX
        menggunakan Figma. Saya terbiasa memecah kebutuhan menjadi fitur,
        membuat alur pengguna, mengintegrasikan API, serta menyiapkan tampilan
        yang mudah dipakai.
      </p>

      <p>
        Di luar teknis, pengalaman organisasi dan kepanitiaan membantu saya
        lebih rapi dalam komunikasi, koordinasi, dan menyelesaikan pekerjaan
        bersama tim. Saat ini saya siap untuk role junior web/mobile developer,
        frontend developer, backend developer, atau software engineer intern.
      </p>
    </motion.section>
  );
}
