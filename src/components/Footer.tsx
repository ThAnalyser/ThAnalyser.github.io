'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  Mail, 
  Download, 
  Heart,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/SocialIcons';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-slate-950/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-orange-500 to-amber-600 p-[1px]">
                <img
                  src="/assets/hanzala_portrait.jpg"
                  alt="Hanzala Raja"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="font-bold text-white text-base">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Sales &amp; Data Analyst specializing in Power BI, Advanced Excel, SQL, and Python. Turning complex multi-source sales telemetry into clear, executive-grade decision intelligence.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg glass-panel text-slate-400 hover:text-orange-400 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg glass-panel text-slate-400 hover:text-orange-400 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Email"
                className="p-2 rounded-lg glass-panel text-slate-400 hover:text-emerald-400 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-orange-400 transition-colors">About Me</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-orange-400 transition-colors">Professional Experience</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-orange-400 transition-colors">Technical Skills</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-orange-400 transition-colors">Featured Projects</a>
              </li>
              <li>
                <a href="#ai-lab" className="hover:text-orange-400 transition-colors">AI &amp; ML Lab ⚡</a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-orange-400 transition-colors">Interactive Dashboard</a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-orange-400 transition-colors">Certifications &amp; Degree</a>
              </li>
            </ul>
          </div>

          {/* Quick Actions & Resume */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Verified Documents
            </h4>
            <div className="space-y-2">
              <a
                href="/Hanzala_Raja_Resume.pdf"
                download="Hanzala_Raja_Resume.pdf"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 border border-white/10 hover:border-orange-500/40 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-orange-400" />
                <span>Download Resume (PDF)</span>
              </a>
              <p className="text-[11px] text-slate-500">
                Current Role: Sales Analyst @ Maxitech Pharma (Pvt.) Ltd.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 {PERSONAL_INFO.name}. All verified rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Built with Next.js & Tailwind CSS</span>
            <span>•</span>
            <span>Karachi, Pakistan</span>
          </div>
        </div>

      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl glass-panel text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 shadow-xl shadow-cyan-500/10 transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </footer>
  );
}
