'use client';

import React from 'react';
import { 
  X, 
  Download, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  GraduationCap, 
  Award, 
  Briefcase,
  Star,
  Printer
} from 'lucide-react';
import { LinkedinIcon } from '@/components/SocialIcons';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, CERTIFICATIONS } from '@/data/portfolioData';

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecruiterModal({ isOpen, onClose }: RecruiterModalProps) {
  if (!isOpen) return null;

  const topProjects = PROJECTS.slice(0, 3);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl my-auto glass-panel rounded-2xl border border-slate-300 dark:border-white/20 shadow-2xl overflow-hidden bg-white dark:bg-[#090b14] text-slate-800 dark:text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50/95 dark:bg-[#0c0f1c]/95 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md">
                  Recruiter Executive Briefing
                </span>
                <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Qualifications</span>
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                Executive Dossier — {PERSONAL_INFO.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print Dossier"
              className="p-2 rounded-xl glass-panel text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-orange-500/40 transition-all cursor-pointer hidden sm:flex"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-xl glass-panel text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-orange-500/40 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* 60-Second Elevator Pitch */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-slate-100 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-black/40 border border-orange-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-orange-600 dark:text-orange-400">
                60-Second Candidate Summary
              </span>
              <span className="text-xs text-slate-500 font-medium">Karachi, Pakistan (Onsite &amp; Remote)</span>
            </div>
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              Hanzala Raja is a high-rigor <strong>Sales &amp; Data Analyst</strong> with an accredited BS Computer Science degree from Sindh Madarsatul Islam University (SMIU). He currently manages commercial performance analytics at <strong>Maxitech Pharma</strong>, tracking $1.4M+ in revenue across multi-tier DSM and RSM sales territories. Expert in architecting enterprise Power BI models with complex DAX, writing advanced SQL window functions, automating Excel reporting with Power Query, and training predictive retention ML algorithms.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-semibold">
              <span className="px-2.5 py-1 rounded-lg bg-white/60 dark:bg-black/40 border border-slate-300 dark:border-white/10">1.3M+ Rows Analyzed</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/60 dark:bg-black/40 border border-slate-300 dark:border-white/10">25+ Production Dashboards</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/60 dark:bg-black/40 border border-slate-300 dark:border-white/10">40% Turnaround Reduction</span>
              <span className="px-2.5 py-1 rounded-lg bg-white/60 dark:bg-black/40 border border-slate-300 dark:border-white/10">7 Industry Certifications</span>
            </div>
          </div>

          {/* Top 3 High-Impact Projects */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span>Top 3 High-Impact Production Case Studies:</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topProjects.map((p) => (
                <div key={p.id} className="p-4 rounded-xl glass-panel border border-slate-200 dark:border-white/10 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400">
                      {p.category}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white mt-1 line-clamp-2">
                      {p.title}
                    </h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-3">
                      {p.businessProblem}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-white/5">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Verified Commercial Impact:</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {p.highlightMetric} {p.highlightLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Employment & Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Employment Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-500" />
                <span>Verified Employment History:</span>
              </h4>
              <div className="space-y-2.5">
                {EXPERIENCES.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="p-3 rounded-xl glass-panel text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 dark:text-white">{exp.role}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{exp.period}</span>
                    </div>
                    <div className="text-cyan-600 dark:text-cyan-400 font-medium">{exp.company}</div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">{exp.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-500" />
                <span>Degree &amp; Top Credentials:</span>
              </h4>

              {/* SMIU Degree Card */}
              <div className="p-3.5 rounded-xl glass-panel border border-purple-500/30 text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400">Undergraduate Degree</span>
                <div className="font-bold text-slate-900 dark:text-white">
                  {PERSONAL_INFO.education.degree}
                </div>
                <div className="text-slate-500">{PERSONAL_INFO.education.institution} • {PERSONAL_INFO.education.gradDate}</div>
              </div>

              {/* Certifications List */}
              <div className="space-y-1.5">
                {CERTIFICATIONS.slice(0, 3).map((cert) => (
                  <div key={cert.id} className="p-2.5 rounded-lg glass-panel flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{cert.title}</div>
                      <div className="text-[10px] text-slate-500">{cert.issuer}</div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">Verified</span>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Recruiter Actions Footer */}
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Interested in moving Hanzala to candidate interview?
              </span>
              <p className="text-xs text-slate-500">
                Direct phone and WhatsApp available upon email request. Response time &lt; 2 hours.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/Hanzala_Raja_Resume.pdf"
                download="Hanzala_Raja_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 glass-panel hover:border-orange-500/40 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-orange-500" />
                <span>Download Official PDF Resume</span>
              </a>

              <a
                href="mailto:hanzala.analyst@gmail.com?subject=Interview%20Invitation%20-%20Data%20Analyst%20Role"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 shadow-md shadow-orange-500/25 transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Schedule Interview / Email</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
