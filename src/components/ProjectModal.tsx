'use client';

import React from 'react';
import { 
  X, 
  ExternalLink, 
  BarChart3, 
  CheckCircle2, 
  Lightbulb, 
  Database, 
  FileCode, 
  TrendingUp, 
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';
import { Project } from '@/data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl my-auto glass-panel rounded-2xl border border-white/20 shadow-2xl overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-slate-900/80 sticky top-0 z-20 backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {project.category}
              </span>
              <span className="text-xs text-slate-400">Detailed Case Study</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl glass-panel text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          
          {/* Subtitle / Executive Summary */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            {project.subtitle}
          </p>

          {/* Key Metric Highlight Card */}
          <div className="bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-purple-950/40 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-cyan-300 font-bold block">
                Headline Verified Metric:
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                {project.highlightMetric}
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                {project.highlightLabel}
              </div>
            </div>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-white/10 hover:border-cyan-500/40 transition-all shadow-md"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            )}
          </div>

          {/* Real Project Visual Preview (if available) */}
          {project.image && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Verified Output Artifact / Visual Preview:
              </h4>
              <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-950 p-2">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full max-h-96 object-contain rounded-lg"
                />
              </div>
            </div>
          )}

          {/* 1 & 2: Business Problem & Project Objective */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 p-5 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>1. Business Problem</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.businessProblem}
              </p>
            </div>

            <div className="bg-slate-900/50 p-5 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <BarChart3 className="w-4 h-4" />
                <span>2. Project Objective</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.objective}
              </p>
            </div>
          </div>

          {/* 3: Dataset Overview */}
          <div className="bg-slate-900/50 p-5 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>3. Dataset Overview</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.datasetOverview}
            </p>
          </div>

          {/* 4 & 5: Data Cleaning & Analysis Methodology */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                4. Data Cleaning & Preparation:
              </h4>
              <div className="space-y-2">
                {project.dataCleaning.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                5. Analysis Methodology:
              </h4>
              <div className="space-y-2">
                {project.methodology.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6: Tools & Technologies Used */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              6. Tools & Technologies Applied:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.toolsUsed.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-cyan-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* 7 & 8: Key Insights & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 p-5 rounded-xl border border-cyan-500/20 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>7. Key Quantitative Insights</span>
              </div>
              <div className="space-y-2">
                {project.keyInsights.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/60 p-5 rounded-xl border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>8. Strategic Business Recommendations</span>
              </div>
              <div className="space-y-2">
                {project.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 9: Final Outcome & Impact */}
          <div className="bg-slate-900/60 p-5 rounded-xl border border-white/10 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              9. Final Commercial Outcome & Impact:
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              {project.finalOutcome}
            </p>
          </div>

          {/* Optional Code Snippet (DAX / SQL / Python) */}
          {(project.daxSnippet || project.sqlSnippet || project.pythonSnippet) && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span>Production Code Sample:</span>
                </h4>
                <span className="text-[10px] text-slate-500 font-mono">
                  {project.daxSnippet ? 'DAX Expression' : project.sqlSnippet ? 'SQL Query' : 'Python Script'}
                </span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-white/10 text-cyan-300 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>
                  {project.daxSnippet || project.sqlSnippet || project.pythonSnippet}
                </code>
              </pre>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:p-6 border-t border-white/10 bg-slate-900/80 flex items-center justify-between flex-wrap gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-slate-400">
                #{t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 transition-all shadow-md shadow-cyan-500/20"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Visit Repository</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold glass-panel text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              Close Case Study
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
