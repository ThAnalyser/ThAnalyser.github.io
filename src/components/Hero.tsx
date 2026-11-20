'use client';

import React from 'react';
import Image from 'next/image';
import { 
  ArrowRight, 
  Download, 
  Sparkles, 
  Bot, 
  TrendingUp, 
  Database, 
  ShieldCheck, 
  Layers, 
  CheckCircle2,
  Terminal,
  Activity,
  Star
} from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { LinkedinIcon, GithubIcon } from '@/components/SocialIcons';

interface HeroProps {
  onOpenAiCopilot?: () => void;
}

export default function Hero({ onOpenAiCopilot }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 flex flex-col justify-center overflow-hidden tech-grid-pattern">
      {/* Background Ambient Radial Glows (Electric Orange / Amber) */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] radial-glow-orange pointer-events-none opacity-40 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] radial-glow-amber pointer-events-none opacity-25 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Vision & Brand Narrative */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Tech Terminal Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-semibold text-orange-400 shadow-sm shadow-orange-500/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <Terminal className="w-3.5 h-3.5 text-orange-400" />
              <span>Data Analyst • Power BI • SQL • Python</span>
            </div>

            {/* Giant Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Turning Complex Data Into{' '}
              <span className="text-gradient-orange block mt-1">
                Commercial Impact
              </span>
              <span className="block mt-1 text-slate-100">
                With Vision &amp; Precision
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              I architect enterprise Power BI models, automated SQL staging pipelines, and machine learning customer retention systems that transform fragmented datasets into measurable profit and executive clarity.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-400 hover:to-amber-500 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {onOpenAiCopilot && (
                <button
                  onClick={onOpenAiCopilot}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-orange-300 bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 hover:border-orange-500/60 shadow-md shadow-orange-500/10 transition-all cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-orange-400" />
                  <span>Ask AI Copilot ⚡</span>
                </button>
              )}

              <a
                href="/Hanzala_Raja_Resume.pdf"
                download="Hanzala_Raja_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white glass-panel hover:border-orange-500/40 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-orange-400" />
                <span>Resume (PDF)</span>
              </a>
            </div>

            {/* Social Proof & Networks */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-slate-300 font-medium">
                Verified Production Analytics @ Maxitech Pharma &amp; Yahlum
              </span>
              <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-1.5 rounded-lg glass-panel hover:text-orange-400 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-1.5 rounded-lg glass-panel hover:text-orange-400 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: 4-Card Bento Grid (Matching User Reference Image!) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1 (Top Left): $1.4M+ Metric Card */}
              <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-orange-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    +4.2% Attainment
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-black text-white">$1.4M+</div>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    Revenue Tracked &amp; Modeled
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Multi-tier DSM &amp; RSM target variance governance
                  </p>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-400 h-full w-[104%]" />
                </div>
              </div>

              {/* Card 2 (Top Right): User Photo Card (Matching Reference Screenshot!) */}
              <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-white/10 relative group h-64 sm:h-auto min-h-[260px] flex flex-col justify-end">
                {/* Real Photo of Hanzala */}
                <img
                  src="/assets/hanzala_portrait.jpg"
                  alt="Hanzala Raja - Sales & Data Analyst"
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/40 to-transparent" />

                {/* Overlaid Badge */}
                <div className="relative p-4 z-10 space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active Analyst</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {PERSONAL_INFO.name}
                  </h3>
                  <p className="text-[11px] text-orange-300 font-medium">
                    Sales Analyst @ Maxitech Pharma
                  </p>
                </div>
              </div>

              {/* Card 3 (Bottom Left): 3D Abstract Wireframe Graphic */}
              <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-orange-400" />
                    <span>Data Staging Core</span>
                  </span>
                  <span className="text-[10px] font-mono text-orange-400 font-semibold">
                    100% Validated
                  </span>
                </div>

                {/* 3D Geometric Isometric Wireframe Graphic (SVG) */}
                <div className="w-full h-24 flex items-center justify-center relative">
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-20 h-20 text-orange-400 animate-pulse drop-shadow-[0_0_12px_rgba(255,107,0,0.4)]"
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.8"
                  >
                    {/* Isometric Cube / Diamond Wireframe */}
                    <polygon points="50,15 85,35 50,55 15,35" stroke="#ff6b00" fill="rgba(255, 107, 0, 0.08)" />
                    <polygon points="15,35 50,55 50,90 15,70" stroke="#f59e0b" fill="rgba(245, 158, 11, 0.05)" />
                    <polygon points="85,35 50,55 50,90 85,70" stroke="#ff8a34" fill="rgba(255, 138, 52, 0.05)" />
                    {/* Internal node connections */}
                    <line x1="50" y1="15" x2="50" y2="55" stroke="#ffffff" strokeDasharray="2,2" opacity="0.6" />
                    <circle cx="50" cy="55" r="3" fill="#ff6b00" />
                    <circle cx="50" cy="15" r="2.5" fill="#ffffff" />
                    <circle cx="85" cy="35" r="2.5" fill="#f59e0b" />
                    <circle cx="15" cy="35" r="2.5" fill="#ff8a34" />
                  </svg>
                </div>

                <div className="text-[11px] text-slate-400 text-center z-10">
                  Star Schema &amp; Power Query ETL Pipelines
                </div>
              </div>

              {/* Card 4 (Bottom Right): 1.3M+ Rows Experience Card */}
              <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-orange-400" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Big Data Scale
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-black text-white">1.3M+</div>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    Transaction Rows Cleaned
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    774K+ UK restaurants &amp; 541K+ retail orders
                  </p>
                </div>
                <div className="text-[11px] text-orange-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                  <span>Zero-Discrepancy Audit Standard</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Impact Bar (Matching user's reference image middle row!) */}
        <div className="border-t border-b border-white/10 py-8 bg-[#090a0f]/60 rounded-3xl px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
            
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Consolidated Data
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white">
                1.3M+
              </div>
              <p className="text-xs text-slate-400">
                UK &amp; Global retail transactions
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Reporting Speedup
              </span>
              <div className="text-3xl sm:text-4xl font-black text-orange-400">
                40%
              </div>
              <p className="text-xs text-slate-400">
                Turnaround reduction via Power Query
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Target Attainment
              </span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                104.2%
              </div>
              <p className="text-xs text-slate-400">
                Tracked across DSM &amp; RSM territories
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                ML Churn Prediction
              </span>
              <div className="text-3xl sm:text-4xl font-black text-amber-400">
                0.732
              </div>
              <p className="text-xs text-slate-400">
                ROC-AUC on 541K+ retail customer retention
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
