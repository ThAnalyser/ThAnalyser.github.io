'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Database, 
  FileSpreadsheet, 
  Code, 
  Download, 
  ArrowRight, 
  Mail, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Activity,
  Target
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/SocialIcons';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function Hero() {
  const [activeMetricTab, setActiveMetricTab] = useState<'sales' | 'retention' | 'pipeline'>('sales');

  const chartData = {
    sales: [
      { label: 'Jan', actual: 105, target: 100 },
      { label: 'Feb', actual: 112, target: 110 },
      { label: 'Mar', actual: 128, target: 120 },
      { label: 'Apr', actual: 118, target: 115 },
      { label: 'May', actual: 134, target: 125 },
      { label: 'Jun', actual: 142, target: 135 },
      { label: 'Jul', actual: 148, target: 140 },
    ],
    retention: [
      { label: 'M1', actual: 100, target: 100 },
      { label: 'M2', actual: 48, target: 45 },
      { label: 'M3', actual: 36, target: 32 },
      { label: 'M4', actual: 32, target: 28 },
      { label: 'M5', actual: 29, target: 25 },
      { label: 'M6', actual: 27, target: 23 },
      { label: 'M12', actual: 24, target: 20 },
    ],
    pipeline: [
      { label: 'Raw', actual: 100, target: 100 },
      { label: 'Filter', actual: 86, target: 85 },
      { label: 'Dedupe', actual: 82, target: 80 },
      { label: 'Join', actual: 78, target: 75 },
      { label: 'Model', actual: 75, target: 70 },
      { label: 'Report', actual: 100, target: 100 },
      { label: 'Alert', actual: 100, target: 100 },
    ]
  };

  const currentPoints = chartData[activeMetricTab];

  return (
    <section className="relative min-h-[92vh] pt-28 pb-20 flex items-center justify-center overflow-hidden data-grid-pattern">
      {/* Background Radial Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] radial-glow-cyan pointer-events-none opacity-40 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] radial-glow-purple pointer-events-none opacity-30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Personal Brand & Strategic Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel border-cyan-500/30 text-xs font-medium text-cyan-300 shadow-sm shadow-cyan-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{PERSONAL_INFO.availability}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{PERSONAL_INFO.location}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
              Turning <span className="text-cyan-400">Data</span> Into Insights.{' '}
              <span className="block mt-1 text-gradient-cyan-purple">
                Insights Into Impact.
              </span>
            </h1>

            {/* Professional Subheading & Title */}
            <div className="space-y-3">
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm sm:text-base font-semibold text-slate-200">
                <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-cyan-300">
                  Data Analyst
                </span>
                <span className="text-slate-500">|</span>
                <span>SQL</span>
                <span className="text-slate-500">•</span>
                <span>Power BI</span>
                <span className="text-slate-500">•</span>
                <span>Excel</span>
                <span className="text-slate-500">•</span>
                <span>Python</span>
              </div>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {PERSONAL_INFO.bio}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/35 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>View Featured Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#showcase"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-200 glass-panel hover:text-white hover:border-cyan-500/40 transition-all hover:bg-white/5 cursor-pointer"
              >
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Interactive Dashboard</span>
              </a>

              <a
                href="/Hanzala_Raja_Resume.pdf"
                download="Hanzala_Raja_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white glass-panel hover:border-purple-500/40 transition-all cursor-pointer"
                title="Download verified resume PDF"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social & Contact Bar */}
            <div className="flex items-center justify-center lg:justify-start gap-5 pt-4">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Connect:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-purple-400 hover:border-purple-500/40 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  aria-label="Email directly"
                  className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-all"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Stat Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              {PERSONAL_INFO.stats.map((stat, i) => (
                <div key={i} className="glass-panel p-3 rounded-xl text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-white">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-medium text-slate-400 mt-0.5 line-clamp-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Live Interactive Analytical Telemetry Cockpit */}
          <div className="lg:col-span-5">
            <div className="relative glass-panel rounded-2xl p-5 sm:p-6 shadow-2xl border border-white/10 overflow-hidden">
              {/* Header of Cockpit */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      Live Telemetry Cockpit
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </h3>
                    <p className="text-[11px] text-slate-400">Target vs Actual Performance</p>
                  </div>
                </div>

                {/* Metric Tab Selector */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
                  {(['sales', 'retention', 'pipeline'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveMetricTab(tab)}
                      className={`px-2 py-1 rounded text-[11px] font-semibold capitalize transition-all ${
                        activeMetricTab === tab
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* KPI Mini-Tiles */}
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="bg-slate-900/60 rounded-xl p-3 border border-white/5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Target Attainment</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> +4.2%
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">104.2%</div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full w-[104%]" />
                  </div>
                </div>

                <div className="bg-slate-900/60 rounded-xl p-3 border border-white/5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>DSM / RSM Gap</span>
                    <span className="text-cyan-400 font-semibold">Positive</span>
                  </div>
                  <div className="text-2xl font-bold text-cyan-400">+$58.5K</div>
                  <div className="text-[10px] text-slate-400 mt-2">Across 5 territories</div>
                </div>
              </div>

              {/* Interactive SVG Chart Graphic */}
              <div className="bg-slate-950/70 rounded-xl p-4 border border-white/5 relative">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-semibold text-slate-300">
                    {activeMetricTab === 'sales' && 'Monthly Sales Trajectory vs Target ($K)'}
                    {activeMetricTab === 'retention' && '12-Month Cohort Retention Decay (%)'}
                    {activeMetricTab === 'pipeline' && 'ETL Data Pipeline Conversion Efficiency (%)'}
                  </span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" /> Actual
                    </span>
                    <span className="flex items-center gap-1 text-purple-400">
                      <span className="w-2 h-0.5 bg-purple-400" /> Target
                    </span>
                  </div>
                </div>

                {/* SVG Chart */}
                <div className="h-36 w-full flex items-end justify-between gap-2 pt-4 px-1">
                  {currentPoints.map((pt, i) => {
                    const maxHeight = 160;
                    const actualHeight = Math.min((pt.actual / maxHeight) * 100, 100);
                    const targetHeight = Math.min((pt.target / maxHeight) * 100, 100);
                    const isAbove = pt.actual >= pt.target;

                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                        {/* Hover Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-20 pointer-events-none bg-slate-900 border border-cyan-500/40 text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap">
                          <p className="font-bold text-white">{pt.label}</p>
                          <p className="text-cyan-400">Actual: {pt.actual}</p>
                          <p className="text-purple-400">Target: {pt.target}</p>
                        </div>

                        {/* Bar Container */}
                        <div className="w-full h-24 flex items-end justify-center relative">
                          {/* Target line indicator */}
                          <div 
                            className="absolute w-full border-t border-dashed border-purple-400/80 z-10"
                            style={{ bottom: `${targetHeight}%` }}
                          />
                          {/* Actual Bar */}
                          <div
                            className={`w-full rounded-t-md transition-all duration-500 ${
                              isAbove 
                                ? 'bg-gradient-to-t from-cyan-600/40 to-cyan-400' 
                                : 'bg-gradient-to-t from-amber-600/40 to-amber-400'
                            }`}
                            style={{ height: `${actualHeight}%` }}
                          />
                        </div>

                        {/* X-axis label */}
                        <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors">
                          {pt.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Verified Analytical Core Stack Badges */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">Verified Stack:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Power BI (PL-300)', 'DAX', 'SQL Server', 'Excel (MOS)', 'Python', 'Streamlit'].map((tool) => (
                    <span 
                      key={tool}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 border border-white/10 text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
