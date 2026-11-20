'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  Database, 
  FileSpreadsheet, 
  Code2, 
  Layers, 
  Search, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { SKILL_CATEGORIES } from '@/data/portfolioData';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const iconsMap: Record<string, any> = {
    BarChart3,
    PieChart,
    Database,
    FileSpreadsheet,
    Code2,
    Layers,
  };

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    const matchesSearch = cat.skills.filter((s) => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      skills: matchesSearch
    };
  }).filter((cat) => {
    if (activeCategory === 'all') {
      return cat.skills.length > 0;
    }
    return cat.category.toLowerCase().includes(activeCategory.toLowerCase()) && cat.skills.length > 0;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-semibold text-orange-400 tracking-wider uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Specialized Toolkit for <span className="text-gradient-orange">Data Intelligence</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Transparent, production-tested competencies categorized by functional domain. Explicitly separated by production proficiency without arbitrary percentage ratings.
          </p>
        </div>

        {/* Filter Controls: Category Tabs + Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
                  : 'glass-panel text-slate-400 hover:text-white'
              }`}
            >
              All Capabilities
            </button>
            <button
              onClick={() => setActiveCategory('Analysis')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === 'Analysis'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                  : 'glass-panel text-slate-400 hover:text-white'
              }`}
            >
              Data Analysis
            </button>
            <button
              onClick={() => setActiveCategory('Visualization')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === 'Visualization'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                  : 'glass-panel text-slate-400 hover:text-white'
              }`}
            >
              Power BI &amp; Viz
            </button>
            <button
              onClick={() => setActiveCategory('Databases')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === 'Databases'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                  : 'glass-panel text-slate-400 hover:text-white'
              }`}
            >
              SQL &amp; Databases
            </button>
            <button
              onClick={() => setActiveCategory('Excel')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === 'Excel'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                  : 'glass-panel text-slate-400 hover:text-white'
              }`}
            >
              Advanced Excel
            </button>
            <button
              onClick={() => setActiveCategory('Python')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === 'Python'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                  : 'glass-panel text-slate-400 hover:text-white'
              }`}
            >
              Python &amp; ML
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills (e.g. DAX, CTE, Power Query)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>

        </div>

        {/* Skills Categories Display */}
        <div className="space-y-10">
          {filteredCategories.map((category, catIdx) => {
            const Icon = iconsMap[category.icon] || BarChart3;

            return (
              <div 
                key={catIdx}
                className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-white/10"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{category.category}</h3>
                      <p className="text-xs text-slate-400">{category.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                    {category.skills.length} Competencies
                  </span>
                </div>

                {/* Individual Skill Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.skills.map((skill, sIdx) => {
                    const levelColors: Record<string, string> = {
                      Advanced: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
                      Proficient: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
                      Developing: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
                    };

                    return (
                      <div
                        key={sIdx}
                        className="bg-slate-900/50 p-4 rounded-xl border border-white/5 hover:border-orange-500/30 hover:bg-slate-900/80 transition-all space-y-2 group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                            {skill.name}
                          </h4>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${
                            levelColors[skill.level] || 'text-slate-400'
                          }`}>
                            {skill.level}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {skill.description}
                        </p>

                        {skill.badge && (
                          <div className="pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-purple-300">
                            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                            <span>{skill.badge}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-10 p-4 rounded-xl glass-panel flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Proficiency Standards:</span>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <strong>Advanced:</strong> Daily enterprise production delivery & architectural ownership
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <strong>Proficient:</strong> Certified & executed in real-world client engagements
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <strong>Developing:</strong> Applied in research capstones (e.g. Deep Learning Computer Vision)
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
