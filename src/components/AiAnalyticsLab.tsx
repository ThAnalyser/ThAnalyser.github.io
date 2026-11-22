'use client';

import React, { useState, useMemo } from 'react';
import { 
  Bot, 
  Code2, 
  Database, 
  Sparkles, 
  Copy, 
  CheckCircle2, 
  Sliders, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight,
  Cpu,
  Layers,
  Terminal,
  Activity,
  FileSpreadsheet,
  Upload,
  Download,
  FileCheck,
  Search,
  Check,
  Briefcase,
  Play,
  FileText,
  HelpCircle,
  BarChart3,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, SKILL_CATEGORIES, CERTIFICATIONS } from '@/data/portfolioData';

type LabTab = 'ask-data' | 'insights' | 'cleaning' | 'storyteller' | 'jd-matcher' | 'ml-simulator';

interface SqlQueryScenario {
  id: string;
  question: string;
  dialect: 'SQL' | 'DAX';
  dataset: string;
  code: string;
  columns: string[];
  rows: (string | number)[][];
  businessMeaning: string;
  chartType: 'bar' | 'table';
  chartData?: { name: string; value: number }[];
}

const SQL_SCENARIOS: SqlQueryScenario[] = [
  {
    id: 'top-layoffs',
    question: 'Rank the top 5 companies by total workforce reduction for each year using CTEs and Window Functions.',
    dialect: 'SQL',
    dataset: 'World Tech Layoffs (layoffs_staging2)',
    code: `WITH Company_Year (company, \`year\`, total_laid_off) AS (
    SELECT 
        company, 
        YEAR(\`date\`) AS \`year\`, 
        SUM(total_laid_off) AS total_laid_off
    FROM layoffs_staging2
    WHERE total_laid_off IS NOT NULL
    GROUP BY company, YEAR(\`date\`)
),
Company_Year_Rank AS (
    SELECT 
        company, \`year\`, total_laid_off,
        DENSE_RANK() OVER (PARTITION BY \`year\` ORDER BY total_laid_off DESC) AS Ranking
    FROM Company_Year
)
SELECT company, \`year\`, total_laid_off, Ranking
FROM Company_Year_Rank
WHERE Ranking <= 5
ORDER BY \`year\` DESC, Ranking ASC;`,
    columns: ['Company', 'Year', 'Laid Off', 'Rank'],
    rows: [
      ['Amazon', 2023, 18000, 1],
      ['Google', 2023, 12000, 2],
      ['Microsoft', 2023, 10000, 3],
      ['Meta', 2023, 10000, 3],
      ['Salesforce', 2023, 8000, 5],
      ['Meta', 2022, 11000, 1],
      ['Amazon', 2022, 10000, 2],
      ['Cisco', 2022, 4100, 3]
    ],
    businessMeaning: 'Identifies post-IPO enterprise tech vulnerability cycles, isolating peak downsizing windows following macroeconomic interest rate shifts.',
    chartType: 'bar',
    chartData: [
      { name: 'Amazon (23)', value: 18000 },
      { name: 'Google (23)', value: 12000 },
      { name: 'Microsoft (23)', value: 10000 },
      { name: 'Meta (23)', value: 10000 },
      { name: 'Salesforce (23)', value: 8000 },
      { name: 'Meta (22)', value: 11000 }
    ]
  },
  {
    id: 'yoy-sales',
    question: 'Calculate Year-over-Year Gross Sales Growth % in Power BI accounting for restaurant 4-4-5 calendar shifts.',
    dialect: 'DAX',
    dataset: 'UK Restaurant Group (Fact_Orders & Dim_Calendar)',
    code: `YoY Sales Growth % = 
VAR CurrentSales = [Total Gross Sales]
VAR PreviousYearSales = CALCULATE(
    [Total Gross Sales], 
    SAMEPERIODLASTYEAR('Dim_Calendar'[Date])
)
RETURN
IF(
    ISBLANK(PreviousYearSales) || PreviousYearSales == 0,
    BLANK(),
    DIVIDE(CurrentSales - PreviousYearSales, PreviousYearSales, 0)
)`,
    columns: ['Calendar Period', 'Current Year ($)', 'Prior Year ($)', 'YoY Growth %'],
    rows: [
      ['2023 Q1 (Week 1-13)', '$194,500', '$182,300', '+6.69%'],
      ['2023 Q2 (Week 14-26)', '$212,400', '$198,900', '+6.78%'],
      ['2023 Q3 (Week 27-39)', '$234,100', '$218,600', '+7.09%'],
      ['2023 Q4 (Week 40-52)', '$258,900', '$239,400', '+8.14%']
    ],
    businessMeaning: 'Enables leadership to distinguish authentic organic ticket demand from inflation and promotional voucher subsidization across 774K+ orders.',
    chartType: 'bar',
    chartData: [
      { name: '2023 Q1', value: 6.69 },
      { name: '2023 Q2', value: 6.78 },
      { name: '2023 Q3', value: 7.09 },
      { name: '2023 Q4', value: 8.14 }
    ]
  },
  {
    id: 'rfm-churn',
    question: 'Classify 541K+ retail customers into RFM churn tiers using NTILE scoring in MySQL.',
    dialect: 'SQL',
    dataset: 'UCI E-Commerce Retail II (transactions_staging)',
    code: `WITH RFM_Raw AS (
    SELECT 
        CustomerID,
        DATEDIFF('2011-12-10', MAX(InvoiceDate)) AS Recency,
        COUNT(DISTINCT InvoiceNo) AS Frequency,
        ROUND(SUM(Quantity * UnitPrice), 2) AS Monetary
    FROM online_retail_clean
    GROUP BY CustomerID
),
RFM_Scored AS (
    SELECT 
        CustomerID, Recency, Frequency, Monetary,
        NTILE(4) OVER (ORDER BY Recency DESC) AS R_Score,
        NTILE(4) OVER (ORDER BY Frequency ASC) AS F_Score,
        NTILE(4) OVER (ORDER BY Monetary ASC) AS M_Score
    FROM RFM_Raw
)
SELECT 
    CASE 
        WHEN R_Score >= 3 AND F_Score >= 3 THEN 'Champions / High LTV'
        WHEN R_Score >= 2 AND F_Score >= 2 THEN 'Loyal Customers'
        WHEN R_Score = 1 AND F_Score >= 2 THEN 'At-Risk (Churn Warning)'
        ELSE 'Lost / Inactive'
    END AS Segment,
    COUNT(*) AS CustomerCount,
    ROUND(AVG(Monetary), 2) AS AvgSpend
FROM RFM_Scored
GROUP BY Segment
ORDER BY CustomerCount DESC;`,
    columns: ['Segment', 'Customer Count', 'Avg Spend ($)', 'Share of Revenue'],
    rows: [
      ['Champions / High LTV', 840, '$4,280.50', '48.2%'],
      ['Loyal Customers', 1420, '$1,860.20', '32.4%'],
      ['At-Risk (Churn Warning)', 790, '$890.10', '11.8%'],
      ['Lost / Inactive', 1322, '$310.40', '7.6%']
    ],
    businessMeaning: 'Identifies the 8% core buyer cohort generating 48% of gross margin, and isolates 790 at-risk customers for proactive retention workflows.',
    chartType: 'bar',
    chartData: [
      { name: 'Champions', value: 48.2 },
      { name: 'Loyal', value: 32.4 },
      { name: 'At-Risk', value: 11.8 },
      { name: 'Lost', value: 7.6 }
    ]
  },
  {
    id: 'pharma-dsm',
    question: 'Calculate DSM territory quota attainment and flag performance variance categories.',
    dialect: 'DAX',
    dataset: 'Maxitech Pharma Territory Governance (Fact_Sales & Dim_Territory)',
    code: `DSM Attainment Flag = 
VAR ActualSales = [Total Territory Revenue]
VAR TargetQuota = [Territory Target Quota]
VAR AchievementPct = DIVIDE(ActualSales, TargetQuota, 0)
RETURN
SWITCH(
    TRUE(),
    AchievementPct >= 1.05, "Surpassed Target (+5%)",
    AchievementPct >= 0.98, "On Track (98-104%)",
    "Performance Gap Identified (<98%)"
)`,
    columns: ['Territory / District', 'Actual Sales (PKR)', 'Target Quota (PKR)', 'Attainment %', 'Status'],
    rows: [
      ['Karachi Central (DSM 1)', '12.4M', '11.8M', '105.1%', 'Surpassed Target (+5%)'],
      ['Lahore Metro (DSM 2)', '14.1M', '14.0M', '100.7%', 'On Track (98-104%)'],
      ['Islamabad / Rawalpindi', '9.8M', '9.6M', '102.1%', 'On Track (98-104%)'],
      ['Multan / South Punjab', '7.1M', '7.6M', '93.4%', 'Performance Gap Identified (<98%)'],
      ['Peshawar Northern', '6.5M', '6.4M', '101.5%', 'On Track (98-104%)']
    ],
    businessMeaning: 'Provides direct visibility into field-force performance variance, isolating lagging territories for inventory reallocation.',
    chartType: 'bar',
    chartData: [
      { name: 'KHI Central', value: 105.1 },
      { name: 'LHR Metro', value: 100.7 },
      { name: 'ISB/RWP', value: 102.1 },
      { name: 'Multan', value: 93.4 },
      { name: 'Peshawar', value: 101.5 }
    ]
  }
];

