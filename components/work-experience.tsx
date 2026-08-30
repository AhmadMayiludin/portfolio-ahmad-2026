"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { workExperienceData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { motion } from "framer-motion";

export default function WorkExperience() {
  const { ref } = useSectionInView("Experience");
  const { theme } = useTheme();

  return (
    <section
      ref={ref}
      id="experience"
      className="mb-16 w-full max-w-[53rem] scroll-mt-28"
    >
      <SectionHeading>Work Experience</SectionHeading>

      <div className="flex flex-col gap-6">
        {workExperienceData.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-lg border p-6 shadow-sm ${
              theme === "light"
                ? "bg-gray-100 border-gray-200"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div className="mb-4 flex items-start gap-4">
              <div
                className={`rounded-lg p-3 text-2xl ${
                  theme === "light" ? "bg-white shadow" : "bg-white/10"
                }`}
              >
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="font-semibold text-blue-600 dark:text-blue-400">
                  {item.company}
                </p>
                <p className="text-sm text-gray-500 dark:text-white/60">
                  {item.division} - {item.date}
                </p>
              </div>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-3">
              {item.imageUrls.map((img, i) => (
                <img
                  key={img}
                  src={img}
                  alt={`${item.title} dokumentasi ${i + 1}`}
                  className="aspect-[3/4] w-full rounded-lg bg-gray-100 object-contain shadow-md dark:bg-white/5"
                />
              ))}
            </div>

            <ul className="mb-5 space-y-2 text-sm text-gray-700 dark:text-white/75">
              {item.description.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-1 shrink-0 text-blue-500">-</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {item.tech.map((tech) => (
                <span
                  key={tech}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    theme === "light"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-blue-500/20 text-blue-300"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
