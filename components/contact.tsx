"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 w-[min(100%,38rem)] scroll-mt-28 text-center sm:mb-28"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <div className="absolute bottom-[-6rem] right-[11rem] -z-10 h-[31.25rem] w-[31.25rem] rounded-full bg-[#fbe2e3] blur-[10rem] sm:w-[68.75rem] dark:bg-[#7d5353]"></div>

      <SectionHeading>Hubungi Saya</SectionHeading>

      <p className="-mt-6 text-gray-700 dark:text-white/80">
        Saya terbuka untuk kesempatan kerja, magang, freelance, atau kolaborasi
        project di bidang web development, mobile app, dashboard, dan software
        engineering.
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
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
        <input
          className="h-14 rounded-lg bg-white px-4 transition-all borderBlack dark:bg-white dark:bg-opacity-80 dark:outline-none dark:focus:bg-opacity-100"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Email Anda"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          className="my-3 h-40 rounded-lg bg-white p-4 transition-all borderBlack dark:bg-white dark:bg-opacity-80 dark:outline-none dark:focus:bg-opacity-100"
          name="message"
          placeholder="Pesan Anda"
          required
          maxLength={5000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SubmitBtn />
      </form>
    </motion.section>
  );
}
