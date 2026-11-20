'use client';

import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  ChevronRight,
  Building2,
  Layers,
  Sparkles
} from 'lucide-react';
import { EXPERIENCES } from '@/data/portfolioData';

export default function Experience() {
  const [selectedExpId, setSelectedExpId] = useState<string>(EXPERIENCES[0].id);

  const activeExp = EXPERIENCES.find((e) => e.id === selectedExpId) || EXPERIENCES[0];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-semibold text-orange-400 tracking-wider uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Demonstrated Impact in <span className="text-gradient-orange">Production Analytics</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Consolidating multi-source enterprise sales data, designing KPI frameworks, and empowering commercial sales teams with automated reporting systems.
          </p>
        </div>

        {/* Desktop & Mobile Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Timeline Navigation Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {EXPERIENCES.map((exp) => {
              const isSelected = exp.id === selectedExpId;
              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedExpId(exp.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'glass-panel border-orange-500/50 shadow-lg shadow-orange-500/10 translate-x-1'
                      : 'bg-slate-900/40 border-white/5 hover:border-white/10 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm sm:text-base font-bold ${
                          isSelected ? 'text-orange-400' : 'text-white'
                        }`}>
                          {exp.role}
                        </span>
                        {exp.current && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-orange-400 rotate-90 lg:rotate-0' : 'text-slate-600'
                    }`} />
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2.5 pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Experience Showcase Card */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-white/10 shadow-2xl relative">
              
              {/* Header */}
              <div className="space-y-2 pb-5 border-b border-white/10">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {activeExp.type}
                  </span>
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {activeExp.period}
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-white">
                  {activeExp.role}
                </h3>

                <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <span className="text-orange-400">{activeExp.company}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 font-normal">{activeExp.location}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 pt-1 leading-relaxed italic">
                  &ldquo;{activeExp.summary}&rdquo;
                </p>
              </div>

              {/* Key Quantitative Metrics / KPIs */}
              {activeExp.kpis && activeExp.kpis.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeExp.kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
                      <div className="text-xs text-slate-400">{kpi.label}</div>
                      <div className="text-sm font-bold text-orange-400 mt-1">{kpi.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Responsibilities & Achievements Bullet Points */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Core Responsibilities &amp; Business Achievements:
                </h4>
                <div className="space-y-2.5">
                  {activeExp.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & Analytical Tools Used */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Technologies, Methods &amp; Frameworks Applied:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeExp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-orange-300"
                    >
                      {tech}
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
