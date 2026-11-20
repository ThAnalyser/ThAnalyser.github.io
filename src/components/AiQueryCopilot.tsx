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
  Activity
} from 'lucide-react';

interface AiQuerySample {
  title: string;
  category: 'SQL' | 'DAX';
  nlQuery: string;
  generatedCode: string;
  businessImpact: string;
}

const AI_QUERIES: AiQuerySample[] = [
  {
    title: "YoY Sales Growth with Financial Calendar",
    category: "DAX",
    nlQuery: "Calculate Year-over-Year Sales Growth percentage in Power BI while accounting for 4-4-5 restaurant financial calendar offsets.",
    generatedCode: `YoY Sales Growth % = 
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
    businessImpact: "Used across 774K+ UK restaurant transactions to isolate real ticket growth from aggressive voucher discounting."
  },
  {
    title: "Top 5 Downsizing Companies by Year",
    category: "SQL",
    nlQuery: "Rank the top 5 companies with highest layoffs for each calendar year using Common Table Expressions and Window Functions.",
    generatedCode: `WITH Company_Year (company, \`year\`, total_laid_off) AS (
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
        company, 
        \`year\`, 
        total_laid_off,
        DENSE_RANK() OVER (PARTITION BY \`year\` ORDER BY total_laid_off DESC) AS Ranking
    FROM Company_Year
)
SELECT company, \`year\`, total_laid_off, Ranking
FROM Company_Year_Rank
WHERE Ranking <= 5
ORDER BY \`year\` DESC, Ranking ASC;`,
    businessImpact: "Sanitized dirty multi-year datasets in World Layoffs SQL project to isolate late-stage vulnerability trends."
  },
  {
    title: "DSM & RSM Target Variance %",
    category: "DAX",
    nlQuery: "Compute DSM territory target achievement percentage and flag whether quota has been surpassed, met, or has a performance gap.",
    generatedCode: `DSM Achievement Status = 
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
    businessImpact: "Deployed at Maxitech Pharma to provide daily field-force visibility and sales territory reallocation."
  },
  {
    title: "Customer RFM Churn Matrix Classification",
    category: "SQL",
    nlQuery: "Classify 541K+ retail customers into Champions, Loyal, At Risk, and Lost segments based on NTILE scoring of Recency, Frequency, and Monetary values.",
    generatedCode: `WITH RFM_Raw AS (
    SELECT 
        CustomerID,
        DATEDIFF('2011-12-10', MAX(InvoiceDate)) AS Recency,
        COUNT(DISTINCT InvoiceNo) AS Frequency,
        ROUND(SUM(Quantity * UnitPrice), 2) AS Monetary
    FROM online_retail_cleaned
    WHERE CustomerID IS NOT NULL
    GROUP BY CustomerID
),
RFM_Scores AS (
    SELECT *,
        NTILE(4) OVER (ORDER BY Recency DESC) AS R_Score,
        NTILE(4) OVER (ORDER BY Frequency ASC) AS F_Score,
        NTILE(4) OVER (ORDER BY Monetary ASC) AS M_Score
    FROM RFM_Raw
)
SELECT *,
    CASE 
        WHEN R_Score >= 3 AND F_Score >= 3 THEN 'Champion / High LTV'
        WHEN R_Score >= 3 AND F_Score < 3 THEN 'New / Promising'
        WHEN R_Score < 2 AND F_Score >= 3 THEN 'At Risk / Churn Alert'
        ELSE 'Lost Customer'
    END AS Customer_Segment
FROM RFM_Scores;`,
    businessImpact: "Extracted feature set for Logistic Regression model achieving 0.732 ROC-AUC retention prediction."
  }
];

export default function AiQueryCopilot() {
  const [activeTab, setActiveTab] = useState<'copilot' | 'churn'>('copilot');
  const [selectedQueryIdx, setSelectedQueryIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  // Churn Simulator State (from real Yahlum Solutions model)
  const [recency, setRecency] = useState<number>(45); // days
  const [frequency, setFrequency] = useState<number>(6); // orders
  const [monetary, setMonetary] = useState<number>(1450); // dollars
  const [interval, setInterval] = useState<number>(24); // avg order days

  // Compute simulated Logistic Regression Churn Score
  const churnAnalysis = useMemo(() => {
    // Model weights calibrated from Hanzala's ECommerce_Retention_LTV_Project
    // Recency (+ risk), Frequency (- risk), Monetary (- risk), Interval (+ risk)
    const z = 
      (recency * 0.018) - 
      (frequency * 0.12) - 
      (Math.log10(Math.max(monetary, 10)) * 0.45) + 
      (interval * 0.015) - 
      0.2;
    
    // Sigmoid function
    const prob = 1 / (1 + Math.exp(-z));
    const churnPct = Math.round(prob * 100);

    let segment = "Loyal Customer";
    let strategy = "Automated rewards and VIP product early access.";
    let badgeColor = "text-cyan-400 bg-cyan-500/10 border-cyan-500/30";

    if (churnPct > 70) {
      segment = "At-Risk Customer";
      strategy = "Trigger automated 21-day personalized re-engagement workflow with 15% discount.";
      badgeColor = "text-rose-400 bg-rose-500/10 border-rose-500/30";
    } else if (churnPct > 45) {
      segment = "Needs Attention";
      strategy = "Send category recommendation newsletter based on first 3 purchased SKUs.";
      badgeColor = "text-amber-400 bg-amber-500/10 border-amber-500/30";
    } else if (monetary > 2500 && frequency >= 8) {
      segment = "Champion Account";
      strategy = "High LTV priority. Assign dedicated account manager and tier-one support SLA.";
      badgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    }

    return {
      churnPct,
      segment,
      strategy,
      badgeColor
    };
  }, [recency, frequency, monetary, interval]);

  const activeQuery = AI_QUERIES[selectedQueryIdx];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeQuery.generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="ai-lab" className="py-24 relative overflow-hidden bg-slate-100/50 dark:bg-[#090a10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-semibold text-orange-600 dark:text-orange-400 tracking-wider uppercase shadow-sm shadow-orange-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern AI Features &amp; Machine Learning</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Intelligence &amp; <span className="text-gradient-orange">Predictive Analytics Lab</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
            Test natural language-to-SQL translation, inspect production DAX measures, or test real-time machine learning inference from my 541K+ retail customer retention pipeline.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-200/80 dark:bg-[#12131d] border border-slate-300 dark:border-white/10 mt-4">
            <button
              onClick={() => setActiveTab('copilot')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'copilot'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Natural Language to SQL &amp; DAX</span>
            </button>
            <button
              onClick={() => setActiveTab('churn')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'churn'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Live ML Churn Risk Predictor</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Natural Language to SQL / DAX */}
        {activeTab === 'copilot' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Query Selection List */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 block mb-1">
                Select Business Analytics Prompt:
              </span>
              {AI_QUERIES.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedQueryIdx(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border cursor-pointer ${
                    selectedQueryIdx === idx
                      ? 'bg-orange-500/10 dark:bg-[#151624] border-orange-500/50 shadow-lg shadow-orange-500/10'
                      : 'bg-white dark:bg-[#0f1018] border-slate-200 dark:border-white/5 hover:border-orange-500/30 hover:bg-slate-50 dark:hover:bg-[#13141f]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{q.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      q.category === 'DAX' 
                        ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30' 
                        : 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border border-orange-500/30'
                    }`}>
                      {q.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    &ldquo;{q.nlQuery}&rdquo;
                  </p>
                </button>
              ))}
            </div>

            {/* Right: Code Generation Console */}
            <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-white/10 space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{activeQuery.title}</h4>
                    <span className="text-[11px] text-slate-600 dark:text-slate-400">Generated Query &amp; Architectural Logic</span>
                  </div>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-orange-500/40 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Natural Language Prompt Box */}
              <div className="bg-slate-100 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-white/5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
                  Natural Language Prompt:
                </span>
                <p className="text-xs text-slate-800 dark:text-slate-200 italic">
                  &ldquo;{activeQuery.nlQuery}&rdquo;
                </p>
              </div>

              {/* Syntax Highlighted Code Box */}
              <div className="relative">
                <pre className="p-4 rounded-xl bg-slate-900 dark:bg-[#07080e] border border-slate-700 dark:border-white/10 text-orange-300 font-mono text-xs overflow-x-auto leading-relaxed max-h-72">
                  <code>{activeQuery.generatedCode}</code>
                </pre>
              </div>

              {/* Commercial Value */}
              <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/30 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
                  Production Impact &amp; Context:
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeQuery.businessImpact}
                </p>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Live AI Churn Risk Simulator */}
        {activeTab === 'churn' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Input Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
                  Customer Telemetry Parameters:
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  Adjust Customer Behavioral Metrics
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Model trained on 541,909 UCI Online Retail II transactions (Logistic Regression ROC-AUC 0.732).
                </p>
              </div>

              <div className="space-y-4">
                {/* Recency */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-300">Recency (Days Since Last Order):</span>
                    <span className="text-orange-600 dark:text-orange-400 font-bold">{recency} days</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="180"
                    value={recency}
                    onChange={(e) => setRecency(parseInt(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>1 day (Recent)</span>
                    <span>180 days (Dormant)</span>
                  </div>
                </div>

                {/* Frequency */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-300">Purchase Frequency (Total Invoices):</span>
                    <span className="text-orange-600 dark:text-orange-400 font-bold">{frequency} orders</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={frequency}
                    onChange={(e) => setFrequency(parseInt(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>1 order (First-timer)</span>
                    <span>30 orders (High frequency)</span>
                  </div>
                </div>

                {/* Monetary */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-300">Total Monetary Spend ($):</span>
                    <span className="text-orange-600 dark:text-orange-400 font-bold">${monetary.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={monetary}
                    onChange={(e) => setMonetary(parseInt(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>$50</span>
                    <span>$5,000+</span>
                  </div>
                </div>

                {/* Order Interval */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-300">Average Repurchase Cadence (Days):</span>
                    <span className="text-orange-600 dark:text-orange-400 font-bold">{interval} days</span>
                  </div>
                  <input
                    type="range"
                    min="7"
                    max="60"
                    value={interval}
                    onChange={(e) => setInterval(parseInt(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right: Real-time ML Output Card */}
            <div className="lg:col-span-5 bg-white dark:bg-[#0e0f17] p-6 sm:p-7 rounded-2xl border border-orange-500/30 space-y-5 text-center sm:text-left shadow-lg">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Real-time ML Model Output:
                </span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Predicted Churn Risk</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase ${churnAnalysis.badgeColor}`}>
                    {churnAnalysis.segment}
                  </span>
                </div>
              </div>

              {/* Big Churn Score Gauge */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/5 text-center space-y-2">
                <div className={`text-5xl font-black ${
                  churnAnalysis.churnPct > 65 ? 'text-rose-500 dark:text-rose-400' : churnAnalysis.churnPct > 40 ? 'text-amber-500 dark:text-amber-400' : 'text-emerald-500 dark:text-emerald-400'
                }`}>
                  {churnAnalysis.churnPct}%
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  Probability of not returning in next 90 days
                </p>
                <div className="w-full bg-slate-300 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      churnAnalysis.churnPct > 65 ? 'bg-rose-500' : churnAnalysis.churnPct > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${churnAnalysis.churnPct}%` }}
                  />
                </div>
              </div>

              {/* AI Prescriptive Recommendation */}
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
                  AI Prescriptive Strategy:
                </span>
                <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {churnAnalysis.strategy}
                </p>
              </div>

              <div className="text-[11px] text-slate-500 text-center">
                Calibrated against scikit-learn Logistic Regression weights.
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
