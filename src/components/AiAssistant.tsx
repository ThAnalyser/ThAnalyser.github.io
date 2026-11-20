'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  User, 
  ChevronRight, 
  Database, 
  BarChart3, 
  Award, 
  Briefcase,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  links?: { label: string; href: string }[];
}

const PRESET_QUESTIONS = [
  "Summarize Hanzala's profile in 3 bullets",
  "How did he track targets vs actuals at Maxitech Pharma?",
  "Explain his E-Commerce Churn Prediction model",
  "What certifications and degree does he have?",
  "What tools and tech stack does he specialize in?"
];

export default function AiAssistant({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello! I am Hanzala's AI Portfolio Copilot. Ask me anything about his sales analytics experience at Maxitech Pharma, his 1.3M+ transaction projects, ML churn models, or verified certifications.`,
      links: [
        { label: 'View Featured Projects', href: '#projects' },
        { label: 'Explore Live Dashboard', href: '#showcase' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const q = query.toLowerCase();
      let reply = "";
      let links: { label: string; href: string }[] | undefined = undefined;

      if (q.includes('summarize') || q.includes('who is') || q.includes('about')) {
        reply = `Here is Hanzala Raja in 3 core points:\n\n1. **Sales & Data Analyst** currently at Maxitech Pharma (Pvt.) Ltd., consolidating daily sales across regions, districts, and cities with DSM/RSM quota tracking.\n2. **Large-Scale Data Engineering**: Handled 1.3M+ real transactions (774K+ UK restaurant records, 541K+ retail orders) using SQL, Power BI (PL-300 certified), and Python.\n3. **Business & Predictive Impact**: Built machine learning churn prediction models (ROC-AUC 0.732) and automated Power Query ETL pipelines that cut routine reporting turnaround by 40%.`;
        links = [{ label: 'Read About Section', href: '#about' }, { label: 'Download Resume', href: '/Hanzala_Raja_Resume.pdf' }];
      } else if (q.includes('maxitech') || q.includes('sales') || q.includes('target') || q.includes('dsm')) {
        reply = `At **Maxitech Pharma (Pvt.) Ltd.**, Hanzala serves as Sales Analyst & Marketing Support Officer:\n\n• Consolidates daily multi-source pharmaceutical sales data to prepare daily, monthly, and quarterly executive reports.\n• Calculates target achievement % and evaluates DSM (District Sales Manager) and RSM (Regional Sales Manager) field force productivity.\n• Tracks sales performance across regional, district, city, and product hierarchies to detect revenue gaps.\n• Automated Excel and Power Query reconciliation workflows, ensuring 100% data consistency.`;
        links = [{ label: 'View Experience Timeline', href: '#experience' }];
      } else if (q.includes('churn') || q.includes('ecommerce') || q.includes('yahlum') || q.includes('retention') || q.includes('ml')) {
        reply = `In his **E-Commerce Customer Retention & LTV Optimization** project for Yahlum Solutions:\n\n• Analyzed **541,909 transactions** from the UCI Online Retail II dataset.\n• Engineered RFM customer segmentation and a 12-month cohort retention decay matrix.\n• Trained Logistic Regression and XGBoost classifiers; selected Logistic Regression with **0.732 ROC-AUC** for explainable churn risk scoring.\n• Deployed an interactive Streamlit application with live customer risk scoring.`;
        links = [{ label: 'View Retention Case Study', href: '#projects' }, { label: 'GitHub Repository', href: 'https://github.com/ThAnalyser/ECommerce_Retention_LTV_Project' }];
      } else if (q.includes('restaurant') || q.includes('774k') || q.includes('dax')) {
        reply = `In the **UK Restaurant Sales Intelligence** project:\n\n• Consolidated **774,000+ granular order transactions** across 4 UK restaurant locations.\n• Authored 30+ custom DAX measures for YoY Sales %, Same-Store Growth, and Running Total comparisons.\n• Uncovered that weekend voucher discounts accounted for 18.4% of volume but only produced a 3.2% net margin expansion, guiding leadership to restructure promotional timing.`;
        links = [{ label: 'View Restaurant Project', href: '#projects' }];
      } else if (q.includes('certif') || q.includes('degree') || q.includes('education') || q.includes('smiu')) {
        reply = `Hanzala holds a **BS in Computer Science (Data Science & Analytics Specialization)** from Sindh Madarsatul Islam University (SMIU), Karachi.\n\nHis verified certifications include:\n• **Google Data Analytics Professional Certificate** (Coursera ID: 500VZ4S86G2M)\n• **Microsoft PL-300: Power BI Data Analyst Associate**\n• **Microsoft Office Specialist: Excel Associate**\n• **SQL for Data Science – UC Davis** (Coursera ID: NSXTHUJU8DEB)\n• **Data Analysis with Python – IBM** (Coursera ID: 8TP4P1WV6KX4)\n• **Deloitte Job Simulation** (Forage: 69e60521451622bc36b1d300)`;
        links = [{ label: 'Verify Certifications', href: '#certifications' }];
      } else if (q.includes('contact') || q.includes('hire') || q.includes('email')) {
        reply = `You can reach Hanzala directly at:\n\n• **Email:** hanzala.analyst@gmail.com\n• **LinkedIn:** linkedin.com/in/hanzalaraja\n• **GitHub:** github.com/ThAnalyser\n• **Location:** Karachi, Pakistan (open to local on-site/hybrid and global remote roles).`;
        links = [{ label: 'Open Contact Form', href: '#contact' }];
      } else {
        reply = `Hanzala is a **Sales & Data Analyst** skilled in Power BI, SQL, Advanced Excel, and Python. He specializes in sales target vs actual tracking, dimensional star-schema modeling, and predictive customer retention.\n\nWould you like me to explain his Maxitech Pharma role, his machine learning projects, or his verified certifications?`;
        links = [
          { label: 'Featured Projects', href: '#projects' },
          { label: 'Interactive Dashboard', href: '#showcase' },
          { label: 'Contact Hanzala', href: '#contact' }
        ];
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: reply,
          links
        }
      ]);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full sm:max-w-lg h-[85vh] sm:h-[680px] bg-[#0c0d14] border border-orange-500/30 sm:rounded-3xl flex flex-col shadow-2xl shadow-orange-500/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#12131d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Hanzala AI Copilot</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-400">Trained on Hanzala&apos;s real career &amp; project telemetry</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close AI Copilot"
            className="p-2 rounded-xl glass-panel text-slate-400 hover:text-white hover:border-orange-500/40 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preset Prompt Chips */}
        <div className="p-3 bg-black/40 border-b border-white/5 overflow-x-auto flex items-center gap-2 scrollbar-none">
          <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">Prompts:</span>
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/5 hover:bg-orange-500/15 hover:border-orange-500/40 border border-white/5 text-slate-300 hover:text-orange-300 transition-all shrink-0 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 mt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white font-medium rounded-tr-none'
                    : 'bg-[#151622] border border-white/10 text-slate-200 rounded-tl-none space-y-2'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.links && msg.links.length > 0 && (
                  <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2">
                    {msg.links.map((lnk, lIdx) => (
                      <a
                        key={lIdx}
                        href={lnk.href}
                        onClick={onClose}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-orange-500/15 border border-orange-500/30 text-orange-300 hover:bg-orange-500/25 transition-all"
                      >
                        <span>{lnk.label}</span>
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-orange-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
              <span>Analyzing portfolio telemetry...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-white/10 bg-[#12131d]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about Hanzala's projects, experience, or tools..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl text-xs bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white transition-all disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
