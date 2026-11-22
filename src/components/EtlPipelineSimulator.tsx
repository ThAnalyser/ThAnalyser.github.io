'use client';

import React, { useState } from 'react';
import { 
  GitBranch, 
  Play, 
  RotateCcw, 
  Database, 
  FileCheck, 
  Layers, 
  HardDrive, 
  PieChart, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  Code2, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  Activity
} from 'lucide-react';

interface EtlStage {
  id: number;
  name: string;
  shortName: string;
  icon: any;
  inputRows: string;
  outputRows: string;
  quarantined: string;
  latency: string;
  status: 'COMPLETED' | 'STANDBY' | 'PROCESSING';
  description: string;
  rules: string[];
  codeSnippet: string;
  codeLang: string;
  sampleInput: string;
  sampleOutput: string;
}

const ETL_STAGES: EtlStage[] = [
  {
    id: 1,
    name: '1. Multi-Source Raw Ingestion',
    shortName: 'Raw Ingestion',
    icon: Database,
    inputRows: '774,210 rows',
    outputRows: '774,210 rows',
    quarantined: '0 (Raw Ingest)',
    latency: '340ms',
    status: 'COMPLETED',
    description: 'Consolidates multi-source transactional data from legacy POS systems, ERP databases, flat CSVs, and Excel sales spreadsheets into an isolated staging buffer.',
    rules: [
      'Ingest daily delta transaction dumps via secure SFTP and API webhooks',
      'Preserve raw payload timestamp and source system identifier metadata',
      'Enforce atomic ingestion with rollback capability upon network fault'
    ],
    codeSnippet: `# Python Ingestion Orchestrator
import pandas as pd
import glob

raw_pos_files = glob.glob('s3://lake-raw/pos_transactions_*.csv')
df_raw = pd.concat([pd.read_csv(f) for f in raw_pos_files], ignore_index=True)
print(f"Ingested {len(df_raw)} raw transaction records.")`,
    codeLang: 'python',
    sampleInput: `{"tx_id":"TX9941","date":"01/10/2023","amt":"$45.00","loc":"Site 2"}`,
    sampleOutput: `{"tx_id":"TX9941","date":"01/10/2023","amt":"$45.00","loc":"Site 2","ingested_at":"2023-10-01T23:59:00Z"}`
  },
  {
    id: 2,
    name: '2. Schema Extraction & Validation',
    shortName: 'Validation',
    icon: FileCheck,
    inputRows: '774,210 rows',
    outputRows: '770,120 rows',
    quarantined: '4,090 bad rows',
    latency: '215ms',
    status: 'COMPLETED',
    description: 'Validates strict column types, mandatory foreign keys, null thresholds, and isolates corrupt records into a dedicated dead-letter quarantine table.',
    rules: [
      'Verify Transaction ID conforms to standard regex pattern ^TX[0-9]{4,}$',
      'Filter out transactions with null timestamp or negative unit price',
      'Redirect schema mismatch exceptions to error_quarantine_log table'
    ],
    codeSnippet: `-- SQL Schema Validation & Quarantine
INSERT INTO error_quarantine_log
SELECT * FROM stg_raw_transactions
WHERE transaction_id IS NULL 
   OR unit_price <= 0
   OR transaction_date NOT REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}$';`,
    codeLang: 'sql',
    sampleInput: `{"tx_id":null,"date":"invalid_date","amt":"-12.00"}`,
    sampleOutput: `QUARANTINED -> error_quarantine_log: Reason='Null Primary Key & Negative Price'`
  },
  {
    id: 3,
    name: '3. Data Cleaning & Deduplication',
    shortName: 'Deduplication',
    icon: GitBranch,
    inputRows: '770,120 rows',
    outputRows: '768,450 rows',
    quarantined: '1,670 duplicates',
    latency: '185ms',
    status: 'COMPLETED',
    description: 'Executes window functions and string normalization in Power Query and SQL to strip duplicate records, normalize city names, and standardize dates to ISO 8601.',
    rules: [
      'Partition by (transaction_id, date, amount) to eliminate exact duplicate syncs',
      'Normalize city spelling variances ("Karachi", "KHI", "Karachi Central" -> "Karachi Central")',
      'Parse date formats to standard ISO 8601 YYYY-MM-DD'
    ],
    codeSnippet: `// Power Query M Cleaning Transformation
let
    Source = Staged_Orders,
    RemovedDuplicates = Table.Distinct(Source, {"transaction_id"}),
    StandardizedDates = Table.TransformColumnTypes(RemovedDuplicates, {{"date", type date}}),
    TrimmedText = Table.TransformColumns(StandardizedDates, {{"location", Text.Trim, type text}})
in
    TrimmedText`,
    codeLang: 'powerquery',
    sampleInput: `{"tx_id":"TX9941","loc":"  Karachi  ","date":"10/01/2023"}`,
    sampleOutput: `{"tx_id":"TX9941","loc":"Karachi Central","date":"2023-10-01"}`
  },
  {
    id: 4,
    name: '4. Dimensional Modeling (Star Schema)',
    shortName: 'Star Schema',
    icon: Layers,
    inputRows: '768,450 rows',
    outputRows: 'Fact_Sales (768K) + 4 Dims',
    quarantined: '0',
    latency: '410ms',
    status: 'COMPLETED',
    description: 'Transforms normalized tables into an enterprise Star Schema: Fact_Sales surrounded by Dim_Calendar (4-4-5 offsets), Dim_Product, Dim_Territory, and Dim_Promotion.',
    rules: [
      'Generate integer surrogate keys (DateKey, ProductKey, TerritoryKey)',
      'Construct 4-4-5 Financial Calendar mapping to eliminate leap-year retail skew',
      'Enforce 1-to-many relationship constraints with single-direction filtering'
    ],
    codeSnippet: `-- Dimensional Transformation (Fact Table Generation)
INSERT INTO Fact_Sales (DateKey, ProductKey, TerritoryKey, Quantity, Revenue, Margin)
SELECT 
    d.DateKey, p.ProductKey, t.TerritoryKey, 
    s.Quantity, (s.Quantity * s.UnitPrice) AS Revenue,
    ((s.UnitPrice - p.CostPrice) * s.Quantity) AS Margin
FROM clean_staged_sales s
JOIN Dim_Date d ON s.OrderDate = d.FullDate
JOIN Dim_Product p ON s.SKU = p.SKU
JOIN Dim_Territory t ON s.District = t.District;`,
    codeLang: 'sql',
    sampleInput: `{"tx_id":"TX9941","sku":"MED-104","qty":10,"unit_price":25}`,
    sampleOutput: `Fact_Sales: {DateKey:20231001, ProductKey:482, TerritoryKey:12, GrossSales:250.00}`
  },
  {
    id: 5,
    name: '5. Analytical Staging Warehouse',
    shortName: 'Data Warehouse',
    icon: HardDrive,
    inputRows: '768,450 rows',
    outputRows: 'Materialized Views Ready',
    quarantined: '0',
    latency: '150ms',
    status: 'COMPLETED',
    description: 'Loads validated dimensional tables into high-performance analytical views in PostgreSQL / MySQL with clustered indexes on primary DateKey and TerritoryKey columns.',
    rules: [
      'Maintain clustered columnstore indexing on DateKey for rapid time intelligence',
      'Create pre-aggregated monthly territory summary views for executive queries',
      'Configure automated CDC (Change Data Capture) incremental sync'
    ],
    codeSnippet: `-- Analytical Materialized Summary View
CREATE OR REPLACE VIEW vw_Territory_Monthly_KPIs AS
SELECT 
    t.RegionName, t.District, d.Year, d.Month,
    SUM(f.Revenue) AS TotalRevenue,
    SUM(f.Margin) AS TotalMargin,
    DIVIDE(SUM(f.Revenue), NULLIF(SUM(t.MonthlyTargetQuota), 0)) AS TargetAttainment
FROM Fact_Sales f
JOIN Dim_Territory t ON f.TerritoryKey = t.TerritoryKey
JOIN Dim_Date d ON f.DateKey = d.DateKey
GROUP BY t.RegionName, t.District, d.Year, d.Month;`,
    codeLang: 'sql',
    sampleInput: `SELECT COUNT(*) FROM Fact_Sales;`,
    sampleOutput: `768,450 validated rows indexed. Materialized views compiled.`
  },
  {
    id: 6,
    name: '6. Power BI Enterprise Semantic Model',
    shortName: 'Power BI Model',
    icon: PieChart,
    inputRows: '768,450 rows',
    outputRows: 'Enterprise Model Published',
    quarantined: '0',
    latency: '95ms',
    status: 'COMPLETED',
    description: 'Imports star schema into Power BI Service with 30+ custom DAX time-intelligence measures, Row-Level Security (RLS) for DSMs, and automated 6:00 AM daily refresh.',
    rules: [
      'Deploy custom DAX measures for YoY %, SamePeriodLastYear, and Variance',
      'Apply dynamic Row-Level Security (RLS) filtering territory view by DSM user login',
      'Schedule automated incremental data gateway refreshes with email alert on failure'
    ],
    codeSnippet: `// Power BI Core Executive DAX Measure
Territory Achievement % = 
VAR ActualRevenue = [Total Gross Sales]
VAR TargetQuota = [Territory Target Quota]
VAR AttainmentRatio = DIVIDE(ActualRevenue, TargetQuota, 0)
RETURN
SWITCH(
    TRUE(),
    AttainmentRatio >= 1.05, "Surpassed Target (+5%)",
    AttainmentRatio >= 0.98, "On Track (98-104%)",
    "Performance Gap Identified (<98%)"
)`,
    codeLang: 'dax',
    sampleInput: `Power BI Dataset Refresh Request: Source 'PostgreSQL_DW'`,
    sampleOutput: `Semantic model refreshed successfully. 25+ executive dashboards updated.`
  }
];

