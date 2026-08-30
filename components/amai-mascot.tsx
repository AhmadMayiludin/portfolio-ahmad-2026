"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoSend } from "react-icons/io5";
import { BsRobot } from "react-icons/bs";

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

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

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
   SVG MASCOT ROBOT
   ============================================================ */
function MascotSVG({ expression = "happy" }: { expression?: "happy" | "thinking" | "wave" }) {
  return (
    <svg
      viewBox="0 0 120 160"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="60%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </radialGradient>
        <radialGradient id="headGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="60%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#6366f1" />
        </radialGradient>
        <radialGradient id="eyeGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="#38bdf8" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="antennaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>

      {/* Glow aura */}
      <ellipse cx="60" cy="130" rx="28" ry="8" fill="rgba(99,102,241,0.25)" />

      {/* Antenna left */}
      <line x1="45" y1="22" x2="38" y2="8" stroke="url(#antennaGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="38" cy="7" r="4" fill="#c084fc" filter="url(#glow)">
        <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="r" values="3.5;5;3.5" dur="1.6s" repeatCount="indefinite" />
      </circle>

      {/* Antenna right */}
      <line x1="75" y1="22" x2="82" y2="8" stroke="url(#antennaGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="82" cy="7" r="4" fill="#38bdf8" filter="url(#glow)">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="r" values="5;3.5;5" dur="1.6s" repeatCount="indefinite" />
      </circle>

      {/* Head */}
      <ellipse cx="60" cy="38" rx="30" ry="28" fill="url(#headGrad)" filter="url(#glow)" />

      {/* Head highlight */}
      <ellipse cx="50" cy="27" rx="10" ry="7" fill="rgba(255,255,255,0.25)" transform="rotate(-15 50 27)" />

      {/* Eyes */}
      {expression === "thinking" ? (
        <>
          <ellipse cx="48" cy="36" rx="8" ry="6" fill="url(#eyeGrad)" />
          <ellipse cx="72" cy="38" rx="6" ry="5" fill="url(#eyeGrad)" />
          <circle cx="50" cy="35" r="3" fill="#1e3a5f" />
          <circle cx="73" cy="37" r="2.5" fill="#1e3a5f" />
          {/* Thinking dots */}
          <circle cx="88" cy="20" r="2" fill="#c084fc"><animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0s" repeatCount="indefinite" /></circle>
          <circle cx="94" cy="14" r="3" fill="#8b5cf6"><animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0.3s" repeatCount="indefinite" /></circle>
          <circle cx="101" cy="9" r="4" fill="#6366f1"><animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0.6s" repeatCount="indefinite" /></circle>
        </>
      ) : (
        <>
          <ellipse cx="48" cy="36" rx="9" ry="8" fill="url(#eyeGrad)" />
          <ellipse cx="72" cy="36" rx="9" ry="8" fill="url(#eyeGrad)" />
          <circle cx="50" cy="35" r="4" fill="#0c4a6e" />
          <circle cx="74" cy="35" r="4" fill="#0c4a6e" />
          <circle cx="52" cy="33" r="1.5" fill="white" />
          <circle cx="76" cy="33" r="1.5" fill="white" />
          {/* Eye blink */}
          <rect x="39" y="30" width="18" height="12" rx="6" fill="url(#headGrad)">
            <animate attributeName="height" values="12;1;12" dur="4s" begin="2s" repeatCount="indefinite" />
            <animate attributeName="y" values="30;35.5;30" dur="4s" begin="2s" repeatCount="indefinite" />
          </rect>
          <rect x="63" y="30" width="18" height="12" rx="6" fill="url(#headGrad)">
            <animate attributeName="height" values="12;1;12" dur="4s" begin="2s" repeatCount="indefinite" />
            <animate attributeName="y" values="30;35.5;30" dur="4s" begin="2s" repeatCount="indefinite" />
          </rect>
        </>
      )}

      {/* Mouth */}
      {expression === "thinking" ? (
        <path d="M 50 52 Q 60 50 70 52" stroke="#c084fc" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M 48 52 Q 60 62 72 52" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}

      {/* Body */}
      <rect x="35" y="66" width="50" height="42" rx="14" fill="url(#bodyGrad)" filter="url(#glow)" />

      {/* Body highlight */}
      <rect x="40" y="71" width="25" height="10" rx="5" fill="rgba(255,255,255,0.15)" />

      {/* Neck */}
      <rect x="51" y="63" width="18" height="7" rx="4" fill="#818cf8" />

      {/* Chest circle */}
      <circle cx="60" cy="87" r="9" fill="rgba(255,255,255,0.15)" />
      <circle cx="60" cy="87" r="6" fill="rgba(6,182,212,0.5)" filter="url(#glow)">
        <animate attributeName="r" values="6;7;6" dur="1.8s" repeatCount="indefinite" />
      </circle>

      {/* Arms */}
      {expression === "wave" ? (
        <>
          {/* Waving arm */}
          <rect x="14" y="66" width="22" height="12" rx="6" fill="#818cf8">
            <animateTransform attributeName="transform" type="rotate" values="0 25 66; -30 25 66; 0 25 66" dur="0.8s" repeatCount="indefinite" />
          </rect>
          <circle cx="15" cy="72" r="7" fill="#6366f1">
            <animateTransform attributeName="transform" type="rotate" values="0 25 66; -30 25 66; 0 25 66" dur="0.8s" repeatCount="indefinite" />
          </circle>
          <rect x="84" y="66" width="22" height="12" rx="6" fill="#818cf8" />
          <circle cx="105" cy="72" r="7" fill="#6366f1" />
        </>
      ) : (
        <>
          <rect x="14" y="66" width="22" height="12" rx="6" fill="#818cf8" />
          <circle cx="15" cy="72" r="7" fill="#6366f1" />
          <rect x="84" y="66" width="22" height="12" rx="6" fill="#818cf8" />
          <circle cx="105" cy="72" r="7" fill="#6366f1" />
        </>
      )}

      {/* Legs */}
      <rect x="44" y="106" width="14" height="28" rx="7" fill="#6366f1" />
      <rect x="62" y="106" width="14" height="28" rx="7" fill="#6366f1" />

      {/* Feet */}
      <ellipse cx="51" cy="133" rx="10" ry="6" fill="#4f46e5" />
      <ellipse cx="69" cy="133" rx="10" ry="6" fill="#4f46e5" />
    </svg>
  );
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
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Halo! 👋 Saya AMAI, AI guide portfolio Ahmad. Ada yang ingin kamu tanyakan tentang Ahmad atau project-nya? 😊",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [expression, setExpression] = useState<"happy" | "thinking" | "wave">("wave");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgRotateRef = useRef<NodeJS.Timeout | null>(null);

  /* ---- Scroll detection ---- */
  useEffect(() => {
    const sections = ["home", "about", "projects", "skills", "experience", "contact"];

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
    setExpression(activeSection === "contact" ? "wave" : activeSection === "skills" ? "thinking" : "happy");

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
    };
  }, [activeSection]);

  /* ---- Auto-scroll chat ---- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  /* ---- Send chat message ---- */
  const sendMessage = useCallback(async () => {
    if (!inputText.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: "user", content: inputText.trim() };
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

  return (
    <>
      {/* ============================================================
          MASCOT FLOATING WIDGET
         ============================================================ */}
      <AnimatePresence>
        {isMascotVisible && !isChatOpen && (
          <motion.div
            className="fixed bottom-20 right-5 z-[900] flex flex-col items-end gap-2"
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* Speech Bubble */}
            <AnimatePresence mode="wait">
              <motion.div
                key={speechText}
                className="relative mr-2 max-w-[200px] rounded-2xl rounded-br-sm bg-white px-4 py-3 shadow-xl dark:bg-[#1e1b4b]"
                style={{ border: "1.5px solid rgba(99,102,241,0.25)" }}
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-xs leading-relaxed text-gray-700 dark:text-white/85">
                  {speechText}
                </p>
                {/* Tail */}
                <span className="absolute -bottom-2.5 right-4 h-3 w-3 rotate-45 bg-white dark:bg-[#1e1b4b]"
                  style={{ border: "1.5px solid rgba(99,102,241,0.25)", borderLeft: "none", borderTop: "none" }} />
              </motion.div>
            </AnimatePresence>

            {/* Mascot body */}
            <div className="flex items-end gap-1">
              {/* Hide button */}
              <button
                onClick={() => setIsMascotVisible(false)}
                className="mb-6 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-gray-500 opacity-60 transition hover:opacity-100 dark:bg-white/10 dark:text-white/50"
                aria-label="Sembunyikan maskot"
              >
                <span className="text-xs leading-none">&times;</span>
              </button>

              <motion.button
                className="mascot-float relative h-24 w-20 cursor-pointer"
                onClick={() => setIsChatOpen(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Buka chat AMAI"
              >
                <div className="mascot-glow h-full w-full">
                  <MascotSVG expression={expression} />
                </div>
                {/* Chat indicator */}
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-bold text-white shadow">
                  💬
                </span>
              </motion.button>
            </div>

            {/* Name tag */}
            <motion.span
              className="gradient-text mr-1 text-center text-[10px] font-bold tracking-widest"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              AMAI
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show button when hidden */}
      <AnimatePresence>
        {!isMascotVisible && !isChatOpen && (
          <motion.button
            className="fixed bottom-20 right-5 z-[900] flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 transition hover:scale-110 active:scale-95"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setIsMascotVisible(true)}
            aria-label="Tampilkan AMAI"
          >
            <BsRobot className="text-xl text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ============================================================
          CHAT MODAL
         ============================================================ */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed inset-0 z-[950] flex items-end justify-end p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsChatOpen(false)}
            />

            {/* Chat Window */}
            <motion.div
              className="relative z-10 flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-[#12122a] sm:max-w-md"
              style={{
                border: "1.5px solid rgba(99,102,241,0.2)",
                maxHeight: "560px",
              }}
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              {/* Chat Header */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 px-5 py-4">
                <div className="h-10 w-10 shrink-0">
                  <MascotSVG expression={isTyping ? "thinking" : "happy"} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white">AMAI</p>
                  <p className="text-xs text-indigo-200">Ahmad's AI Guide • {isTyping ? "Mengetik..." : "Online"}</p>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
                  aria-label="Tutup chat"
                >
                  <IoClose className="text-lg" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "360px" }}>
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="h-7 w-7 shrink-0">
                        <MascotSVG expression="happy" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-br-sm bg-indigo-600 text-white"
                          : "rounded-bl-sm bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white/90"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-end gap-2">
                    <div className="h-7 w-7 shrink-0">
                      <MascotSVG expression="thinking" />
                    </div>
                    <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 dark:bg-white/10">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-2 w-2 rounded-full bg-indigo-400"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-100 p-3 dark:border-white/10">
                <div className="flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-2 dark:bg-white/10">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tanya sesuatu tentang Ahmad..."
                    className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-white/90 dark:placeholder:text-white/30"
                    aria-label="Input pesan chat"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Kirim pesan"
                  >
                    <IoSend className="text-sm" />
                  </button>
                </div>
                <p className="mt-1.5 text-center text-[10px] text-gray-400 dark:text-white/25">
                  Powered by AMAI · Ahmad's AI Guide
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
