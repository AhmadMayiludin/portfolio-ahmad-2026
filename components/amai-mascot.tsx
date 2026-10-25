"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { IoClose, IoSend } from "react-icons/io5";
import { HiMinus, HiSparkles } from "react-icons/hi2";

/* ============================================================
   SECTION MESSAGES — auto speech bubble saat user scroll
   ============================================================ */
const sectionMessages: Record<string, string[]> = {
  home: [
    "Halo! 👋 Saya AMAI, guide portfolio Ahmad!",
    "Selamat datang di portfolio Ahmad Mayiludin! 🎉",
    "Scroll ke bawah untuk lihat karya-karya Ahmad ya!",
  ],
  about: [
    "Ini section About Ahmad! 😊",
    "Ahmad itu mahasiswa UBP Karawang dengan IPK 3.77 lho! 🌟",
    "Fullstack + Mobile + Computer Vision — Ahmad bisa semua! 💪",
  ],
  projects: [
    "Wah, ini semua project buatan Ahmad! 🚀",
    "Klik salah satu card untuk lihat detail project-nya!",
    "Ada dashboard, mobile app, AI, sampai UI/UX — lengkap banget! ✨",
  ],
  skills: [
    "Ini daftar teknologi yang Ahmad kuasai! 🛠️",
    "Dari Laravel sampai Python & OpenCV — serba bisa! 🔥",
    "Ahmad terus belajar skill baru setiap saat! 📚",
  ],
  experience: [
    "Ini pengalaman kerja dan kepanitiaan Ahmad! 🏆",
    "Ahmad pernah magang di PERUMDA Tirta Bhagasasi lho! 💼",
    "Banyak pengalaman organisasi juga — mantap! 🎯",
  ],
  contact: [
    "Tertarik kolaborasi dengan Ahmad? 🤝",
    "Kirim pesan lewat form di bawah, atau chat langsung sama saya! 💬",
    "Ahmad terbuka untuk kerja, magang, dan freelance! 🌐",
  ],
};

const quickQuestions = [
  "Siapa Ahmad?",
  "Project apa saja yang pernah dibuat?",
  "Skill apa yang dikuasai?",
  "Bagaimana cara menghubungi Ahmad?",
];

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type Expression = "happy" | "thinking" | "wave";

const SYSTEM_PROMPT = `Kamu adalah AMAI (Ahmad's AI Guide), maskot AI yang membantu pengunjung portfolio Ahmad Mayiludin.

Tentang Ahmad Mayiludin:
- Mahasiswa Universitas Buana Perjuangan Karawang, IPK 3.77
- Junior Full Stack & Mobile Developer
- Keahlian: Laravel, PHP, MySQL, React, Ionic Angular, TypeScript, Tailwind CSS, Python, OpenCV, Figma
- Pengalaman magang: Mobile App Developer Intern di PERUMDA Tirta Bhagasasi (Oktober 2025 - Januari 2026)
- Membangun aplikasi web, dashboard operasional, mobile app, Computer Vision
- Terbuka untuk: junior web/mobile developer, frontend, backend, software engineer intern
- GitHub: https://github.com/AhmadMayiludin
- LinkedIn: https://www.linkedin.com/in/ahmad-mayiludin-462371250/
- Email: if23.ahmadmayiludin@mhs.ubpkarawang.ac.id

Kamu bertugas menjawab pertanyaan tentang Ahmad dengan ramah, antusias, dan informatif dalam bahasa Indonesia.
Gunakan emoji yang sesuai. Jika ditanya tentang hal yang tidak kamu tahu, sarankan untuk langsung menghubungi Ahmad.
Jangan menjawab lebih dari 3-4 kalimat agar ringkas.`;

/* ============================================================
   MASKOT AMAI — robot kepala bulat dengan visor & mata menyala
   ============================================================ */
