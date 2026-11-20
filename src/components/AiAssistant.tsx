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
  RefreshCw,
  Download,
  Activity,
  FileCode,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  links?: { label: string; href: string }[];
}

const PRESET_QUESTIONS = [
  "Explain the Skin Disease CNN model",
  "How did he track targets vs actuals at Maxitech?",
  "What is his 541K+ E-Commerce Churn model?",
  "What certifications and degree does he have?",
  "What tools and tech stack does he specialize in?"
];

export default function AiAssistant({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello! I am Hanzala Raja's verified AI Portfolio Copilot. 

I have full access to his verified resume, real GitHub code repositories, and production experience at Maxitech Pharma and Yahlum Solutions.

Ask me anything about:
• **Skin Disease Deep Learning (HAM10000)** — 10,015 images, CNN in TensorFlow/Keras & Streamlit app
• **Maxitech Pharma Sales Analytics** — Multi-tier DSM/RSM quota tracking & daily sales ETL
• **Customer Retention & Churn Prediction** — 541K+ retail transactions, ROC-AUC 0.732, RFM matrix
• **UK Restaurant Sales Intelligence** — 774K+ orders, 30+ DAX measures in Power BI
• **Technical Stack** — Power BI (PL-300), SQL (Server/MySQL), Advanced Excel, Python`,
      links: [
        { label: 'Featured Projects', href: '#projects' },
        { label: 'Interactive Dashboard', href: '#showcase' },
        { label: 'Download Resume', href: '/Hanzala_Raja_Resume.pdf' }
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
      const q = query.toLowerCase().trim();
      let reply = "";
      let links: { label: string; href: string }[] | undefined = undefined;

      // 1. Skin Disease / HAM10000 / Deep Learning / Cancer / Medical AI
      if (
        q.includes('skin') || 
        q.includes('desease') || 
        q.includes('disease') || 
        q.includes('ham10000') || 
        q.includes('lesion') || 
        q.includes('melanoma') || 
        q.includes('dermatol') || 
        q.includes('cancer') || 
        q.includes('cnn') || 
        q.includes('computer vision') ||
        q.includes('tensorflow') ||
        q.includes('keras')
      ) {
        reply = `**AI Dermatologist — HAM10000 Skin Lesion Deep Learning Project**\n\n• **Core Problem**: Early detection of dermatological malignancies (especially melanoma) is vital for patient survival, but access to specialized dermatoscopy is limited.\n• **Dataset**: The benchmark **HAM10000** ("Human Against Machine with 10,000 images") clinical dataset with **10,015 dermatoscopic images** spanning 7 diagnostic categories (Melanoma, Melanocytic Nevi, Basal Cell Carcinoma, Actinic Keratoses, Benign Keratosis, Dermatofibroma, Vascular Lesions).\n• **Architecture & Modeling**: Designed a deep **Convolutional Neural Network (CNN)** using **TensorFlow and Keras** with batch normalization, dropout regularization, and learning rate decay schedules.\n• **Class Imbalance Handling**: Applied dynamic image augmentation (rotations, zoom, flips) which boosted recall on minority malignant classes like Basal Cell Carcinoma by **19%**.\n• **Deployment**: Deployed a fully functional **Streamlit web application** that allows clinicians to upload dermatoscope images and get real-time multi-class diagnostic probabilities with visual risk indicators.`;
        links = [
          { label: 'View Case Study', href: '#projects' },
          { label: 'Explore ML Lab', href: '#ai-lab' }
        ];
      }
      // 2. Maxitech Pharma / Current Sales Analyst Experience
      else if (
        q.includes('maxitech') || 
        q.includes('pharma') || 
        q.includes('sales analyst') || 
        q.includes('dsm') || 
        q.includes('rsm') || 
        q.includes('target') || 
        q.includes('variance') || 
        q.includes('quota')
      ) {
        reply = `**Sales Analyst & Marketing Support Officer @ Maxitech Pharma (Pvt.) Ltd.**\n*(November 2026 – Present | Karachi, Pakistan)*\n\n• **Sales Data Consolidation**: Consolidates daily sales records from multiple enterprise distribution sources across regions, districts, cities, and product hierarchies.\n• **Target vs Actual Governance**: Computes precise achievement percentages and monitors field-force sales velocity, identifying early revenue gaps before month-end close.\n• **DSM & RSM Quota Evaluation**: Evaluates District Sales Managers (DSMs) and Regional Sales Managers (RSMs) against territorial volume targets and sales budgets.\n• **Executive Reporting**: Prepares daily, monthly, and quarterly MIS reports and maintains interactive Power BI scorecards for senior leadership.\n• **Pipeline Automation**: Automated Excel and Power Query extraction routines, eliminating multi-hour manual compilation tasks and guaranteeing zero discrepancy across management reporting.`;
        links = [
          { label: 'View Experience Timeline', href: '#experience' },
          { label: 'Interactive Dashboard Demo', href: '#showcase' }
        ];
      }
      // 3. E-Commerce Retention & Churn Prediction (Yahlum Solution)
      else if (
        q.includes('churn') || 
        q.includes('retention') || 
        q.includes('yahlum') || 
        q.includes('ltv') || 
        q.includes('rfm') || 
        q.includes('541') ||
        q.includes('customer') ||
        q.includes('logistic regression')
      ) {
        reply = `**E-Commerce Customer Retention & LTV Optimization (Yahlum Solutions)**\n\n• **Scale**: Analyzed **541,909 transactions** from the UCI Online Retail II dataset.\n• **SQL Sanitization**: Engineered modular MySQL queries filtering cancellations (prefixed 'C'), negative quantities, and null customer identities.\n• **RFM & Cohorts**: Partitioned customer base into Champions, Loyal, At Risk, and Lost segments; constructed a 12-month cohort retention matrix revealing that 68% of first-time buyers dropped off without repeat purchases.\n• **Predictive ML**: Trained Logistic Regression and XGBoost classifiers; selected Logistic Regression with **ROC-AUC 0.732** for explainable, calibrated risk probabilities.\n• **Streamlit Deployment**: Built a live interactive dashboard where marketing and support teams can query customer IDs to obtain real-time churn risk scores.`;
        links = [
          { label: 'View Retention Project', href: '#projects' },
          { label: 'Try Live ML Simulator', href: '#ai-lab' },
          { label: 'GitHub Repository', href: 'https://github.com/ThAnalyser/ECommerce_Retention_LTV_Project' }
        ];
      }
      // 4. UK Restaurant Sales Project (774K)
      else if (
        q.includes('restaurant') || 
        q.includes('774') || 
        q.includes('pos') || 
        q.includes('dax measure')
      ) {
        reply = `**UK Restaurant Sales Performance Intelligence**\n\n• **Scale**: Consolidated **774,000+ granular order transactions** across 4 UK restaurant locations.\n• **Star Schema Model**: Architected a dimensional model linking Fact_Orders to Dim_Calendar (4-4-5 Financial Calendar), Dim_Menu, Dim_Location, and Dim_Promotion.\n• **30+ Custom DAX Measures**: Authored advanced measures for Year-over-Year (YoY) Sales %, Same-Store Growth, Running Sales, and Ticket Size Distributions.\n• **Key Finding**: Discovered that aggressive weekend voucher discounting drove 18.4% of total discount volume but generated only 3.2% net margin expansion, prompting management to shift promotions to low-traffic weekday periods.`;
        links = [
          { label: 'View Restaurant Project', href: '#projects' },
          { label: 'GitHub Repository', href: 'https://github.com/ThAnalyser/Restaurant-Sales-Insights' }
        ];
      }
      // 5. Noon Call Center Analytics
      else if (
        q.includes('noon') || 
        q.includes('call center') || 
        q.includes('call centre') || 
        q.includes('inbound') || 
        q.includes('csat') ||
        q.includes('sla')
      ) {
        reply = `**Noon Call Center Operational MIS & Performance Dashboard**\n\n• **Dataset**: 5,000 operational call logs spanning Q1 across 5 core topics (Streaming, Technical Support, Payment, Admin, Contract).\n• **Critical Insight**: Uncovered that **18.92% of incoming calls (946 out of 5,000)** went unanswered, representing the primary driver of customer churn.\n• **Workforce Distribution**: Analyzed call arrival patterns to show demand was uniform across issue topics but heavily concentrated during 10 AM – 2 PM peak windows.\n• **Strategic Recommendation**: Designed a dynamic shift schedule and recommended automated IVR callback for queues exceeding 45 seconds to preserve CSAT without adding headcount.`;
        links = [
          { label: 'View Call Center Case Study', href: '#projects' },
          { label: 'GitHub Repository', href: 'https://github.com/ThAnalyser/Call-Centre-Dashboard-Excel' }
        ];
      }
      // 6. World Layoffs SQL Project
      else if (
        q.includes('layoff') || 
        q.includes('layoffs') || 
        q.includes('deduplicat') || 
        q.includes('staging') ||
        q.includes('window function')
      ) {
        reply = `**Global Tech Layoffs Exploratory SQL Data Warehouse**\n\n• **Data Sanitization**: Created isolated staging tables (\`layoffs_staging2\`) to protect raw record integrity.\n• **Window Functions**: Employed \`ROW_NUMBER() OVER (PARTITION BY company, location, industry, total_laid_off, date)\` to isolate and purge duplicate records.\n• **Data Imputation**: Wrote SQL self-joins to populate missing industry values by matching previous company filings.\n• **Analytical Queries**: Leveraged CTEs and \`DENSE_RANK()\` to rank top 5 downsizing companies per calendar year and compute rolling 12-month layoffs by country.`;
        links = [
          { label: 'View SQL Case Study', href: '#projects' },
          { label: 'GitHub Repository', href: 'https://github.com/ThAnalyser/World-Layoffs-SQL-Project' }
        ];
      }
      // 7. Aptech / Prodigy / Deloitte (Previous Roles & Internships)
      else if (
        q.includes('aptech') || 
        q.includes('prodigy') || 
        q.includes('deloitte') || 
        q.includes('intern') || 
        q.includes('internship') || 
        q.includes('forage')
      ) {
        reply = `**Hanzala's Previous Experience & Internships**:\n\n1. **Aptech Computer Education** *(Data Analyst | Reporting)*:\n   • Tracked student admissions, branch operations, and course completion KPIs.\n   • Automated Power Query workflows for branch performance reviews.\n\n2. **Yahlum Solutions** *(Data Analyst Intern)*:\n   • Conducted customer lifetime value and churn modeling on 541K+ e-commerce orders.\n   • Built interactive Streamlit dashboards for operational teams.\n\n3. **Prodigy InfoTech** *(Data Analyst Intern)*:\n   • Automated Excel MIS reports using Power Query and XLOOKUP, cutting reporting turnaround by **40%**.\n\n4. **Deloitte Australia (via Forage)** *(Forensic Data Analytics Simulation)*:\n   • Audited enterprise transactional databases to uncover fraudulent financial anomalies with 100% audit standard.`;
        links = [
          { label: 'View Experience Section', href: '#experience' }
        ];
      }
      // 8. Power BI & Visualization Skills
      else if (
        q.includes('power bi') || 
        q.includes('powerbi') || 
        q.includes('dax') || 
        q.includes('dashboard') || 
        q.includes('star schema') ||
        q.includes('pl-300') ||
        q.includes('pl300')
      ) {
        reply = `**Power BI & Business Intelligence Expertise**:\n\n• **Certified**: Microsoft PL-300: Power BI Data Analyst Associate.\n• **Dimensional Data Modeling**: Star schemas, snowflake schemas, 1-to-many relationships, bi-directional cross-filtering management, and surrogate keys.\n• **Advanced DAX Measures**: CALCULATE, FILTER, SAMEPERIODLASTYEAR, DATEADD, RUNNINGSUM, DIVIDE, and custom time intelligence.\n• **Executive Dashboards**: Dynamic KPI cards, target variance alerts, drill-through paths, and custom tooltips.\n• **Power BI Service**: Workspace administration, scheduled gateway refreshes, role-based security (RLS), and automated data alerts.`;
        links = [
          { label: 'Explore Power BI Skills', href: '#skills' },
          { label: 'Interactive Dashboard Demo', href: '#showcase' }
        ];
      }
      // 9. SQL & Databases
      else if (
        q.includes('sql') || 
        q.includes('mysql') || 
        q.includes('database') || 
        q.includes('query') || 
        q.includes('cte') ||
        q.includes('join')
      ) {
        reply = `**SQL & Database Engineering Expertise**:\n\n• **Dialects**: MySQL, PostgreSQL, Microsoft SQL Server.\n• **Advanced Queries**: Multi-step Common Table Expressions (CTEs), subqueries, and temporary staging tables.\n• **Window Functions**: ROW_NUMBER(), RANK(), DENSE_RANK(), LEAD(), LAG(), and cumulative running totals.\n• **Data Cleaning**: String sanitization, date normalization, null handling via self-joins, and duplicate elimination.\n• **Certified**: SQL for Data Science — UC Davis (Coursera Credential: \`NSXTHUJU8DEB\`).`;
        links = [
          { label: 'View SQL Projects', href: '#projects' },
          { label: 'Test NL-to-SQL Copilot', href: '#ai-lab' }
        ];
      }
      // 10. Excel & Power Query
      else if (
        q.includes('excel') || 
        q.includes('power query') || 
        q.includes('vlookup') || 
        q.includes('xlookup') || 
        q.includes('pivot table')
      ) {
        reply = `**Advanced Microsoft Excel Capabilities**:\n\n• **Certified**: Microsoft Office Specialist: Excel Associate.\n• **Power Query (M Code)**: Automated ingestion, column transformations, unpivoting, merging multi-sheet workbooks, and automated daily refresh.\n• **Advanced Formulas**: Dynamic arrays (FILTER, UNIQUE, SORT), XLOOKUP, INDEX/MATCH, nested SUMIFS/COUNTIFS, and logical trees.\n• **Pivot Tables & MIS**: Slicers, calculated fields, multi-dimensional cross-tabulation, and dynamic chart linking.\n• **Data Validation & Reconciliation**: Audit frameworks, cross-ledger variance checks, and error prevention rules.`;
        links = [
          { label: 'View Excel Skills', href: '#skills' },
          { label: 'Noon Excel Case Study', href: '#projects' }
        ];
      }
      // 11. Python & Machine Learning
      else if (
        q.includes('python') || 
        q.includes('pandas') || 
        q.includes('numpy') || 
        q.includes('machine learning') || 
        q.includes('ml') ||
        q.includes('scikit') ||
        q.includes('streamlit')
      ) {
        reply = `**Python & Machine Learning Stack**:\n\n• **Core Libraries**: Pandas, NumPy, Scipy for high-performance vectorized data manipulation.\n• **Predictive Modeling**: scikit-learn (Logistic Regression, Decision Trees, Random Forests, XGBoost) with ROC-AUC evaluation and confusion matrices.\n• **Deep Learning**: TensorFlow & Keras for Convolutional Neural Networks (trained on 10,015 HAM10000 images).\n• **Web App Deployment**: Streamlit for real-time inference dashboards and interactive user interfaces.\n• **Visualization**: Seaborn, Matplotlib, and Plotly for publication-quality statistical visualizations.`;
        links = [
          { label: 'Test Live ML Simulator', href: '#ai-lab' },
          { label: 'View Python Projects', href: '#projects' }
        ];
      }
      // 12. Certifications & Degree
      else if (
        q.includes('certif') || 
        q.includes('degree') || 
        q.includes('education') || 
        q.includes('smiu') || 
        q.includes('university') ||
        q.includes('google')
      ) {
        reply = `**Verified Academic Qualifications & Certifications**:\n\n• **Degree**: BS in Computer Science (Data Science & Analytics Specialization) from **Sindh Madarsatul Islam University (SMIU)**, Karachi (Graduated January 2026).\n• **Google Data Analytics Professional Certificate** (Coursera ID: \`500VZ4S86G2M\`)\n• **Microsoft PL-300: Power BI Data Analyst Associate**\n• **Microsoft Office Specialist: Excel Associate**\n• **SQL for Data Science — UC Davis** (Coursera ID: \`NSXTHUJU8DEB\`)\n• **Data Analysis with Python — IBM** (Coursera ID: \`8TP4P1WV6KX4\`)\n• **Forensic Analytics Job Simulation — Deloitte Australia** (Forage ID: \`69e60521451622bc36b1d300\`)`;
        links = [
          { label: 'Verify Credentials', href: '#certifications' }
        ];
      }
      // 13. Contact, Email, Location, Hire
      else if (
        q.includes('contact') || 
        q.includes('hire') || 
        q.includes('email') || 
        q.includes('phone') || 
        q.includes('whatsapp') || 
        q.includes('location') ||
        q.includes('salary') ||
        q.includes('available')
      ) {
        reply = `**Contact & Employment Availability**:\n\n• **Role Target**: Open to full-time Data Analyst, Sales Analyst, and Business Intelligence roles.\n• **Location**: Karachi, Pakistan (available for on-site, hybrid, or remote worldwide).\n• **Direct Email**: \`${PERSONAL_INFO.email}\`\n• **LinkedIn**: [linkedin.com/in/hanzalaraja](${PERSONAL_INFO.linkedin})\n• **GitHub**: [github.com/ThAnalyser](${PERSONAL_INFO.github})\n• **Turnaround**: All professional inquiries are answered within 24 business hours.`;
        links = [
          { label: 'Open Contact Form', href: '#contact' },
          { label: 'Download Resume (PDF)', href: '/Hanzala_Raja_Resume.pdf' }
        ];
      }
      // 14. Resume / CV Request
      else if (
        q.includes('resume') || 
        q.includes('cv') || 
        q.includes('pdf') || 
        q.includes('download')
      ) {
        reply = `You can download Hanzala's official 1-page verified resume directly as a PDF:\n\n• [Download Official Resume (PDF)](/Hanzala_Raja_Resume.pdf)\n\nIt contains his verified Maxitech Pharma experience, academic degree from SMIU, technical skill stack, and verified credential IDs.`;
        links = [
          { label: 'Download Resume (PDF)', href: '/Hanzala_Raja_Resume.pdf' },
          { label: 'View Experience Section', href: '#experience' }
        ];
      }
      // 15. Greetings & Who are you
      else if (
        q.includes('hi') || 
        q.includes('hello') || 
        q.includes('hey') || 
        q.includes('assalam') || 
        q.includes('who are you') ||
        q.includes('help')
      ) {
        reply = `Hello! I am Hanzala Raja's personal AI Portfolio Copilot.\n\nHanzala is a **Sales & Data Analyst** skilled in Power BI, Advanced Excel, SQL, and Python. He currently works at **Maxitech Pharma (Pvt.) Ltd.** managing multi-source sales consolidation and DSM/RSM quota governance.\n\nWhat would you like to explore?\n• His **10,015-image Skin Disease AI deep learning model**\n• His **Maxitech Pharma sales analytics & DSM/RSM tracking**\n• His **541K+ transaction customer churn prediction model**\n• His **verified certifications and technical toolkit**`;
        links = [
          { label: 'Explore Projects', href: '#projects' },
          { label: 'Interactive Dashboard', href: '#showcase' },
          { label: 'Verify Certifications', href: '#certifications' }
        ];
      }
      // 16. Summary & General Fallback
      else {
        reply = `Hanzala Raja is a **Sales & Data Analyst** with hands-on experience in enterprise sales consolidation, target vs actuals governance, and predictive machine learning.\n\nKey highlights:\n• **Current Role**: Sales Analyst & Marketing Support Officer at **Maxitech Pharma (Pvt.) Ltd.**\n• **Data Volume**: Handled **1.3M+ records** across retail and restaurant databases.\n• **Core Projects**: HAM10000 Skin Lesion CNN (TensorFlow/Keras), E-Commerce Customer Churn (ROC-AUC 0.732), and UK Restaurant Sales (774K+ orders in Power BI).\n• **Certifications**: Microsoft PL-300 Power BI, Excel Associate, Google Data Analytics, UC Davis SQL.\n\nWould you like more details on any of these areas?`;
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
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full sm:max-w-lg h-[85vh] sm:h-[680px] bg-white dark:bg-[#0c0d14] border border-slate-200 dark:border-orange-500/30 sm:rounded-3xl flex flex-col shadow-2xl shadow-slate-900/10 dark:shadow-orange-500/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#12131d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Hanzala AI Copilot</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">Verified knowledge from Hanzala&apos;s real projects &amp; resume</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close AI Copilot"
            className="p-2 rounded-xl glass-panel text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-orange-500/40 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preset Prompt Chips */}
        <div className="p-3 bg-slate-100/90 dark:bg-black/40 border-b border-slate-200 dark:border-white/5 overflow-x-auto flex items-center gap-2 scrollbar-none">
          <span className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400 shrink-0">Prompts:</span>
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white dark:bg-white/5 hover:bg-orange-500/15 hover:border-orange-500/40 border border-slate-300 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-300 transition-all shrink-0 cursor-pointer shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-transparent">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0 mt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white font-medium rounded-tr-none shadow-sm'
                    : 'bg-white dark:bg-[#151622] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-tl-none space-y-2 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.links && msg.links.length > 0 && (
                  <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-2">
                    {msg.links.map((lnk, lIdx) => (
                      <a
                        key={lIdx}
                        href={lnk.href}
                        onClick={onClose}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-orange-500/15 border border-orange-500/30 text-orange-700 dark:text-orange-300 hover:bg-orange-500/25 transition-all"
                      >
                        <span>{lnk.label}</span>
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 mt-1">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span>Analyzing portfolio telemetry...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#12131d]">
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
              className="flex-1 px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors shadow-sm"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white transition-all disabled:opacity-40 cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}