import React, { useState } from "react";
import { CgClose, CgMenuRightAlt } from "react-icons/cg";
import { links } from "@/lib/data";
import { motion } from "framer-motion";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };
  return (
    <div className="md:hidden fixed top-3 right-3 z-[999] flex flex-col items-end">
      <button
        onClick={() => setOpen((open) => !open)}
        type="button"
        aria-label="Toggle mobile menu"
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-3 text-gray-700 dark:text-gray-200 flex items-center justify-center text-[1.35rem] rounded-xl shadow-lg border border-black/5 dark:border-white/10 hover:scale-105 active:scale-95 transition cursor-pointer"
      >
        {open ? <CgClose /> : <CgMenuRightAlt />}
      </button>

      {open && (
        <motion.div
          className="mt-2 w-52 overflow-hidden rounded-2xl bg-white/95 p-2 shadow-2xl backdrop-blur-md border border-black/5 dark:bg-gray-900/95 dark:border-white/10"
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.hash}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-2.5 text-base font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black dark:text-gray-200 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </div>
  );
}
