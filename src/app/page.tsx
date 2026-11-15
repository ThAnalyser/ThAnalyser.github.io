import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import AnalyticsShowcase from '@/components/AnalyticsShowcase';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Professional Experience Section */}
        <Experience />

        {/* Technical Skills Section */}
        <Skills />

        {/* Featured Projects & Case Studies */}
        <Projects />

        {/* Interactive Live Analytics Showcase */}
        <AnalyticsShowcase />

        {/* Certifications & Education */}
        <Certifications />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer & Back to top */}
      <Footer />
    </div>
  );
}
