'use client';

import React from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Target, 
  Cpu, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  FileText, 
  Layers, 
  ShieldCheck, 
  LineChart,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function About() {
  const pillars = [
    {
      title: "Target vs Actual Governance",
      desc: "Architecting rigorous variance tracking models that identify territory deviations, calculate exact achievement %, and evaluate DSM and RSM field force productivity.",
      icon: Target,
      color: "text-orange-400",
      border: "border-orange-500/20"
    },
    {
      title: "Automated ETL & Cleansing",
      desc: "Replacing fragile manual spreadsheets with automated Power Query and Python pipelines, enforcing multi-source validation checkpoints that eliminate reporting discrepancies.",
      icon: Layers,
      color: "text-amber-400",
      border: "border-amber-500/20"
    },
    {
      title: "Executive BI Storytelling",
      desc: "Developing dimensional star-schema data models in Power BI and authoring complex DAX measures that allow C-suite leaders to drill from national KPIs down to SKU-level trends.",
      icon: LineChart,
      color: "text-emerald-400",
      border: "border-emerald-500/20"
    },
    {
      title: "Predictive & Retention Modeling",
      desc: "Applying statistical inference, RFM customer segmentation, cohort decay matrices, and machine learning (scikit-learn, XGBoost) to forecast churn and maximize Customer Lifetime Value.",
      icon: Cpu,
      color: "text-orange-300",
      border: "border-orange-500/20"
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-100/60 dark:bg-[#0a0b12]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-semibold text-orange-600 dark:text-orange-400 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Professional Profile &amp; Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Bridging Operational Realities with <span className="text-gradient-orange">Analytical Precision</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
            From granular pharmacy transaction rows to high-level executive boardrooms, I transform complex, multi-source data into reliable levers for business growth.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Narrative & Educational Background */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* The Story & Analytical Philosophy */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4 border border-slate-200 dark:border-white/10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <Briefcase className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <span>My Journey in Data Analytics</span>
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                As a Sales &amp; Data Analyst currently at <strong className="text-slate-900 dark:text-white">Maxitech Pharma (Pvt.) Ltd.</strong>, I consolidate daily sales datasets spanning diverse distribution channels, cities, and product categories. My work focuses on giving leadership immediate visibility into <strong className="text-orange-600 dark:text-orange-300">sales targets vs actual achievements</strong>, tracking DSM (District Sales Manager) and RSM (Regional Sales Manager) performance, and spotting territorial revenue gaps before they impact quarterly targets.
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                My approach to business intelligence is grounded in empirical validation: I do not believe in superficial dashboards built on fragile foundations. Whether authoring optimized <strong className="text-amber-600 dark:text-amber-300">DAX measures</strong> in Power BI, writing multi-step <strong className="text-orange-600 dark:text-orange-300">SQL CTEs</strong>, or building automated <strong className="text-orange-600 dark:text-orange-300">Power Query ETL workflows</strong>, I ensure that every number reported to management is clean, reproducible, and tied directly to commercial strategy.
              </p>
            </div>

            {/* Academic Foundation Card */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border-l-4 border-l-orange-500 border border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {PERSONAL_INFO.education.degree}
                    </h4>
                    <p className="text-xs text-orange-600 dark:text-orange-300 font-medium">
                      {PERSONAL_INFO.education.institution}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-200/70 dark:bg-white/5 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-white/10">
                  Graduated {PERSONAL_INFO.education.gradDate}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed pt-2">
                {PERSONAL_INFO.education.details} Built end-to-end analytical solutions, completed hands-on capstone research, and conducted computer vision deep learning projects on the HAM10000 dataset.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((p, i) => {
                const IconComponent = p.icon;
                return (
                  <div 
                    key={i} 
                    className={`glass-panel p-5 rounded-xl border border-slate-200 dark:${p.border} space-y-2`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className={`w-5 h-5 ${p.color}`} />
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{p.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Professional Dossier Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-7 space-y-6 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Photo & Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-[2px] shadow-lg shadow-orange-500/30">
                  <div className="w-full h-full bg-slate-100 dark:bg-[#0a0f1d] rounded-[14px] overflow-hidden flex items-center justify-center">
                    <img
                      src="/assets/hanzala_portrait.jpg"
                      alt={PERSONAL_INFO.fullName}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{PERSONAL_INFO.fullName}</h3>
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold">{PERSONAL_INFO.title}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{PERSONAL_INFO.location}</span>
                  </p>
                </div>
              </div>

              {/* Dossier Details List */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200/80 dark:border-white/5">
                  <span className="text-slate-600 dark:text-slate-400">Current Role</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right">Sales Analyst @ Maxitech Pharma</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200/80 dark:border-white/5">
                  <span className="text-slate-600 dark:text-slate-400">Academic Credential</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right">BS Computer Science (SMIU)</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200/80 dark:border-white/5">
                  <span className="text-slate-600 dark:text-slate-400">Primary Core BI Stack</span>
                  <span className="font-semibold text-orange-600 dark:text-orange-300 text-right">Power BI, Advanced Excel, SQL, DAX</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200/80 dark:border-white/5">
                  <span className="text-slate-600 dark:text-slate-400">Programming &amp; ML</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-300 text-right">Python, Pandas, scikit-learn, Streamlit</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200/80 dark:border-white/5">
                  <span className="text-slate-600 dark:text-slate-400">Key Certifications</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-300 text-right">Google DA, Microsoft PL-300, Excel Associate</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200/80 dark:border-white/5">
                  <span className="text-slate-600 dark:text-slate-400">Work Authorization</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right">Karachi &amp; Remote Worldwide</span>
                </div>
              </div>

              {/* Verified Competency Checkmarks */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider block">
                  Core Competencies:
                </span>
                {[
                  'Consolidating multi-source enterprise sales data',
                  'Tracking DSM & RSM performance vs quotas',
                  'Advanced Excel (Power Query, XLOOKUP, Pivot Tables)',
                  'Star-Schema Power BI modeling & DAX time intelligence',
                  'SQL data cleaning, CTEs, and window functions',
                  'Machine learning churn prediction & RFM segmentation'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Download Resume Button in Card */}
              <div className="pt-2">
                <a
                  href="/Hanzala_Raja_Resume.pdf"
                  download="Hanzala_Raja_Resume.pdf"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Verified Resume (PDF)</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
