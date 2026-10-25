"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/";

// Teks yang "teracak" lalu tersusun saat masuk layar
export function ScrambleText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!inView || reduce) return;
    let frame = 0;
    const total = 18;
    const id = setInterval(() => {
      frame++;
      const settled = Math.floor((frame / total) * text.length);
      setOutput(
        text
          .split("")
          .map((ch, i) =>
            ch === " " || i < settled
              ? ch
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("")
      );
      if (frame >= total) {
        clearInterval(id);
        setOutput(text);
      }
    }, 40);
    return () => clearInterval(id);
  }, [inView, reduce, text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}

// Judul yang diketik huruf demi huruf dengan kursor berkedip
export function TypewriterText({
  text,
  className = "",
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(text.length);
      setDone(true);
      return;
    }
    let i = 0;
    let doneTimer: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      i++;
      setCount(i);
      if (i >= text.length) {
        clearInterval(id);
        doneTimer = setTimeout(() => setDone(true), 900);
      }
    }, 70);
    return () => {
      clearInterval(id);
      clearTimeout(doneTimer);
    };
  }, [inView, reduce, text]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {!done && (
        <span
          aria-hidden="true"
          className="ml-[0.04em] inline-block h-[0.9em] w-[0.06em] translate-y-[0.1em] animate-caret-blink bg-current"
        />
      )}
      <span aria-hidden="true" className="invisible">
        {text.slice(count)}
      </span>
    </Tag>
  );
}
