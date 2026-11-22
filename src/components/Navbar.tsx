'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { 
  BarChart2, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Download, 
  ExternalLink, 
  ChevronRight, 
  Bot, 
  Sparkles,
  Briefcase
} from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'AI Lab', href: '#ai-lab' },
  { name: 'Playground', href: '#playground' },
  { name: 'ETL Pipeline', href: '#etl-pipeline' },
  { name: 'Terminal', href: '#terminal' },
  { name: 'GitHub', href: '#github' },
  { name: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onOpenAiCopilot?: () => void;
  onOpenRecruiterModal?: () => void;
}

export default function Navbar({ onOpenAiCopilot, onOpenRecruiterModal }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['about', 'experience', 'skills', 'projects', 'ai-lab', 'playground', 'etl-pipeline', 'terminal', 'github', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-panel shadow-md shadow-slate-900/5 dark:shadow-black/40 py-2.5 bg-white/95 dark:bg-[#070914]/90 border-b border-slate-200 dark:border-white/10' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Avatar & Monogram */}
          <a 
            href="#" 
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-slate-100 dark:bg-[#0a0b12] rounded-[10px] overflow-hidden flex items-center justify-center relative">
                <img
                  src="/assets/hanzala_portrait.jpg"
                  alt="Hanzala Raja"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                {PERSONAL_INFO.name}
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium tracking-wide">
                Sales &amp; Data Analyst
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Actions: Recruiter Mode + AI Copilot + Theme Toggle + Resume */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Recruiter Mode Button */}
            {onOpenRecruiterModal && (
              <button
                onClick={onOpenRecruiterModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 glass-panel hover:border-orange-500/50 hover:text-orange-500 transition-all cursor-pointer shadow-sm"
              >
                <Briefcase className="w-3.5 h-3.5 text-orange-500" />
                <span>Recruiter View</span>
              </button>
            )}

            {/* AI Copilot Button */}
            {onOpenAiCopilot && (
              <button
                onClick={onOpenAiCopilot}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 dark:border-cyan-500/40 hover:bg-cyan-500/20 transition-all shadow-sm shadow-cyan-500/10 cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Ask AI</span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500/40 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-cyan-600" />
              )}
            </button>

            {/* Resume CTA */}
            <a
              href="/Hanzala_Raja_Resume.pdf"
              download="Hanzala_Raja_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/35 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            {onOpenRecruiterModal && (
              <button
                onClick={onOpenRecruiterModal}
                className="p-2 rounded-xl glass-panel text-orange-500"
                title="Recruiter Mode"
              >
                <Briefcase className="w-4 h-4" />
              </button>
            )}
            {onOpenAiCopilot && (
              <button
                onClick={onOpenAiCopilot}
                className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400"
                aria-label="Open AI Copilot"
              >
                <Bot className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl glass-panel text-slate-700 dark:text-slate-300"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-600" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open navigation menu"
              className="p-2 rounded-xl glass-panel text-slate-700 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden glass-panel border-b border-slate-200 dark:border-white/10 px-4 pt-3 pb-6 mt-3 space-y-2 bg-white/95 dark:bg-[#070914]/95 backdrop-blur-xl animate-fadeIn">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            </a>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-2">
            {onOpenRecruiterModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRecruiterModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 glass-panel border-orange-500/40"
              >
                <Briefcase className="w-4 h-4 text-orange-500" />
                <span>Recruiter View (Dossier)</span>
              </button>
            )}
            {onOpenAiCopilot && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiCopilot();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-500/30"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI Copilot ⚡</span>
              </button>
            )}
            <a
              href="/Hanzala_Raja_Resume.pdf"
              download="Hanzala_Raja_Resume.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 shadow-md shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
