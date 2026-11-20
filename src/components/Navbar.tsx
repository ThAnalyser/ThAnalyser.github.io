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
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'AI Lab', href: '#ai-lab' },
  { name: 'Showcase', href: '#showcase' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenAiCopilot }: { onOpenAiCopilot?: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['about', 'experience', 'skills', 'projects', 'ai-lab', 'showcase', 'certifications', 'contact'];
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
          ? 'glass-panel shadow-md shadow-slate-900/5 dark:shadow-black/40 py-3 bg-white/95 dark:bg-[#08090f]/90 border-b border-slate-200 dark:border-white/10' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Avatar & Monogram */}
          <a 
            href="#" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-orange-500 to-amber-600 p-[1.5px] shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-all">
              <div className="w-full h-full bg-slate-100 dark:bg-[#0a0b12] rounded-[10px] overflow-hidden flex items-center justify-center relative">
                <img
                  src="/assets/hanzala_portrait.jpg"
                  alt="Hanzala Raja"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors flex items-center gap-1.5">
                {PERSONAL_INFO.name}
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium tracking-wide">
                Sales &amp; Data Analyst
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-orange-600 dark:text-orange-400 bg-orange-500/10 border border-orange-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Actions: AI Copilot Trigger + Theme Toggle + Resume Download */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* AI Copilot Button */}
            {onOpenAiCopilot && (
              <button
                onClick={onOpenAiCopilot}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-orange-700 dark:text-orange-300 bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/30 dark:border-orange-500/40 hover:bg-orange-500/20 transition-all shadow-sm shadow-orange-500/10 cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                <span>Ask AI</span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-orange-500/40 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-orange-600" />
              )}
            </button>

            {/* Resume CTA */}
            <a
              href="/Hanzala_Raja_Resume.pdf"
              download="Hanzala_Raja_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 shadow-md shadow-orange-500/25 hover:shadow-orange-500/35 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {onOpenAiCopilot && (
              <button
                onClick={onOpenAiCopilot}
                className="p-2 rounded-xl bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/30 text-orange-600 dark:text-orange-400 transition-all"
                aria-label="Open AI Copilot"
              >
                <Bot className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-orange-600" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open navigation menu"
              className="p-2 rounded-xl glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-slate-200 dark:border-white/10 px-4 pt-3 pb-6 mt-3 space-y-2 bg-white/95 dark:bg-[#090a12]/95 backdrop-blur-xl animate-fadeIn">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            </a>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-2">
            {onOpenAiCopilot && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiCopilot();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-orange-700 dark:text-orange-300 bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/30 dark:border-orange-500/40"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI Copilot ⚡</span>
              </button>
            )}
            <a
              href="/Hanzala_Raja_Resume.pdf"
              download="Hanzala_Raja_Resume.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-600 shadow-md shadow-orange-500/20"
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
