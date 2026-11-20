'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import AiQueryCopilot from '@/components/AiQueryCopilot';
import AnalyticsShowcase from '@/components/AnalyticsShowcase';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AiAssistant from '@/components/AiAssistant';
import { Bot, Sparkles } from 'lucide-react';

export default function Home() {
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Sticky Navigation */}
      <Navbar onOpenAiCopilot={() => setIsAiOpen(true)} />

      {/* Main Page Flow */}
      <main className="flex-1 w-full">
        {/* Hero Section with Bento Grid and Portrait Photo */}
        <Hero onOpenAiCopilot={() => setIsAiOpen(true)} />

        {/* About Section */}
        <About />

        {/* Professional Experience Section */}
        <Experience />

        {/* Technical Skills Section */}
        <Skills />

        {/* Featured Projects & Case Studies */}
        <Projects />

        {/* Modern AI Features: NL to SQL/DAX & Live ML Churn Simulator */}
        <AiQueryCopilot />

        {/* Interactive Live Analytics Showcase */}
        <AnalyticsShowcase />

        {/* Certifications & Education */}
        <Certifications />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer & Back to top */}
      <Footer />

      {/* AI Assistant Drawer */}
      <AiAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

      {/* Floating AI Copilot Trigger Button (Bottom-Right) */}
      <button
        onClick={() => setIsAiOpen(true)}
        aria-label="Open AI Copilot"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-bold text-xs shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <Bot className="w-4 h-4 text-white animate-pulse" />
        <span className="hidden sm:inline">Ask AI Copilot</span>
        <span className="w-2 h-2 rounded-full bg-emerald-300" />
      </button>
    </div>
  );
}
