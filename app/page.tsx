import About from "@/components/about";
import Contact from "@/components/contact";
import CtaSection from "@/components/cta-section";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import ProjectSection from "@/components/project-section";
import InDevelopmentSection from "@/components/in-development-section";
import Skills from "@/components/skills";
import MaintenanceMode from "../components/MaintenanceMode";

export default function Home() {
  const isMaintenanceMode = false;

  if (isMaintenanceMode) {
    return <MaintenanceMode />;
  }

  return (
    <main>
      <Intro />
      <ProjectSection />
      <InDevelopmentSection />
      <Skills />
      <About />
      <Experience />
      <CtaSection />
      <Contact />
    </main>
  );
}
