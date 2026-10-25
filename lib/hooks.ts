// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionName } from "./types";

export function useSectionInView(sectionName: SectionName) {
  // Aktif saat section melewati garis tengah layar — tetap jalan untuk section yang lebih tinggi dari layar
  const { ref, inView } = useInView({
    rootMargin: "-45% 0px -50% 0px",
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return {
    ref,
  };
}