export default function EtlPipelineSimulator() {
  const [selectedStageId, setSelectedStageId] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(1);
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] ETL Architecture Initialized. 6 Stages Healthy.',
    '[MONITOR] Staging Database (PostgreSQL) Status: ONLINE.',
    '[READY] Click "Simulate Live Pipeline Run" to trace transactional data packets.'
  ]);

  const activeStage = ETL_STAGES.find(s => s.id === selectedStageId) || ETL_STAGES[0];

  const handleSimulateRun = () => {
    setIsSimulating(true);
    setSimulationStep(1);
    setSelectedStageId(1);
    setLogs([
      `[00:00.100] Pipeline Run triggered for 774,210 raw transactional records...`,
      `[00:00.340] Stage 1 (Raw Ingestion): Ingested multi-source POS and ERP feeds.`,
    ]);

    const stepInterval = setInterval(() => {
      setSimulationStep((prev) => {
        const nextStep = prev + 1;
        if (nextStep <= 6) {
          setSelectedStageId(nextStep);
          setLogs(current => [
            ...current,
            `[00:0${nextStep}.120] Stage ${nextStep} (${ETL_STAGES[nextStep - 1].shortName}): Processed. Output: ${ETL_STAGES[nextStep - 1].outputRows}. Latency: ${ETL_STAGES[nextStep - 1].latency}.`
          ]);
          return nextStep;
        } else {
          clearInterval(stepInterval);
          setIsSimulating(false);
          setLogs(current => [
            ...current,
            `[00:06.850] [SUCCESS] End-to-end ETL run complete! 768,450 rows loaded into Power BI semantic model with 0 downtime.`
          ]);
          return 6;
        }
      });
    }, 900);
  };

  return (
    <section id="etl-pipeline" className="relative py-24 bg-[var(--bg-secondary)] overflow-hidden tech-grid-pattern">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] radial-glow-cyan pointer-events-none opacity-15 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] radial-glow-orange pointer-events-none opacity-15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-600 dark:text-cyan-400 shadow-sm shadow-cyan-500/10">
            <GitBranch className="w-3.5 h-3.5 text-cyan-500" />
            <span>Production Architecture Simulator</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Interactive ETL <span className="text-gradient-cyan">Pipeline Engine</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            Trace the end-to-end journey of 774K+ dirty records through raw ingestion, schema quarantining, deduplication, star-schema dimensional modeling, and Power BI semantic publication.
          </p>

          <div className="pt-2">
            <button
              onClick={handleSimulateRun}
              disabled={isSimulating}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/35 disabled:opacity-50 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? `Simulating Stage ${simulationStep} of 6...` : 'Simulate Live Pipeline Run ⚡'}</span>
            </button>
          </div>
        </div>

        {/* 6-Stage Interactive Stepper Diagram */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {ETL_STAGES.map((stage) => {
            const Icon = stage.icon;
            const isSelected = selectedStageId === stage.id;
            const isCurrentSim = isSimulating && simulationStep === stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[140px] ${
                  isSelected
                    ? 'glass-panel border-cyan-500 shadow-lg shadow-cyan-500/15 bg-cyan-500/10'
                    : 'glass-panel hover:border-slate-400 dark:hover:border-white/20'
                } ${isCurrentSim ? 'ring-2 ring-cyan-400 animate-pulse' : ''}`}
              >
                {/* Active Indicator Top Bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
                )}

                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-cyan-500 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">
                    0{stage.id}
                  </span>
                </div>

                <div className="space-y-0.5 mt-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {stage.shortName}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono truncate">
                    {stage.outputRows}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-white/5 text-[10px]">
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>OK</span>
                  </span>
                  <span className="text-slate-400 font-mono">
                    {stage.latency}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Stage Telemetry & Business Rules */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-xl space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md">
                  Active Inspection Target
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {activeStage.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-bold">
                  <Activity className="w-3 h-3" />
                  <span>Healthy</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeStage.description}
            </p>

            {/* Stage Telemetry Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Input Records</span>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 font-mono">
                  {activeStage.inputRows}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Output Records</span>
                <div className="text-sm font-bold text-cyan-600 dark:text-cyan-400 mt-0.5 font-mono">
                  {activeStage.outputRows}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Quarantine / Skew</span>
                <div className="text-sm font-bold text-amber-500 mt-0.5 font-mono">
                  {activeStage.quarantined}
                </div>
              </div>
            </div>

            {/* Architecture Governance Rules */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                <span>Governance &amp; Transformation Rules:</span>
              </span>
              <ul className="space-y-1.5">
                {activeStage.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sample Before/After Record */}
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/10 text-xs font-mono">
              <span className="font-sans font-bold text-slate-800 dark:text-slate-200 text-xs block">
                Sample Record Transformation:
              </span>
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-black/40 text-slate-600 dark:text-slate-400 text-[11px] truncate">
                <strong className="text-slate-900 dark:text-white">IN:</strong> {activeStage.sampleInput}
              </div>
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 text-[11px] truncate">
                <strong className="text-cyan-900 dark:text-cyan-100">OUT:</strong> {activeStage.sampleOutput}
              </div>
            </div>

          </div>

          {/* Right: Code Implementation & Live Execution Logs */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Code Snippet Box */}
            <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl">
              <div className="flex items-center justify-between p-3.5 border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/40">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-500" />
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                    Production {activeStage.codeLang.toUpperCase()} Implementation
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  {activeStage.codeLang}
                </span>
              </div>
              <div className="p-4 bg-slate-950 text-slate-200 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[220px]">
                <pre>{activeStage.codeSnippet}</pre>
              </div>
            </div>

            {/* Live Terminal Log Console */}
            <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl">
              <div className="flex items-center justify-between p-3.5 border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/40">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                    Telemetry Console Log
                  </span>
                </div>
                <span className="text-[10px] text-emerald-500 font-mono font-semibold">
                  LIVE STREAM
                </span>
              </div>
              <div className="p-4 bg-slate-950 text-emerald-400 font-mono text-[11px] space-y-1 max-h-[160px] overflow-y-auto">
                {logs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
