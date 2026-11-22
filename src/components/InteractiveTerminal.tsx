'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  Maximize2, 
  Minimize2, 
  Trash2, 
  CornerDownLeft,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, SKILL_CATEGORIES, CERTIFICATIONS } from '@/data/portfolioData';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error';
  content: string | React.ReactNode;
}

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      content: 'Hanzala Raja Data Analytics Shell v2.4.0 (x86_64-pc-analyst-core)'
    },
    {
      id: 'init-2',
      type: 'system',
      content: 'Connected to verified production database. Type "help" to list commands.'
    }
  ]);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Add input line
    const inputLine: TerminalLine = {
      id: `in-${Date.now()}`,
      type: 'input',
      content: `hanzala@analytics-core:~$ ${cmd}`
    };

    setHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let outputNode: React.ReactNode = null;
    let lineType: 'output' | 'error' | 'system' = 'output';

    switch (mainCmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <div className="text-cyan-400 font-bold mb-1">Available Analytics Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 font-mono">
              <div><strong className="text-orange-400">about</strong> - Professional bio, education &amp; focus</div>
              <div><strong className="text-orange-400">skills</strong> - Technical proficiency matrix</div>
              <div><strong className="text-orange-400">projects</strong> - List verified case studies</div>
              <div><strong className="text-orange-400">experience</strong> - Verified employment timeline</div>
              <div><strong className="text-orange-400">certifications</strong> - Google &amp; Microsoft credentials</div>
              <div><strong className="text-orange-400">stats</strong> - Verified portfolio metrics</div>
              <div><strong className="text-orange-400">recruiter</strong> - 60-second executive summary</div>
              <div><strong className="text-orange-400">sql &lt;query&gt;</strong> - Run query against portfolio</div>
              <div><strong className="text-orange-400">github</strong> - Open ThAnalyser GitHub profile</div>
              <div><strong className="text-orange-400">resume</strong> - Download official PDF resume</div>
              <div><strong className="text-orange-400">contact</strong> - Direct channels &amp; email</div>
              <div><strong className="text-orange-400">clear</strong> - Reset terminal console</div>
            </div>
          </div>
        );
        break;

      case 'about':
        outputNode = (
          <div className="space-y-1 text-xs">
            <div className="text-cyan-400 font-bold">{PERSONAL_INFO.fullName} ({PERSONAL_INFO.name})</div>
            <div className="text-slate-300">{PERSONAL_INFO.title} • {PERSONAL_INFO.location}</div>
            <div className="text-slate-400 mt-1 leading-relaxed">{PERSONAL_INFO.fullBio}</div>
            <div className="text-emerald-400 mt-1">Education: {PERSONAL_INFO.education.degree} ({PERSONAL_INFO.education.institution})</div>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-cyan-400 font-bold">Verified Technical Stack:</div>
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="text-orange-400 font-bold">{cat.category}:</span>
                <div className="text-slate-300">
                  {cat.skills.map(s => `${s.name} (${s.level})`).join(', ')}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-cyan-400 font-bold">Featured Production Case Studies:</div>
            {PROJECTS.map((p, idx) => (
              <div key={idx} className="p-1.5 rounded bg-white/5 border border-white/5">
                <div className="text-emerald-400 font-bold">[{p.category}] {p.title}</div>
                <div className="text-slate-400 text-[11px]">{p.subtitle}</div>
                <div className="text-orange-300 text-[10px]">Verified Metric: {p.highlightMetric} {p.highlightLabel}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-cyan-400 font-bold">Employment History:</div>
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-orange-400 font-bold">
                  {exp.role} @ {exp.company} ({exp.period})
                </div>
                <div className="text-slate-400 text-[11px]">{exp.summary}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'certifications':
        outputNode = (
          <div className="space-y-1 text-xs font-mono">
            <div className="text-cyan-400 font-bold">Verified Professional Certifications:</div>
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="text-slate-300">
                • <strong className="text-emerald-400">{cert.title}</strong> — {cert.issuer} ({cert.date})
              </div>
            ))}
          </div>
        );
        break;

      case 'stats':
        outputNode = (
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded bg-white/5">Records Analyzed: <strong className="text-cyan-400">1.3M+</strong></div>
            <div className="p-2 rounded bg-white/5">Dashboards Built: <strong className="text-cyan-400">25+</strong></div>
            <div className="p-2 rounded bg-white/5">Turnaround Speedup: <strong className="text-cyan-400">40%</strong></div>
            <div className="p-2 rounded bg-white/5">Certifications: <strong className="text-cyan-400">7 Active</strong></div>
          </div>
        );
        break;

      case 'recruiter':
        outputNode = (
          <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-xs space-y-1.5">
            <div className="text-orange-400 font-bold uppercase tracking-wider">60-Second Recruiter Briefing:</div>
            <p className="text-slate-200 leading-relaxed">
              Hanzala Raja is a Sales &amp; Data Analyst with BS Computer Science from SMIU. Hands-on enterprise experience at Maxitech Pharma and Yahlum Solutions architecting Power BI star schemas, writing advanced SQL window functions, and training customer churn ML pipelines.
            </p>
            <div className="text-emerald-400 font-mono text-[11px]">
              Ready for immediate hiring in Data Analyst / BI Specialist roles. Type "resume" or "contact".
            </div>
          </div>
        );
        break;

      case 'sql':
        if (!args.trim()) {
          lineType = 'error';
          outputNode = 'SQL syntax error: Missing query string. Try: sql SELECT * FROM skills;';
        } else {
          outputNode = (
            <div className="space-y-1 text-xs font-mono">
              <div className="text-emerald-400">Query executed successfully in 8ms (Status 200 OK)</div>
              <div className="p-2 rounded bg-white/5 text-slate-300 text-[11px]">
                Showing mock result for: <span className="text-cyan-300">{args}</span>
                <br />
                Columns: [id, entity_name, verified_status, metric_value]
                <br />
                Rows: [1, 'Power BI Enterprise Model', 'VERIFIED', '774K Orders'], [2, 'SQL Data Warehouse', 'VERIFIED', '100% Validated']
              </div>
            </div>
          );
        }
        break;

      case 'github':
        window.open('https://github.com/ThAnalyser', '_blank');
        outputNode = 'Opening https://github.com/ThAnalyser in new window...';
        break;

      case 'resume':
        const link = document.createElement('a');
        link.href = '/Hanzala_Raja_Resume.pdf';
        link.download = 'Hanzala_Raja_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        outputNode = 'Triggered download for Hanzala_Raja_Resume.pdf.';
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs">
            <div className="text-cyan-400 font-bold">Direct Communication Channels:</div>
            <div>Email: <a href="mailto:hanzala.analyst@gmail.com" className="text-orange-400 underline">hanzala.analyst@gmail.com</a></div>
            <div>LinkedIn: <a href="https://www.linkedin.com/in/hanzalaraja/" target="_blank" rel="noopener noreferrer" className="text-orange-400 underline">linkedin.com/in/hanzalaraja/</a></div>
            <div>GitHub: <a href="https://github.com/ThAnalyser" target="_blank" rel="noopener noreferrer" className="text-orange-400 underline">github.com/ThAnalyser</a></div>
            <div>Location: Karachi, Pakistan (Available for onsite &amp; remote)</div>
          </div>
        );
        break;

      case 'clear':
        setLines([]);
        setInputVal('');
        return;

      default:
        lineType = 'error';
        outputNode = `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`;
        break;
    }

    const outputLine: TerminalLine = {
      id: `out-${Date.now()}`,
      type: lineType,
      content: outputNode
    };

    setLines((prev) => [...prev, inputLine, outputLine]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < history.length) {
          setHistoryIdx(nextIdx);
          setInputVal(history[history.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  return (
    <section id="terminal" className="relative py-24 bg-[var(--bg-primary)] overflow-hidden tech-grid-pattern">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-semibold text-orange-600 dark:text-orange-400 shadow-sm shadow-orange-500/10">
            <TerminalIcon className="w-3.5 h-3.5 text-orange-500" />
            <span>Developer Shell Access</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Interactive SQL &amp; <span className="text-gradient-orange">Analytics CLI</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            Query Hanzala&apos;s background, verified skills, and project metrics using terminal commands or quick-click buttons.
          </p>
        </div>

        {/* Quick Click Shortcut Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-bold text-slate-500">Quick Commands:</span>
          {['help', 'about', 'skills', 'projects', 'stats', 'recruiter', 'resume', 'contact'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold glass-panel hover:border-orange-500/40 text-slate-700 dark:text-slate-300 hover:text-orange-500 transition-all cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window */}
        <div className={`glass-panel rounded-2xl overflow-hidden border border-slate-700 dark:border-white/15 shadow-2xl transition-all duration-300 ${
          isExpanded ? 'min-h-[550px]' : 'min-h-[380px]'
        }`}>
          
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10 text-xs font-mono text-slate-300 select-none">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="ml-2 font-bold text-slate-200">hanzala@analytics-core: ~ (zsh)</span>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <button
                onClick={() => setLines([])}
                className="p-1 rounded hover:text-white transition-colors"
                title="Clear screen"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded hover:text-white transition-colors"
                title={isExpanded ? 'Restore size' : 'Expand size'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Terminal Screen Body */}
          <div className="p-4 sm:p-6 bg-[#070913] text-slate-200 font-mono text-xs sm:text-[13px] leading-relaxed space-y-3 overflow-y-auto max-h-[460px]">
            {lines.map((l) => (
              <div key={l.id} className="space-y-0.5">
                {l.type === 'input' && (
                  <div className="text-cyan-400 font-bold">{l.content}</div>
                )}
                {l.type === 'system' && (
                  <div className="text-slate-500 text-[11px]">{l.content}</div>
                )}
                {l.type === 'error' && (
                  <div className="text-rose-400 font-medium">{l.content}</div>
                )}
                {l.type === 'output' && (
                  <div className="text-slate-200 pl-2 border-l border-white/10">{l.content}</div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0d1c] border-t border-white/10 font-mono text-xs sm:text-[13px]">
            <span className="text-cyan-400 font-bold shrink-0">hanzala@analytics-core:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command here (e.g. help, skills, recruiter)..."
              className="flex-1 bg-transparent text-white placeholder:text-slate-600 focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-all cursor-pointer"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
