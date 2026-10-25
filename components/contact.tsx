"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { HiArrowUpRight, HiMinus, HiOutlineEnvelope } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import { ScrambleText } from "./text-effects";

const contactLinks = [
  {
    href: "mailto:if23.ahmadmayiludin@mhs.ubpkarawang.ac.id",
    label: "Email",
    value: "if23.ahmadmayiludin@mhs.ubpkarawang.ac.id",
    icon: <HiOutlineEnvelope />,
  },
  {
    href: "https://github.com/AhmadMayiludin",
    label: "GitHub",
    value: "github.com/AhmadMayiludin",
    icon: <FaGithub />,
  },
  {
    href: "https://www.linkedin.com/in/ahmad-mayiludin-462371250/",
    label: "LinkedIn",
    value: "linkedin.com/in/ahmad-mayiludin",
    icon: <BsLinkedin />,
  },
  {
    href: "https://www.instagram.com/ahmadmayiludin",
    label: "Instagram",
    value: "@ahmadmayiludin",
    icon: <BsInstagram />,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section
      id="contact"
      ref={ref}
      className="container-page scroll-mt-24 py-24 sm:py-32"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
        <div>
          <ScrambleText text="Get in Touch" className="mono-label block" />
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-[clamp(3.5rem,10vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.05em]"
          >
            Let&apos;s
            <br />
            Work
            <br />
            Together
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 max-w-md text-xl font-semibold leading-snug tracking-tight"
          >
            Mencari tantangan berikutnya untuk dipecahkan.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted"
          >
            Saya terbuka untuk kesempatan kerja, magang, freelance, atau
            kolaborasi project di bidang web development, mobile app, dashboard,
            dan software engineering.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8"
          >
            <a href="/cv/resume.pdf" download className="btn-ink">
              Download CV <HiArrowUpRight />
            </a>
          </motion.div>
        </div>

        <div className="flex flex-col gap-3">
          {contactLinks.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card group relative flex items-center gap-4 p-5 transition duration-300 hover:border-ink/30"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink/15 text-lg transition duration-300 group-hover:bg-ink group-hover:text-invert">
                {c.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="mono-label block !text-[0.6rem]">{c.label}</span>
                <span className="mt-1 block truncate text-sm font-medium">
                  {c.value}
                </span>
              </span>
              <span className="flex flex-col items-end gap-2 self-stretch">
                <span className="font-mono text-[0.62rem] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <HiArrowUpRight className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
              </span>
            </motion.a>
          ))}

          <motion.button
            type="button"
            onClick={() => setIsFormOpen(true)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="btn-outline mt-3 w-full py-4"
          >
            Send Me a Message →
          </motion.button>
        </div>
      </div>

      {/* Popup kirim pesan */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            role="dialog"
            aria-label="Kirim pesan"
            className="fixed inset-x-3 bottom-3 z-[960] overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[24rem]"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{ transformOrigin: "bottom right" }}
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3.5">
              <p className="text-sm font-semibold">Send Me a Message</p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-ink/5 hover:text-ink"
                  aria-label="Kecilkan"
                >
                  <HiMinus />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEmail("");
                    setMessage("");
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-ink/5 hover:text-ink"
                  aria-label="Tutup"
                >
                  <IoClose />
                </button>
              </div>
            </div>

            <form
              className="flex flex-col gap-4 p-5"
              action={async () => {
                const trimmedEmail = email.trim();
                const trimmedMessage = message.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!trimmedEmail) {
                  toast.error("Email wajib diisi.");
                  return;
                }

                if (!emailRegex.test(trimmedEmail)) {
                  toast.error("Masukkan alamat email yang valid.");
                  return;
                }

                if (trimmedMessage.length < 10) {
                  toast.error("Pesan minimal 10 karakter.");
                  return;
                }

                const { error } = await sendEmail({
                  senderEmail: trimmedEmail,
                  message: trimmedMessage,
                });

                if (error) {
                  toast.error(error);
                  return;
                }

                setEmail("");
                setMessage("");
                toast.success("Pesan berhasil dikirim.");
              }}
            >
              <label className="flex flex-col gap-2">
                <span className="mono-label !text-[0.6rem]">Email</span>
                <input
                  className="input-field h-11"
                  name="senderEmail"
                  type="email"
                  required
                  maxLength={500}
                  placeholder="Email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="mono-label !text-[0.6rem]">Pesan</span>
                <textarea
                  className="input-field h-36 resize-none py-3"
                  name="message"
                  placeholder="Pesan Anda"
                  required
                  maxLength={5000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>
              <SubmitBtn />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
