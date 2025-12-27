import Hero from "@/components/sections/Hero";
import Timeline from "@/components/sections/Timeline";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl">
        <Hero />
        <Timeline />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
