"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skills } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import BurstBload2 from "./burst-bload-2";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <div className="absolute bottom-[-6rem] left-[-35rem] -z-10 h-[31.25rem] w-[50rem] rounded-full bg-emerald-400 blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#183D3D]"></div>

      <div className="flex justify-center">
        <SectionHeading>Teknologi & Keahlian</SectionHeading>
        <BurstBload2 />
      </div>
      <div className="grid grid-cols-4 items-center gap-7 md:grid-cols-4 md:gap-8 xl:grid-cols-5 xl:gap-10">
        {skills.map((skill, index) => (
          <div key={skill.id} className="relative mt-5 flex justify-center">
            <motion.div
              custom={index}
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className="relative flex h-[71px] w-[70px] justify-center rounded-md bg-white p-3 shadow-[8px_8px_0_0_#000000] transition-shadow hover:shadow-[15px_15px_0_0_#000000] md:h-[140px] md:w-[144px] md:p-5 dark:bg-[#232D3F] dark:shadow-[8px_8px_0_0_#334155] dark:hover:shadow-[15px_15px_0_0_#334155]"
            >
              <img
                src={skill.imgUrl}
                alt="Tech stack"
                width="192"
                height="192"
                className="w-6 object-contain md:w-16"
              />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