function MascotSVG({
  expression = "happy",
  eyeX,
  eyeY,
  animated = true,
}: {
  expression?: Expression;
  eyeX?: MotionValue<number>;
  eyeY?: MotionValue<number>;
  animated?: boolean;
}) {
  // Definisi gradient sama di semua instance, jadi id statis aman dipakai bersama
  const id = (name: string) => `amai-${name}`;

  const float = animated
    ? {
        animate: { y: [0, -3, 0] },
        transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
      }
    : {};

  return (
    <svg viewBox="0 0 120 120" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={id("head")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e8e8eb" />
        </linearGradient>
        <linearGradient id={id("visor")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2a30" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
        <linearGradient id={id("ear")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#52525b" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
        <radialGradient id={id("bulb")} cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#a1a1aa" />
          <stop offset="100%" stopColor="#27272a" />
        </radialGradient>
        <filter id={id("glow")} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {/* Bayangan */}
      {animated && (
        <motion.ellipse
          cx="60"
          cy="112"
          rx="30"
          ry="4"
          className="fill-black/10 dark:fill-black/40"
          animate={{ scaleX: [1, 0.86, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <motion.g {...float}>
        {/* Antena */}
        <rect x="58" y="10" width="4" height="14" rx="2" fill="#52525b" />
        <motion.circle
          cx="60"
          cy="9"
          r="9"
          fill="#a1a1aa"
          animate={{ opacity: [0.15, 0.4, 0.15], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="60" cy="9" r="5.5" fill={`url(#${id("bulb")})`} />

        {/* Telinga */}
        <rect x="7" y="48" width="11" height="24" rx="5.5" fill={`url(#${id("ear")})`} />
        <rect x="102" y="48" width="11" height="24" rx="5.5" fill={`url(#${id("ear")})`} />

        {/* Kepala */}
        <rect
          x="15"
          y="22"
          width="90"
          height="76"
          rx="34"
          fill={`url(#${id("head")})`}
          stroke="#d4d4d8"
          strokeWidth="1.5"
        />
        <ellipse cx="42" cy="32" rx="14" ry="5" fill="#ffffff" opacity="0.9" />

        {/* Visor */}
        <rect x="26" y="37" width="68" height="47" rx="22" fill={`url(#${id("visor")})`} />
        <path
          d="M38 42 Q50 39 62 40"
          stroke="#ffffff"
          strokeOpacity="0.14"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />


        {/* Mata */}
        <motion.g style={eyeX && eyeY ? { x: eyeX, y: eyeY } : undefined}>
          {expression === "wave" ? (
            <g stroke="#f4f4f5" strokeWidth="4" strokeLinecap="round" fill="none">
              <path d="M42 62 Q48.5 53 55 62" filter={`url(#${id("glow")})`} opacity="0.7" />
              <path d="M65 62 Q71.5 53 78 62" filter={`url(#${id("glow")})`} opacity="0.7" />
              <path d="M42 62 Q48.5 53 55 62" />
              <path d="M65 62 Q71.5 53 78 62" />
            </g>
          ) : (
            <motion.g
              animate={
                expression === "thinking"
                  ? { x: 3, y: -4, scaleY: 0.8 }
                  : { x: 0, y: 0, scaleY: [1, 1, 0.12, 1, 1] }
              }
              transition={
                expression === "thinking"
                  ? { duration: 0.3 }
                  : {
                      duration: 4.5,
                      times: [0, 0.88, 0.91, 0.94, 1],
                      repeat: Infinity,
                    }
              }
            >
              <g fill="#f4f4f5">
                <rect x="43" y="51" width="11" height="16" rx="5.5" filter={`url(#${id("glow")})`} opacity="0.65" />
                <rect x="66" y="51" width="11" height="16" rx="5.5" filter={`url(#${id("glow")})`} opacity="0.65" />
                <rect x="43" y="51" width="11" height="16" rx="5.5" />
                <rect x="66" y="51" width="11" height="16" rx="5.5" />
              </g>
              <rect x="46" y="54" width="3.5" height="5" rx="1.75" fill="#ffffff" opacity="0.9" />
              <rect x="69" y="54" width="3.5" height="5" rx="1.75" fill="#ffffff" opacity="0.9" />
            </motion.g>
          )}
        </motion.g>

        {/* Mulut */}
        {expression === "thinking" ? (
          <path d="M55 75 L65 75" stroke="#f4f4f5" strokeWidth="2.5" strokeLinecap="round" />
        ) : (
          <path
            d="M53 73 Q60 79 67 73"
            stroke="#f4f4f5"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Tangan melambai */}
        <AnimatePresence>
          {expression === "wave" && (
            <motion.g
              key="hand"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: [0, 18, -8, 18, 0] }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
                rotate: { duration: 1.4, repeat: Infinity, repeatDelay: 0.6 },
              }}
              style={{ originX: 0.1, originY: 0.95 }}
            >
              <circle cx="110" cy="86" r="8" fill={`url(#${id("head")})`} stroke="#d4d4d8" strokeWidth="1.5" />
            </motion.g>
          )}
        </AnimatePresence>
      </motion.g>

      {/* Titik berpikir */}
      {expression === "thinking" &&
        [0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={100 + i * 7}
            cy={20 - i * 6}
            r={2 + i * 0.8}
            fill="#a1a1aa"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
    </svg>
  );
}

/* Mata mengikuti kursor */
function useEyeTracking(ref: React.RefObject<HTMLElement>, enabled: boolean) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const strength = Math.min(1, dist / 260);
      x.set((dx / dist) * 4 * strength);
      y.set((dy / dist) * 3 * strength);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, ref, x, y]);

  return { x: springX, y: springY };
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function AMAIMascot() {
  const [activeSection, setActiveSection] = useState("home");
  const [speechText, setSpeechText] = useState(sectionMessages.home[0]);
  const [msgIndex, setMsgIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMascotVisible, setIsMascotVisible] = useState(true);
  const [isBubbleDismissed, setIsBubbleDismissed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Halo! 👋 Saya AMAI, AI guide portfolio Ahmad. Ada yang ingin kamu tanyakan tentang Ahmad atau project-nya? 😊",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [expression, setExpression] = useState<Expression>("wave");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgRotateRef = useRef<NodeJS.Timeout | null>(null);
  const mascotRef = useRef<HTMLButtonElement>(null);
  const eyes = useEyeTracking(mascotRef, isMascotVisible && !isChatOpen);

  /* ---- Scroll detection ---- */
  useEffect(() => {
    const sections = ["home", "projects", "skills", "about", "experience", "contact"];

    const onScroll = () => {
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            if (id !== activeSection) {
              setActiveSection(id);
            }
            break;
          }
        }
      }
      sections.reverse(); // restore order
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  /* ---- Rotate section message ---- */
  useEffect(() => {
    const msgs = sectionMessages[activeSection] ?? sectionMessages.home;
    setMsgIndex(0);
    setSpeechText(msgs[0]);
    setIsBubbleDismissed(false);
    setExpression(activeSection === "contact" ? "wave" : activeSection === "skills" ? "thinking" : "happy");

    // Di HP gelembung cukup tampil sebentar supaya tidak menutupi konten
    const hideTimer = window.matchMedia("(max-width: 639px)").matches
      ? setTimeout(() => setIsBubbleDismissed(true), 4500)
      : null;

    if (msgRotateRef.current) clearInterval(msgRotateRef.current);
    msgRotateRef.current = setInterval(() => {
      setMsgIndex((prev) => {
        const next = (prev + 1) % msgs.length;
        setSpeechText(msgs[next]);
        return next;
      });
    }, 5000);

    return () => {
      if (msgRotateRef.current) clearInterval(msgRotateRef.current);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [activeSection]);

  /* ---- Lambaian pertama lalu kembali senyum ---- */
  useEffect(() => {
    const t = setTimeout(() => {
      setExpression((e) => (e === "wave" && activeSection !== "contact" ? "happy" : e));
    }, 3500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Auto-scroll chat ---- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  /* ---- Fokus input & tombol Escape saat chat terbuka ---- */
  useEffect(() => {
    if (!isChatOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsChatOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [isChatOpen]);

  /* ---- Send chat message ---- */
  const sendMessage = useCallback(async (preset?: string) => {
    const text = (preset ?? inputText).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);
    setExpression("thinking");

    const endpoint = process.env.NEXT_PUBLIC_AI_ENDPOINT;
    const apiKey = process.env.NEXT_PUBLIC_AI_API_KEY;
    const model = process.env.NEXT_PUBLIC_AI_MODEL ?? "gpt-4o";

    try {
      if (!endpoint || !apiKey || apiKey === "your-api-key-here") {
        throw new Error("AI endpoint belum dikonfigurasi");
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...chatMessages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: userMsg.content },
          ],
          temperature: 0.75,
          max_tokens: 300,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content ?? "Maaf, saya tidak bisa menjawab saat ini. 🙏";
      setChatMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      const errMsg =
        (err as Error).message === "AI endpoint belum dikonfigurasi"
          ? "⚙️ AI belum dikonfigurasi. Isi dulu NEXT_PUBLIC_AI_ENDPOINT & NEXT_PUBLIC_AI_API_KEY di file .env.local ya!"
          : "Maaf, terjadi kesalahan saat menghubungi AI. Coba lagi ya! 🙏";
      setChatMessages((prev) => [...prev, { role: "assistant", content: errMsg }]);
    } finally {
      setIsTyping(false);
      setExpression("happy");
    }
  }, [inputText, isTyping, chatMessages]);

  /* ---- Keyboard send ---- */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showBubble = !isBubbleDismissed;

  return (
    <>
      {/* ============================================================
          MASCOT FLOATING WIDGET
         ============================================================ */}
      <AnimatePresence>
        {isMascotVisible && !isChatOpen && (
          <motion.div
            className="fixed bottom-4 right-4 z-[900] sm:bottom-6 sm:right-6"
            initial={{ opacity: 0, scale: 0.6, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            {/* Speech Bubble */}
            <AnimatePresence mode="wait">
              {showBubble && (
                <motion.div
                  key={speechText}
                  className="absolute bottom-full right-1 mb-1 w-max max-w-[13rem] sm:max-w-[15rem]"
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  style={{ transformOrigin: "bottom right" }}
                >
                  <div className="group/bubble relative rounded-2xl rounded-br-md border border-ink/10 bg-surface/95 py-2.5 pl-3.5 pr-8 shadow-xl shadow-black/10 backdrop-blur-xl">
                    <button
                      type="button"
                      onClick={() => setIsChatOpen(true)}
                      className="text-left text-[0.8rem] leading-relaxed text-ink/85"
                    >
                      {speechText}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsBubbleDismissed(true)}
                      className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-muted transition hover:bg-ink/5 hover:text-ink"
                      aria-label="Tutup pesan"
                    >
                      <IoClose className="text-sm" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mascot */}
            <div className="group relative">
              <motion.button
                ref={mascotRef}
                className="relative block h-16 w-16 cursor-pointer outline-none sm:h-20 sm:w-20"
                onClick={() => setIsChatOpen(true)}
                whileHover={{ scale: 1.06, rotate: -4 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Buka chat AMAI"
              >
                <MascotSVG expression={expression} eyeX={eyes.x} eyeY={eyes.y} />
              </motion.button>

              {/* Label */}
              <span className="pointer-events-none absolute -left-1 bottom-1 flex items-center gap-1 rounded-full border border-ink/10 bg-surface/95 px-2 py-0.5 font-mono text-[0.58rem] font-bold tracking-[0.18em] text-ink shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                AMAI
              </span>

              {/* Sembunyikan */}
              <button
                onClick={() => setIsMascotVisible(false)}
                className="absolute -left-2 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-ink/10 bg-surface text-muted shadow-sm transition hover:text-ink focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Sembunyikan maskot"
              >
                <HiMinus className="text-xs" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show button when hidden */}
      <AnimatePresence>
        {!isMascotVisible && !isChatOpen && (
          <motion.button
            className="fixed bottom-4 right-4 z-[900] flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 bg-surface p-1 shadow-lg shadow-black/10 transition hover:scale-110 active:scale-95 sm:bottom-6 sm:right-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setIsMascotVisible(true)}
            aria-label="Tampilkan AMAI"
          >
            <MascotSVG expression="happy" animated={false} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ============================================================
          CHAT PANEL
         ============================================================ */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed inset-0 z-[950] flex items-end justify-end p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/25 backdrop-blur-[2px] dark:bg-black/50"
              onClick={() => setIsChatOpen(false)}
            />

            {/* Chat Window */}
            <motion.div
              role="dialog"
              aria-label="Chat dengan AMAI"
              className="relative z-10 flex h-[min(37rem,calc(100svh-1.5rem))] w-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-2xl shadow-black/25 sm:h-[min(37rem,calc(100vh-3rem))] sm:w-[24rem]"
              style={{ transformOrigin: "bottom right" }}
              initial={{ y: 24, opacity: 0, scale: 0.92 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
            >
              {/* Chat Header */}
              <div className="relative flex items-center gap-3 overflow-hidden border-b border-ink/10 px-4 py-3.5">
                                <div className="relative h-11 w-11 shrink-0 rounded-2xl bg-ink/[0.05] p-0.5">
                  <MascotSVG expression={isTyping ? "thinking" : "happy"} animated={false} />
                </div>
                <div className="relative flex-1">
                  <p className="flex items-center gap-1.5 font-bold text-ink">
                    AMAI
                    <HiSparkles className="text-sm text-ink" />
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-muted">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isTyping ? "animate-pulse bg-ink/50" : "bg-ink"
                      }`}
                    />
                    Ahmad&apos;s AI Guide · {isTyping ? "Mengetik..." : "Online"}
                  </p>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-ink/5 hover:text-ink"
                  aria-label="Tutup chat"
                >
                  <IoClose className="text-lg" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="h-7 w-7 shrink-0">
                        <MascotSVG expression="happy" animated={false} />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] whitespace-pre-wrap px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-2xl rounded-br-md bg-ink text-invert"
                          : "rounded-2xl rounded-bl-md bg-ink/[0.06] text-ink/90"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {/* Pertanyaan cepat */}
                {chatMessages.length === 1 && !isTyping && (
                  <div className="flex flex-col items-start gap-2 pl-9">
                    {quickQuestions.map((q, i) => (
                      <motion.button
                        key={q}
                        type="button"
                        onClick={() => sendMessage(q)}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.06 }}
                        className="rounded-full border border-ink/15 px-3.5 py-1.5 text-left font-mono text-[0.7rem] text-ink/80 transition hover:border-ink hover:bg-ink hover:text-invert"
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-end gap-2">
                    <div className="h-7 w-7 shrink-0">
                      <MascotSVG expression="thinking" animated={false} />
                    </div>
                    <div className="flex gap-1 rounded-2xl rounded-bl-md bg-ink/[0.06] px-4 py-3.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-ink/50"
                          animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-ink/10 p-3">
                <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-page/60 py-1.5 pl-4 pr-1.5 transition focus-within:border-ink/40">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tanya sesuatu tentang Ahmad..."
                    className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                    aria-label="Input pesan chat"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!inputText.trim() || isTyping}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-invert transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Kirim pesan"
                  >
                    <IoSend className="text-sm" />
                  </button>
                </div>
                <p className="mt-2 text-center font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                  Powered by AMAI · Ahmad&apos;s AI Guide
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
