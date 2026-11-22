'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import AiAnalyticsLab from '@/components/AiAnalyticsLab';
import DataPlayground from '@/components/DataPlayground';
import EtlPipelineSimulator from '@/components/EtlPipelineSimulator';
import AnalyticsShowcase from '@/components/AnalyticsShowcase';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import GithubActivity from '@/components/GithubActivity';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AiAssistant from '@/components/AiAssistant';
import RecruiterModal from '@/components/RecruiterModal';
import { Bot, Briefcase } from 'lucide-react';

export default function Home() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Sticky Navigation */}
      <Navbar 
        onOpenAiCopilot={() => setIsAiOpen(true)}
        onOpenRecruiterModal={() => setIsRecruiterOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1 w-full">
        {/* Hero Section with Interactive Network Canvas, Bento Grid and Portrait */}
        <Hero 
          onOpenAiCopilot={() => setIsAiOpen(true)} 
          onOpenRecruiterModal={() => setIsRecruiterOpen(true)}
        />

        {/* About Section */}
        <About />

        {/* Professional Experience Section */}
        <Experience />

        {/* Technical Skills Section */}
        <Skills />

        {/* Featured Projects & Case Studies */}
        <Projects />

        {/* AI Analytics Laboratory (Ask Your Data, Insights, CSV Cleaning, Storyteller, JD Matcher, ML Simulator) */}
        <AiAnalyticsLab />

        {/* Interactive Data Playground (Dynamic Slicers, Bar/Line/Area/Donut Charts & Record Explorer) */}
        <DataPlayground />

        {/* Interactive ETL Pipeline Architecture Simulator (6 Stages with Live Telemetry) */}
        <EtlPipelineSimulator />

        {/* Multi-Dimensional Analytics Showcase (Quarter, Category & Territory Slicers) */}
        <AnalyticsShowcase />

        {/* Developer CLI Terminal (Interactive Shell for Recruiters & Engineers) */}
        <InteractiveTerminal />

        {/* Live GitHub REST API Integration (@ThAnalyser) */}
        <GithubActivity />

        {/* Certifications & Education */}
        <Certifications />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer & Back to top */}
      <Footer />

      {/* Floating Chatbot Assistant Drawer */}
      <AiAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

      {/* Recruiter Executive Briefing Modal */}
      <RecruiterModal isOpen={isRecruiterOpen} onClose={() => setIsRecruiterOpen(false)} />

      {/* Floating Action Buttons (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-2.5">
        {/* Recruiter View Quick Trigger */}
        <button
          onClick={() => setIsRecruiterOpen(true)}
          aria-label="Open Recruiter Dossier"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-900/90 dark:bg-slate-800/90 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-lg border border-white/10 hover:border-orange-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
        >
          <Briefcase className="w-3.5 h-3.5 text-orange-400" />
          <span className="hidden sm:inline">Recruiter View</span>
        </button>

        {/* Ask AI Copilot Button */}
        <button
          onClick={() => setIsAiOpen(true)}
          aria-label="Open AI Copilot"
          className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Bot className="w-4 h-4 text-white animate-pulse" />
          <span className="hidden sm:inline">Ask AI Copilot</span>
          <span className="w-2 h-2 rounded-full bg-emerald-300" />
        </button>
      </div>
    </div>
  );
}
