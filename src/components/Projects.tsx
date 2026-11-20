'use client';

import React, { useState } from 'react';
import { 
  FolderKanban, 
  Search, 
  ArrowUpRight, 
  ExternalLink, 
  BarChart2, 
  Layers, 
  Sparkles,
  Database,
  FileSpreadsheet,
  Code2,
  Cpu
} from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';
import { PROJECTS, Project } from '@/data/portfolioData';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Power BI', 'SQL', 'Python', 'Excel', 'Machine Learning'];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.toolsUsed.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-semibold text-orange-400 tracking-wider uppercase">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Real-World Analytics Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects &amp; <span className="text-gradient-orange">Analytical Case Studies</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Authentic, repository-backed projects spanning 1M+ transaction rows, star-schema Power BI models, multi-step SQL staging pipelines, and machine learning retention forecasting.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
                    : 'glass-panel text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects by keyword, tool, or metric..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>

        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between border border-white/10 group relative"
            >
              <div className="space-y-4">
                
                {/* Card Top: Category + Verified Metric Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-300 border border-orange-500/20">
                    {project.category}
                  </span>
                  
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-orange-400">
                      {project.highlightMetric}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-1 block">
                      {project.highlightLabel}
                    </span>
                  </div>
                </div>

                {/* Optional Chart Thumbnail Preview */}
                {project.image && (
                  <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-950/80 border border-white/5 relative group-hover:border-orange-500/30 transition-all">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                  {project.title}
                </h3>

                {/* Subtitle / Description */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {project.subtitle}
                </p>

                {/* Business Problem Snippet */}
                <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Problem Addressed:
                  </span>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                    {project.businessProblem}
                  </p>
                </div>

                {/* Tools Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.toolsUsed.slice(0, 4).map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-slate-300 border border-white/5"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.toolsUsed.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-500">
                      +{project.toolsUsed.length - 4} more
                    </span>
                  )}
                </div>

              </div>

              {/* Card Footer: Action Buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
                >
                  <span>Read Full Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View on GitHub"
                    className="p-1.5 rounded-lg glass-panel text-slate-400 hover:text-white hover:border-orange-500/40 transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 glass-panel rounded-2xl">
            <p className="text-slate-400 text-sm">No projects match the selected criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 px-4 py-1.5 rounded-xl text-xs font-semibold text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Modal for Case Studies */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />

      </div>
    </section>
  );
}
