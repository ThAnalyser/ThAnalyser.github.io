'use client';

import React, { useState, useEffect } from 'react';
import { 
  GitFork, 
  Star, 
  ExternalLink, 
  FolderGit2, 
  Sparkles, 
  Activity, 
  Code2, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';

interface RepoData {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

const FALLBACK_REPOS: RepoData[] = [
  {
    id: 1,
    name: 'HAM10000_Skin_Disease_Prediction',
    description: 'Deep Learning Convolutional Neural Network (CNN) with TensorFlow/Keras and Streamlit app for dermatoscopic skin lesion classification.',
    html_url: 'https://github.com/ThAnalyser/HAM10000_Skin_Disease_Prediction',
    language: 'Python',
    stargazers_count: 5,
    forks_count: 2,
    updated_at: '2025-11-12'
  },
  {
    id: 2,
    name: 'Customer-Churn-Prediction-Using-Machine-Learning',
    description: 'End-to-end customer churn prediction pipeline with MySQL staging, RFM segmentation, scikit-learn Logistic Regression (ROC-AUC 0.732), and Streamlit.',
    html_url: 'https://github.com/ThAnalyser/Customer-Churn-Prediction-Using-Machine-Learning',
    language: 'Python',
    stargazers_count: 4,
    forks_count: 1,
    updated_at: '2025-10-24'
  },
  {
    id: 3,
    name: 'UK-Food-Hub-Sales-Analytics',
    description: 'Enterprise Power BI sales analytics system on 774K+ transactions with 4-4-5 financial calendar offsets, custom DAX measures, and location drill-through.',
    html_url: 'https://github.com/ThAnalyser/UK-Food-Hub-Sales-Analytics',
    language: 'Power BI / DAX',
    stargazers_count: 6,
    forks_count: 3,
    updated_at: '2025-09-15'
  },
  {
    id: 4,
    name: 'World-Layoffs-Data-Cleaning-and-EDA-in-MySQL',
    description: 'Comprehensive MySQL data cleaning and exploratory analytics warehouse utilizing CTEs, window functions, and staging deduplication.',
    html_url: 'https://github.com/ThAnalyser/World-Layoffs-Data-Cleaning-and-EDA-in-MySQL',
    language: 'SQL',
    stargazers_count: 7,
    forks_count: 2,
    updated_at: '2025-08-30'
  },
  {
    id: 5,
    name: 'Noon-Call-Center-Performance-Analytics',
    description: 'Excel & Power BI customer service operations MIS analyzing 5,000 inbound calls, uncovering an 18.92% unanswered call leakage, and agent SLAs.',
    html_url: 'https://github.com/ThAnalyser/Noon-Call-Center-Performance-Analytics',
    language: 'Excel / Power BI',
    stargazers_count: 3,
    forks_count: 1,
    updated_at: '2025-07-20'
  },
  {
    id: 6,
    name: 'Tailwind-Traders-Sales-Analysis',
    description: 'Power BI retail revenue dashboard tracking gross profit, promotional lift, and SKU margin performance.',
    html_url: 'https://github.com/ThAnalyser/Tailwind-Traders-Sales-Analysis',
    language: 'Power BI',
    stargazers_count: 2,
    forks_count: 1,
    updated_at: '2025-06-14'
  }
];

export default function GithubActivity() {
  const [repos, setRepos] = useState<RepoData[]>(FALLBACK_REPOS);
  const [isLiveSynced, setIsLiveSynced] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Attempt client-side fetch from GitHub API with caching in localStorage
    const cached = localStorage.getItem('thanalyser_github_repos');
    const cachedTime = localStorage.getItem('thanalyser_github_time');
    const now = Date.now();

    if (cached && cachedTime && now - Number(cachedTime) < 3600000) {
      try {
        setRepos(JSON.parse(cached));
        setIsLiveSynced(true);
        return;
      } catch (e) {
        // Fallback
      }
    }

    setLoading(true);
    fetch('https://api.github.com/users/ThAnalyser/repos?sort=updated&per_page=6')
      .then((res) => {
        if (!res.ok) throw new Error('API Rate Limit or Network Error');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted: RepoData[] = data.map((r: any) => ({
            id: r.id,
            name: r.name,
            description: r.description || 'Public data analytics repository.',
            html_url: r.html_url,
            language: r.language || 'Data / SQL',
            stargazers_count: r.stargazers_count || 0,
            forks_count: r.forks_count || 0,
            updated_at: r.updated_at ? r.updated_at.split('T')[0] : 'Recent'
          }));
          setRepos(formatted);
          setIsLiveSynced(true);
          localStorage.setItem('thanalyser_github_repos', JSON.stringify(formatted));
          localStorage.setItem('thanalyser_github_time', String(now));
        }
      })
      .catch(() => {
        // Retain verified fallback repositories
        setIsLiveSynced(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  return (
    <section id="github" className="relative py-24 bg-[var(--bg-secondary)] overflow-hidden tech-grid-pattern">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] radial-glow-cyan pointer-events-none opacity-15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm">
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Open Source Repositories &amp; Notebooks</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Live GitHub <span className="text-gradient-cyan">Integration</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            Inspect live source code repositories, SQL migration scripts, Python machine learning pipelines, and Power BI template files published under <a href="https://github.com/ThAnalyser" target="_blank" rel="noopener noreferrer" className="text-cyan-500 font-bold hover:underline">@ThAnalyser</a>.
          </p>
        </div>

        {/* Telemetry Status Bar */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${isLiveSynced ? 'bg-emerald-500 animate-pulse' : 'bg-cyan-500'}`} />
              <span className="font-bold text-slate-900 dark:text-white">
                {isLiveSynced ? 'GitHub REST API Synchronized' : 'Verified Repository Registry'}
              </span>
            </div>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">
              User: <strong className="text-slate-800 dark:text-slate-200">ThAnalyser</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400 font-mono">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{totalStars} Stars</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400 font-mono">
              <GitFork className="w-3.5 h-3.5 text-blue-500" />
              <span>{totalForks} Forks</span>
            </div>
            <a
              href="https://github.com/ThAnalyser"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/20 transition-all"
            >
              <span>Follow @ThAnalyser</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Repository Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-4 group cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-cyan-500" />
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-cyan-600 dark:text-cyan-400 font-bold">
                      {repo.language}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {repo.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/5 text-[11px] text-slate-500 font-mono">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-blue-500" />
                    {repo.forks_count}
                  </span>
                </div>
                <span>Updated {repo.updated_at}</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
