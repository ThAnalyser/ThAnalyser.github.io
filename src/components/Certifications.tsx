'use client';

import React from 'react';
import { 
  Award, 
  GraduationCap, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar,
  Sparkles,
  Building2,
  FileCheck
} from 'lucide-react';
import { CERTIFICATIONS, PERSONAL_INFO } from '@/data/portfolioData';

export default function Certifications() {
  const badgeColors: Record<string, string> = {
    Google: 'from-blue-500/20 to-emerald-500/20 text-cyan-300 border-cyan-500/30',
    Microsoft: 'from-blue-600/20 to-cyan-500/20 text-blue-300 border-blue-500/30',
    Coursera: 'from-blue-500/20 to-purple-500/20 text-purple-300 border-purple-500/30',
    Deloitte: 'from-emerald-600/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
    IBM: 'from-indigo-600/20 to-blue-500/20 text-indigo-300 border-indigo-500/30',
    Other: 'from-slate-700/20 to-slate-600/20 text-slate-300 border-slate-600/30',
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-semibold text-purple-400 tracking-wider uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Academic & Professional Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified Certifications & <span className="text-gradient-cyan-purple">Academic Degree</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            All credentials are fully backed by official issuing authorities, including Google, Microsoft, UC Davis, IBM, Deloitte, and Sindh Madarsatul Islam University.
          </p>
        </div>

        {/* Education Hero Card */}
        <div className="mb-12 glass-panel rounded-2xl p-6 sm:p-8 border-l-4 border-l-cyan-500 space-y-4">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  University Degree
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {PERSONAL_INFO.education.degree}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  {PERSONAL_INFO.education.institution} • {PERSONAL_INFO.education.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Conferred: {PERSONAL_INFO.education.gradDate}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
            {PERSONAL_INFO.education.details} Conducted extensive research in business intelligence, computational analytics, and predictive machine learning architectures.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between border border-white/10 relative group"
            >
              <div className="space-y-4">
                
                {/* Issuer Badge & Date */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border bg-gradient-to-r ${
                    badgeColors[cert.badgeType] || badgeColors.Other
                  }`}>
                    {cert.issuer.split('(')[0].trim()}
                  </span>

                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{cert.date}</span>
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {cert.title}
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {cert.description}
                </p>

                {/* Skills Gained */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Validated Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cert.skillsGained.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/5 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Card Footer: Credential ID & Verification Link */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="text-[10px] text-slate-400 truncate">
                  {cert.credentialId ? (
                    <span className="font-mono text-slate-300">
                      ID: {cert.credentialId}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Associate</span>
                    </span>
                  )}
                </div>

                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[10px] text-slate-500 italic">
                    Authorized Credential
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