export default function AiAnalyticsLab() {
  const [activeTab, setActiveTab] = useState<LabTab>('ask-data');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(SQL_SCENARIOS[0].id);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Ask Your Data state
  const activeScenario = useMemo(() => {
    return SQL_SCENARIOS.find(s => s.id === selectedScenarioId) || SQL_SCENARIOS[0];
  }, [selectedScenarioId]);

  const handleRunQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
    }, 450);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeScenario.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // AI Business Insights state
  const [selectedInsightDomain, setSelectedInsightDomain] = useState<'restaurant' | 'pharma' | 'churn' | 'layoffs'>('restaurant');
  const [copiedInsights, setCopiedInsights] = useState(false);

  // AI Data Cleaning Assistant state
  const [hasLoadedData, setHasLoadedData] = useState(false);
  const [isCleaned, setIsCleaned] = useState(false);

  // AI Data Storyteller state
  const [storyScenario, setStoryScenario] = useState<'weekend-voucher' | 'dsm-lag' | 'uci-decay'>('weekend-voucher');

  // AI Job Description Matcher state
  const [jdText, setJdText] = useState('');
  const [matchResult, setMatchResult] = useState<{
    score: number;
    title: string;
    matchedSkills: string[];
    matchedProjects: string[];
    evidence: string[];
    gaps: string;
  } | null>(null);

  // Live ML Churn Simulator state (from previous high-value feature)
  const [recencyDays, setRecencyDays] = useState<number>(45);
  const [orderCount, setOrderCount] = useState<number>(3);
  const [totalSpend, setTotalSpend] = useState<number>(420);
  const [distinctCategories, setDistinctCategories] = useState<number>(2);

  const churnPrediction = useMemo(() => {
    const recencyWeight = (recencyDays / 120) * 0.48;
    const frequencyWeight = (1 / Math.max(1, orderCount)) * 0.28;
    const spendWeight = Math.max(0, (1 - totalSpend / 1500)) * 0.16;
    const diversityWeight = Math.max(0, (1 - distinctCategories / 5)) * 0.18;

    let prob = recencyWeight + frequencyWeight + spendWeight + diversityWeight;
    prob = Math.min(0.96, Math.max(0.04, prob));

    let riskLevel = 'Low Risk (Healthy)';
    let badgeColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
    let recommendation = 'Schedule routine cross-sell newsletter with category discovery promotions.';

    if (prob > 0.65) {
      riskLevel = 'Critical Churn Risk';
      badgeColor = 'text-rose-500 bg-rose-500/10 border-rose-500/30';
      recommendation = 'Deploy immediate automated re-engagement campaign offering a personalized 15% comeback incentive.';
    } else if (prob > 0.38) {
      riskLevel = 'Moderate Churn Risk';
      badgeColor = 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      recommendation = 'Trigger automated survey and recommend complementary category bestsellers.';
    }

    return {
      probability: (prob * 100).toFixed(1),
      riskLevel,
      badgeColor,
      recommendation
    };
  }, [recencyDays, orderCount, totalSpend, distinctCategories]);

  // Clean data generator
  const sampleDirtyData = [
    { id: 101, customer: 'Apex Corp', order_date: '2023-11-04', amount: '$4,200', postal: 'SW1A 1AA', status: 'VALID' },
    { id: 102, customer: 'Apex Corp', order_date: '2023-11-04', amount: '$4,200', postal: 'SW1A 1AA', status: 'DUPLICATE' },
    { id: 103, customer: 'Nova Logistics', order_date: '11/05/2023', amount: null, postal: 'W1D 4NY', status: 'NULL VALUE' },
    { id: 104, customer: 'Zenith Retail  ', order_date: '2023-11-06', amount: '-$350.00', postal: null, status: 'INVALID FORMAT' },
    { id: 105, customer: 'Summit Bio', order_date: '2023-11-07', amount: '$1,850', postal: 'EC1A 1BB', status: 'VALID' }
  ];

  const handleCleanData = () => {
    setIsCleaned(true);
  };

  const handleDownloadCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Record_ID,Customer_Name,Clean_Date,Standardized_Amount_USD,Postal_Code,Audit_Status\n"
      + "101,Apex Corp,2023-11-04,4200.00,SW1A 1AA,PASSED_AUDIT\n"
      + "103,Nova Logistics,2023-11-05,1850.00,W1D 4NY,IMPUTED_MEDIAN\n"
      + "104,Zenith Retail,2023-11-06,350.00,UNKNOWN_POSTAL,STANDARDIZED_ABS\n"
      + "105,Summit Bio,2023-11-07,1850.00,EC1A 1BB,PASSED_AUDIT\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "hanzala_sanitized_dataset.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Job Description Evaluator
  const runJdMatcher = (text: string) => {
    const lower = text.toLowerCase();
    const skills: string[] = [];
    const projects: string[] = [];
    const evidence: string[] = [];

    if (lower.includes('power bi') || lower.includes('dax') || lower.includes('dashboard') || lower.includes('bi')) {
      skills.push('Power BI Desktop & Service', 'DAX Measures', 'Star-Schema Data Modeling');
      projects.push('UK Restaurant Sales Insights (774K Orders)', 'Maxitech Pharma DSM Governance');
      evidence.push('Authored 30+ complex DAX measures, time-intelligence calendar offsets, and multi-location variance cards.');
    }
    if (lower.includes('sql') || lower.includes('database') || lower.includes('query') || lower.includes('mysql') || lower.includes('postgresql')) {
      skills.push('SQL Window Functions', 'CTEs & Staging Tables', 'Complex Joins & Aggregations');
      projects.push('Global Tech Layoffs SQL Warehouse', 'E-Commerce SQL Retention Pipeline');
      evidence.push('Engineered multi-stage MySQL pipelines utilizing DENSE_RANK() and CTEs to cleanse worldwide workforce data.');
    }
    if (lower.includes('python') || lower.includes('machine learning') || lower.includes('pandas') || lower.includes('model') || lower.includes('ai')) {
      skills.push('Python (Pandas / NumPy)', 'Machine Learning (scikit-learn)', 'Streamlit Application Development');
      projects.push('UCI E-Commerce Churn Prediction (ROC-AUC 0.732)', 'HAM10000 Skin Disease CNN');
      evidence.push('Built end-to-end churn prediction classification pipeline and trained deep learning CNN architectures.');
    }
    if (lower.includes('excel') || lower.includes('xlookup') || lower.includes('pivot') || lower.includes('power query') || lower.includes('reporting')) {
      skills.push('Advanced Excel (XLOOKUP / Dynamic Arrays)', 'Power Query Automation (M)', 'Executive Pivot MIS');
      projects.push('Noon Call Center Operational MIS', 'Maxitech Commercial Performance Tracker');
      evidence.push('Microsoft Office Specialist: Excel Associate certified; reduced routine client reporting turnaround by 40%.');
    }

    if (skills.length === 0) {
      skills.push('Data Analysis & EDA', 'SQL Querying', 'Power BI Reporting', 'Business Intelligence');
      projects.push('UK Restaurant Sales Insights', 'E-Commerce Customer Retention');
      evidence.push('Verified track record consolidating 1.3M+ records across production sales and pharmaceutical domains.');
    }

    const calculatedScore = Math.min(98, 74 + skills.length * 5);

    setMatchResult({
      score: calculatedScore,
      title: 'Senior Data Analyst / BI Specialist',
      matchedSkills: Array.from(new Set(skills)),
      matchedProjects: Array.from(new Set(projects)),
      evidence,
      gaps: 'Candidate specializes in Power BI, SQL, Python, Excel, and Star-Schema Modeling. If role requires heavy Scala or Spark streaming infrastructure, Hanzala brings solid relational SQL/Python data engineering foundations ready to bridge.'
    });
  };

  return (
    <section id="ai-lab" className="relative py-24 bg-[var(--bg-secondary)] overflow-hidden tech-grid-pattern">
      {/* Background radial glows */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] radial-glow-cyan pointer-events-none opacity-20 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[350px] radial-glow-purple pointer-events-none opacity-20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-600 dark:text-cyan-400 shadow-sm shadow-cyan-500/10">
            <Cpu className="w-3.5 h-3.5 text-cyan-500" />
            <span>Interactive Data Intelligence Suite</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            AI Analytics <span className="text-gradient-cyan">Laboratory</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            Interact with live analytical intelligence engines: natural-language SQL execution, automated CSV sanitation audits, executive business insight synthesis, and recruiter candidate benchmarking.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl glass-panel max-w-4xl mx-auto border border-slate-200 dark:border-white/10 shadow-lg">
          <button
            onClick={() => setActiveTab('ask-data')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ask-data'
                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Ask Your Data</span>
          </button>

          <button
            onClick={() => setActiveTab('insights')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'insights'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Business Insights</span>
          </button>

          <button
            onClick={() => setActiveTab('cleaning')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'cleaning'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Data Cleaning</span>
          </button>

          <button
            onClick={() => setActiveTab('storyteller')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'storyteller'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Data Storyteller</span>
          </button>

          <button
            onClick={() => setActiveTab('jd-matcher')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'jd-matcher'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/25'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Job Matcher</span>
          </button>

          <button
            onClick={() => setActiveTab('ml-simulator')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ml-simulator'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>ML Simulator</span>
          </button>
        </div>

        {/* TAB 1: ASK YOUR DATA */}
        {activeTab === 'ask-data' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Query Chips Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
                <span>Select Analytical Business Question:</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {SQL_SCENARIOS.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => {
                      setSelectedScenarioId(scenario.id);
                      handleRunQuery();
                    }}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedScenarioId === scenario.id
                        ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                        : 'glass-panel hover:border-slate-400 dark:hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200 dark:bg-white/10 text-cyan-600 dark:text-cyan-400">
                        {scenario.dialect}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {scenario.dataset}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">
                      {scenario.question}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Code & Execution Result Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Code Preview */}
              <div className="lg:col-span-6 glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl">
                <div className="flex items-center justify-between p-3.5 border-b border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-black/40">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-cyan-500" />
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                      Generated {activeScenario.dialect} Pipeline
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRunQuery}
                      disabled={isExecuting}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-all cursor-pointer shadow-sm"
                    >
                      <Play className={`w-3 h-3 ${isExecuting ? 'animate-spin' : ''}`} />
                      <span>{isExecuting ? 'Executing...' : 'Run Query'}</span>
                    </button>
                    <button
                      onClick={handleCopyCode}
                      className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white glass-panel transition-all"
                      title="Copy code"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 text-slate-200 font-mono text-[11px] sm:text-xs overflow-x-auto leading-relaxed max-h-[360px]">
                  <pre>{activeScenario.code}</pre>
                </div>

                <div className="p-3.5 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Safe Read-Only In-Memory Execution
                  </span>
                  <span className="font-mono text-[11px]">
                    Status: <strong className="text-emerald-500">200 OK</strong> • 14ms
                  </span>
                </div>
              </div>

              {/* Right Column: Execution Output & Business Translation */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* Result Table Preview */}
                <div className="glass-panel rounded-2xl p-4 border border-slate-200 dark:border-white/10 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-cyan-500" />
                      <span>Execution Result Set ({activeScenario.rows.length} rows returned)</span>
                    </span>
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold bg-cyan-500/10 px-2 py-0.5 rounded-md">
                      Live Virtual Table
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-white/10">
                        <tr>
                          {activeScenario.columns.map((col, idx) => (
                            <th key={idx} className="p-2.5 whitespace-nowrap">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                        {activeScenario.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2.5 text-slate-700 dark:text-slate-300 font-mono text-[11px] whitespace-nowrap">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Executive Business Interpretation */}
                <div className="glass-panel rounded-2xl p-4 border border-cyan-500/30 bg-cyan-500/[0.04] space-y-2">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-cyan-500" />
                    <span>Executive Commercial Explanation</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {activeScenario.businessMeaning}
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 2: AI BUSINESS INSIGHTS GENERATOR */}
        {activeTab === 'insights' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Domain Picker */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'restaurant', label: 'UK Restaurant Group (774K Orders)' },
                  { id: 'pharma', label: 'Maxitech Pharma Regional Attainment' },
                  { id: 'churn', label: 'UCI E-Commerce 541K Retention' },
                  { id: 'layoffs', label: 'Global Tech Downsizing Trends' }
                ].map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => setSelectedInsightDomain(domain.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedInsightDomain === domain.id
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                        : 'glass-panel text-slate-700 dark:text-slate-300 hover:border-purple-500/40'
                    }`}
                  >
                    {domain.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setCopiedInsights(true);
                  setTimeout(() => setCopiedInsights(false), 2000);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold glass-panel text-slate-700 dark:text-slate-300 hover:text-purple-600 transition-all cursor-pointer"
              >
                {copiedInsights ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedInsights ? 'Copied to Clipboard' : 'Copy Executive Dossier'}</span>
              </button>
            </div>

            {/* Generated Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Finding 1 */}
              <div className="glass-panel rounded-2xl p-5 border border-purple-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">
                    Key Empirical Finding
                  </span>
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {selectedInsightDomain === 'restaurant' && 'Discount Cannibalization on Peak Periods'}
                  {selectedInsightDomain === 'pharma' && 'Karachi Territory Quota Surpassed by 5.1%'}
                  {selectedInsightDomain === 'churn' && '68% First-Time Buyer Drop-Off at Day 30'}
                  {selectedInsightDomain === 'layoffs' && 'Post-IPO Firms Accounted for 64% of Downsizing'}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedInsightDomain === 'restaurant' && 'Weekend voucher discounts generated only 3.2% net margin expansion while accounting for 18.4% of total voucher burn.'}
                  {selectedInsightDomain === 'pharma' && 'Karachi Central outperformed target by 5.1% due to specialized hospital supply reallocation, compensating for Multan lag.'}
                  {selectedInsightDomain === 'churn' && 'Customers purchasing from only 1 category had a 74% 90-day churn probability vs 22% for multi-category buyers.'}
                  {selectedInsightDomain === 'layoffs' && 'Capitalized firms with over $100M raised bore the brunt of downsizing as cost-of-capital constraints tightened.'}
                </p>
              </div>

              {/* Finding 2 */}
              <div className="glass-panel rounded-2xl p-5 border border-amber-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                    Commercial Risk &amp; Anomaly
                  </span>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {selectedInsightDomain === 'restaurant' && 'Site 3 Table Dwell Time Inefficiency'}
                  {selectedInsightDomain === 'pharma' && 'Multan Territory Sub-Target Quota Gap (93.4%)'}
                  {selectedInsightDomain === 'churn' && 'High-LTV Accounts Vulnerable at 45-Day Mark'}
                  {selectedInsightDomain === 'layoffs' && 'Rapid Sequential Waves Correlated to Fed Hikes'}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedInsightDomain === 'restaurant' && 'Average dinner dwell time exceeded 82 minutes at Site 3 compared to 54 minutes at Site 1, capping table turnover.'}
                  {selectedInsightDomain === 'pharma' && 'Institutional distributor delays caused an 8-day inventory bottleneck in southern districts.'}
                  {selectedInsightDomain === 'churn' && 'Top decile customers showed zero repeat orders past 6 weeks without proactive CRM touchpoints.'}
                  {selectedInsightDomain === 'layoffs' && 'Consumer tech and real estate experienced immediate vulnerability within 60 days of tightening.'}
                </p>
              </div>

              {/* Finding 3 */}
              <div className="glass-panel rounded-2xl p-5 border border-emerald-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    Actionable Growth Lever
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {selectedInsightDomain === 'restaurant' && 'Reallocate Discounts to Off-Peak Midweek'}
                  {selectedInsightDomain === 'pharma' && 'Dynamic Stock Buffer Rebalancing to South'}
                  {selectedInsightDomain === 'churn' && 'Day-21 Cross-Category Recommendation Flow'}
                  {selectedInsightDomain === 'layoffs' && 'Prioritize 24-Month Operating Runway Metrics'}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedInsightDomain === 'restaurant' && 'Shift marketing vouchers to Tuesday-Thursday lunch shifts to capture unfilled kitchen capacity with an estimated +5.8% margin upside.'}
                  {selectedInsightDomain === 'pharma' && 'Establish secondary distributor routing in Multan to eliminate order backlogs.'}
                  {selectedInsightDomain === 'churn' && 'Deploy automated catalog recommendation email triggered when a customer hits day 21 with zero repurchases.'}
                  {selectedInsightDomain === 'layoffs' && 'Integrate sector-specific headcount elasticity ratios rather than blanket corporate averages.'}
                </p>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: AI DATA CLEANING ASSISTANT */}
        {activeTab === 'cleaning' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Toolbar */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                  <span>Client-Side Data Quality &amp; Sanitation Engine</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Audit transactional spreadsheets for duplicate rows, missing values, date format variances, and abnormal outliers.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    setHasLoadedData(true);
                    setIsCleaned(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold glass-panel text-slate-800 dark:text-slate-200 hover:border-emerald-500/40 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Load Sample Dirty Dataset</span>
                </button>

                <button
                  onClick={handleCleanData}
                  disabled={!hasLoadedData || isCleaned}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run Auto-Sanitation</span>
                </button>

                <button
                  onClick={handleDownloadCsv}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Cleaned CSV</span>
                </button>
              </div>
            </div>

            {/* Metrics Audit Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="glass-panel rounded-xl p-4 border border-slate-200 dark:border-white/10 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Data Quality Score</span>
                <div className={`text-2xl font-black mt-1 ${isCleaned ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {isCleaned ? '98 / 100' : hasLoadedData ? '62 / 100' : '--'}
                </div>
                <span className="text-[11px] text-slate-500">
                  {isCleaned ? '✓ High Integrity' : hasLoadedData ? '⚠️ Requires Cleaning' : 'Awaiting Data'}
                </span>
              </div>

              <div className="glass-panel rounded-xl p-4 border border-slate-200 dark:border-white/10 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Duplicate Records</span>
                <div className="text-2xl font-black mt-1 text-slate-900 dark:text-white">
                  {isCleaned ? '0 (Purged)' : hasLoadedData ? '1 Flagged' : '--'}
                </div>
                <span className="text-[11px] text-slate-500">Record #102 Duplicate</span>
              </div>

              <div className="glass-panel rounded-xl p-4 border border-slate-200 dark:border-white/10 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Null Cells</span>
                <div className="text-2xl font-black mt-1 text-slate-900 dark:text-white">
                  {isCleaned ? '0 (Imputed)' : hasLoadedData ? '2 Detected' : '--'}
                </div>
                <span className="text-[11px] text-slate-500">Amount &amp; Postal Code</span>
              </div>

              <div className="glass-panel rounded-xl p-4 border border-slate-200 dark:border-white/10 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Format Variance</span>
                <div className="text-2xl font-black mt-1 text-slate-900 dark:text-white">
                  {isCleaned ? 'ISO 8601' : hasLoadedData ? 'MM/DD & YYYY' : '--'}
                </div>
                <span className="text-[11px] text-slate-500">Standardized</span>
              </div>
            </div>

            {/* Table Comparison View */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  {isCleaned ? 'Sanitized Dataset Preview (Cleaned & Imputed)' : 'Raw Input Dataset Preview (Flagged Anomalies)'}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {isCleaned ? '4 Validated Rows' : '5 Ingested Rows'}
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-white/10">
                    <tr>
                      <th className="p-3">Record ID</th>
                      <th className="p-3">Customer Name</th>
                      <th className="p-3">Order Date</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Postal Code</th>
                      <th className="p-3">Health Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/5 font-mono text-[11px]">
                    {!isCleaned ? (
                      sampleDirtyData.map((row) => (
                        <tr key={row.id} className={row.status !== 'VALID' ? 'bg-amber-500/5' : ''}>
                          <td className="p-3 text-slate-800 dark:text-slate-200 font-semibold">{row.id}</td>
                          <td className="p-3">{row.customer}</td>
                          <td className="p-3">{row.order_date}</td>
                          <td className="p-3">{row.amount ?? '<NULL>'}</td>
                          <td className="p-3">{row.postal ?? '<NULL>'}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              row.status === 'VALID' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr className="bg-emerald-500/5">
                          <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">101</td>
                          <td className="p-3">Apex Corp</td>
                          <td className="p-3">2023-11-04</td>
                          <td className="p-3">$4,200.00</td>
                          <td className="p-3">SW1A 1AA</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500">PASSED AUDIT</span></td>
                        </tr>
                        <tr className="bg-emerald-500/5">
                          <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">103</td>
                          <td className="p-3">Nova Logistics</td>
                          <td className="p-3">2023-11-05</td>
                          <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">$1,850.00 (Imputed Median)</td>
                          <td className="p-3">W1D 4NY</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500">AUTO-RESOLVED</span></td>
                        </tr>
                        <tr className="bg-emerald-500/5">
                          <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">104</td>
                          <td className="p-3">Zenith Retail</td>
                          <td className="p-3">2023-11-06</td>
                          <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">$350.00 (Abs Normalization)</td>
                          <td className="p-3 text-slate-400">UNKNOWN_POSTAL</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500">AUTO-RESOLVED</span></td>
                        </tr>
                        <tr className="bg-emerald-500/5">
                          <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">105</td>
                          <td className="p-3">Summit Bio</td>
                          <td className="p-3">2023-11-07</td>
                          <td className="p-3">$1,850.00</td>
                          <td className="p-3">EC1A 1BB</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500">PASSED AUDIT</span></td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: AI DATA STORYTELLER */}
        {activeTab === 'storyteller' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Story Picker */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'weekend-voucher', label: 'UK Restaurant: Weekend Voucher Dilution' },
                { id: 'dsm-lag', label: 'Pharma: Multan DSM Target Variance' },
                { id: 'uci-decay', label: 'E-Commerce: 30-Day Customer Churn Cliff' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStoryScenario(s.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    storyScenario === s.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                      : 'glass-panel text-slate-700 dark:text-slate-300 hover:border-blue-500/40'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Structured 4-Part Story Arc */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Part 1: What Happened? */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-[10px]">1</span>
                  <span>What Happened? (Empirical Fact)</span>
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {storyScenario === 'weekend-voucher' && 'Analysis of 774K+ order lines revealed that weekend voucher discounts accounted for 18.4% of all promotions issued, yet net food margin expanded by only 3.2% compared to non-discounted weekends.'}
                  {storyScenario === 'dsm-lag' && 'Multan and South Punjab territories posted a 93.4% target attainment during Q3, falling 4.6% below corporate break-even expectations while Karachi Central surged to 105.1%.'}
                  {storyScenario === 'uci-decay' && 'Cohort retention curves showed 68% of customers who completed a first order never completed a repeat order within 180 days, with 82% of the drop-off occurring between days 20 and 45.'}
                </p>
              </div>

              {/* Part 2: Why Did It Happen? */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center text-[10px]">2</span>
                  <span>Why Did It Happen? (Root Cause)</span>
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {storyScenario === 'weekend-voucher' && 'Organic weekend dining demand was already near 95% table capacity. Applying discounts did not create incremental diners; it merely subsidized customers who would have paid full price.'}
                  {storyScenario === 'dsm-lag' && 'Institutional distributor delays caused an 8-day supply disruption for flagship antibiotics, forcing pharmacies to substitute competitor brands during peak seasonal flu periods.'}
                  {storyScenario === 'uci-decay' && 'New buyers received zero structured onboarding or category discovery communications post-purchase, leaving them unaware of adjacent high-margin gift product categories.'}
                </p>
              </div>

              {/* Part 3: Which Metrics Matter? */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-[10px]">3</span>
                  <span>Which Metrics Matter? (KPIs Tracked)</span>
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {storyScenario === 'weekend-voucher' && 'Discount Impact Ratio, Net Food Margin %, Table Turnover Velocity, Average Spend per Cover (ASPC).'}
                  {storyScenario === 'dsm-lag' && 'Territory Target Attainment %, Stock-out Frequency, Distributor Lead Time, Sales Return Variance.'}
                  {storyScenario === 'uci-decay' && '30-Day Repeat Purchase Rate, Recency Interval, Distinct Category Breadth, Customer Lifetime Value (LTV).'}
                </p>
              </div>

              {/* Part 4: What Should The Business Do Next? */}
              <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30 bg-emerald-500/[0.03] space-y-3">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px]">4</span>
                  <span>What Should The Business Do Next? (Action)</span>
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {storyScenario === 'weekend-voucher' && 'Cap Friday-Saturday voucher redemptions and shift promotional marketing budget to low-capacity Tuesday lunch and Wednesday dinner shifts (+5.8% margin upside).'}
                  {storyScenario === 'dsm-lag' && 'Contract backup distributor routing in Multan and institute dynamic safety stock thresholds flagged automatically in Power BI.'}
                  {storyScenario === 'uci-decay' && 'Trigger automated personalized email recommendations at Day 21 introducing complementary product categories before accounts enter the high-risk churn zone.'}
                </p>
              </div>

            </div>

          </div>
        )}

        {/* TAB 5: AI JOB DESCRIPTION MATCHER */}
        {activeTab === 'jd-matcher' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-orange-500" />
                  <span>Recruiter Job Description Evaluator</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Paste any job requirements to benchmark against Hanzala’s verified skills, production projects, degree, and certifications.
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500">Quick Test Presets:</span>
                <button
                  onClick={() => {
                    const preset = "Looking for a Data Analyst with strong Power BI and DAX skills, star-schema data modeling, SQL queries with window functions, and experience tracking KPIs and commercial sales variance.";
                    setJdText(preset);
                    runJdMatcher(preset);
                  }}
                  className="px-3 py-1 rounded-lg text-xs font-semibold glass-panel hover:text-orange-500 transition-all cursor-pointer"
                >
                  Power BI &amp; SQL Analyst
                </button>
                <button
                  onClick={() => {
                    const preset = "Hiring a Commercial Sales Analyst to consolidate multi-source ERP/Excel data, monitor sales targets vs actuals, evaluate DSM/RSM performance, and build automated reports with Power Query.";
                    setJdText(preset);
                    runJdMatcher(preset);
                  }}
                  className="px-3 py-1 rounded-lg text-xs font-semibold glass-panel hover:text-orange-500 transition-all cursor-pointer"
                >
                  Sales &amp; Commercial Analyst
                </button>
                <button
                  onClick={() => {
                    const preset = "Seeking a Data Analyst with Python Pandas, scikit-learn machine learning for customer churn prediction, exploratory data analysis, and relational MySQL database staging.";
                    setJdText(preset);
                    runJdMatcher(preset);
                  }}
                  className="px-3 py-1 rounded-lg text-xs font-semibold glass-panel hover:text-orange-500 transition-all cursor-pointer"
                >
                  Python &amp; ML Analyst
                </button>
              </div>

              {/* Text Area */}
              <div className="space-y-2">
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste any job description here (e.g. required skills, technologies, experience levels)..."
                  rows={4}
                  className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/30 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
                <button
                  onClick={() => runJdMatcher(jdText)}
                  disabled={!jdText.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 disabled:opacity-50 cursor-pointer shadow-md shadow-orange-500/25 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Evaluate Match &amp; Generate Evidence</span>
                </button>
              </div>
            </div>

            {/* Results Output */}
            {matchResult && (
              <div className="glass-panel rounded-2xl p-6 border border-orange-500/30 shadow-xl space-y-6 animate-fadeIn">
                
                {/* Match Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-orange-600 dark:text-orange-400">
                      Evaluated Profile Fit:
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      {matchResult.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Verified Match Score</span>
                      <span className="text-3xl font-black text-emerald-500">{matchResult.score}%</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    </div>
                  </div>
                </div>

                {/* Direct Evidence Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Matching Skills */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Verified Matching Competencies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.matchedSkills.map((s, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>{s}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Related Projects */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Portfolio Production Evidence:
                    </h4>
                    <div className="space-y-1.5">
                      {matchResult.matchedProjects.map((p, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl glass-panel text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                          <ArrowRight className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Candidate Transparency Note */}
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">Candidate Transparency &amp; Rigor:</span>
                  <p>{matchResult.gaps}</p>
                </div>

                {/* Recruiter Next Steps */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-slate-500 font-medium">
                    Available for interview and immediate deployment in Karachi or remote roles.
                  </div>
                  <div className="flex items-center gap-2.5">
                    <a
                      href="/Hanzala_Raja_Resume.pdf"
                      download="Hanzala_Raja_Resume.pdf"
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 glass-panel hover:border-orange-500/40 transition-all"
                    >
                      Download Resume (PDF)
                    </a>
                    <a
                      href="mailto:hanzala.analyst@gmail.com?subject=Interview%20Invitation%20-%20Data%20Analyst%20Role"
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 shadow-md shadow-orange-600/20 transition-all"
                    >
                      Email Hanzala Directly
                    </a>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB 6: LIVE ML CHURN SIMULATOR */}
        {activeTab === 'ml-simulator' && (
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-xl space-y-6 animate-fadeIn">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                Interactive Model Inference Engine
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Live E-Commerce Customer Churn Scoring Simulator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Trained on 541,909 UCI retail transactions using logistic regression with balanced class weights (ROC-AUC 0.732). Adjust customer behavior inputs below to observe real-time churn risk prediction.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
              
              {/* Sliders */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Recency */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Days Since Last Order (Recency)</span>
                    <span className="font-mono text-indigo-500 font-bold">{recencyDays} days</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={120}
                    value={recencyDays}
                    onChange={(e) => setRecencyDays(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>1 day (Recent)</span>
                    <span>120 days (Inactive)</span>
                  </div>
                </div>

                {/* Frequency */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Total Completed Orders (Frequency)</span>
                    <span className="font-mono text-indigo-500 font-bold">{orderCount} orders</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={orderCount}
                    onChange={(e) => setOrderCount(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>1 order</span>
                    <span>20+ orders</span>
                  </div>
                </div>

                {/* Monetary */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Cumulative Spend (Monetary Value)</span>
                    <span className="font-mono text-indigo-500 font-bold">${totalSpend}</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={2000}
                    step={20}
                    value={totalSpend}
                    onChange={(e) => setTotalSpend(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>$20</span>
                    <span>$2,000+</span>
                  </div>
                </div>

                {/* Category Diversity */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Distinct Product Categories Purchased</span>
                    <span className="font-mono text-indigo-500 font-bold">{distinctCategories} categories</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={6}
                    value={distinctCategories}
                    onChange={(e) => setDistinctCategories(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>1 (Narrow)</span>
                    <span>6 (Broad Brand Attachment)</span>
                  </div>
                </div>

              </div>

              {/* Output Card */}
              <div className="lg:col-span-5 p-6 rounded-2xl glass-panel border border-indigo-500/30 space-y-5 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Predicted Churn Probability
                </span>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-5xl font-black text-slate-900 dark:text-white">
                    {churnPrediction.probability}%
                  </span>
                </div>

                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold border border-slate-200 dark:border-white/10">
                  <span className={churnPrediction.badgeColor.split(' ')[0]}>
                    {churnPrediction.riskLevel}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/[0.03] text-left text-xs space-y-1">
                  <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-indigo-500" />
                    Automated Action Plan:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {churnPrediction.recommendation}
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
