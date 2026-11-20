export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Power BI' | 'SQL' | 'Python' | 'Excel' | 'Machine Learning' | 'Business Intelligence';
  tags: string[];
  featured: boolean;
  highlightMetric: string;
  highlightLabel: string;
  businessProblem: string;
  objective: string;
  datasetOverview: string;
  dataCleaning: string[];
  methodology: string[];
  toolsUsed: string[];
  keyInsights: string[];
  recommendations: string[];
  finalOutcome: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  image?: string;
  gallery?: string[];
  sqlSnippet?: string;
  daxSnippet?: string;
  pythonSnippet?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  type: string;
  current: boolean;
  summary: string;
  bullets: string[];
  technologies: string[];
  kpis: { label: string; value: string }[];
}

export interface SkillCategory {
  category: string;
  description: string;
  icon: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Proficient' | 'Developing';
    description: string;
    badge?: string;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  badgeType: 'Microsoft' | 'Google' | 'Coursera' | 'Deloitte' | 'IBM' | 'Other';
  description: string;
  skillsGained: string[];
}

export const PERSONAL_INFO = {
  name: "Hanzala Raja",
  fullName: "Raja Hanzala Muavia",
  avatarUrl: "/assets/hanzala_portrait.jpg",
  cutoutUrl: "/assets/hanzala_cutout.png",
  title: "Sales & Data Analyst",
  headline: "Turning Data Into Insights. Insights Into Impact.",
  bio: "I'm a Data Analyst passionate about transforming complex datasets into meaningful business insights through data analysis, visualization, and problem-solving.",
  fullBio: "Detail-oriented Sales and Data Analyst with hands-on experience consolidating multi-source sales data, building Power BI dashboards, monitoring sales targets vs actuals, tracking DSM and RSM performance, and analysing sales by region, district, city, and product. Skilled in Advanced Excel (advanced formulas, XLOOKUP, conditional formatting, Power Query) for structured reporting, data cleaning, and validation. Experienced delivering daily, monthly, and quarterly performance reports to management and sales teams.",
  location: "Karachi, Pakistan",
  email: "hanzala.analyst@gmail.com",
  linkedin: "https://www.linkedin.com/in/hanzalaraja/",
  github: "https://github.com/ThAnalyser",
  availability: "Available for Data Analyst & BI Roles",
  education: {
    degree: "BS Computer Science – Data Science & Analytics Specialization",
    institution: "Sindh Madarsatul Islam University (SMIU)",
    location: "Karachi, Pakistan",
    gradDate: "January 2026",
    details: "Specialized in Data Analytics, Database Management, Machine Learning Algorithms, Statistical Inference, and Business Intelligence."
  },
  stats: [
    { label: "Transactions & Records Analyzed", value: "1.3M+" },
    { label: "Production BI & Excel Dashboards", value: "25+" },
    { label: "Reporting Turnaround Reduction", value: "40%" },
    { label: "Industry Certifications", value: "7" }
  ]
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "maxitech",
    company: "Maxitech Pharma (Pvt.) Ltd.",
    role: "Sales Analyst | Marketing Support Officer",
    location: "Karachi, Pakistan",
    period: "Nov 2026 – Present",
    type: "Full-Time",
    current: true,
    summary: "Leading sales intelligence, multi-source data consolidation, and executive reporting across regional pharmaceutical distribution channels.",
    bullets: [
      "Consolidate daily sales data from multiple enterprise sources and prepare daily, monthly, and quarterly performance reports — build and maintain Power BI dashboards giving management clear visibility into sales KPIs, territory performance, and achievement trends.",
      "Monitor sales targets vs actual achievements, calculate achievement percentages, identify performance gaps, and track DSM (District Sales Manager) and RSM (Regional Sales Manager) performance against targets.",
      "Analyse pharmaceutical sales by region, district, city, product category, and territory to surface concrete revenue improvement opportunities.",
      "Develop Excel-based sales reports using advanced formulas, XLOOKUP, dynamic conditional formatting, and Pivot Tables — perform rigorous data cleaning, validation, and reconciliation to ensure 100% reporting consistency across all management outputs.",
      "Automate Power Query data extraction pipelines to replace manual spreadsheets, reducing multi-hour data collation workflows to scheduled refreshes."
    ],
    technologies: ["Power BI", "Advanced Excel", "DAX", "Power Query", "Sales Reporting", "KPI Tracking", "Reconciliation"],
    kpis: [
      { label: "Sales Data Consolidations", value: "Daily / Monthly / Quarterly" },
      { label: "Hierarchy Covered", value: "Region, District, City, Product" },
      { label: "Focus", value: "Target vs Actual & DSM/RSM Tracking" }
    ]
  },
  {
    id: "aptech",
    company: "Aptech",
    role: "Data Analyst | Reporting",
    location: "Karachi, Pakistan",
    period: "2026",
    type: "Contract / Project",
    current: false,
    summary: "Designed and implemented automated operational KPI tracking systems and management MIS reports.",
    bullets: [
      "Built interactive Power BI dashboards and structured Excel MIS reports for operational KPI tracking across institutional metrics.",
      "Authored custom DAX measures for time intelligence, performance ratios, and variance analysis.",
      "Automated Power Query ETL pipelines to ingest dirty multi-source spreadsheets with validated accuracy and zero data loss.",
      "Prepared structured executive decks and performance summaries delivered directly to operational leadership."
    ],
    technologies: ["Power BI", "Excel MIS", "DAX", "Power Query", "ETL Pipelines", "Data Validation"],
    kpis: [
      { label: "Reporting Model", value: "Star Schema" },
      { label: "Data Quality", value: "100% Validated" }
    ]
  },
  {
    id: "yahlum",
    company: "Yahlum Solutions",
    role: "Data Analyst Intern",
    location: "Remote",
    period: "2026 (4 Months)",
    type: "Internship",
    current: false,
    summary: "Delivered client BI engagements, end-to-end e-commerce retention modeling, and call center performance analytics.",
    bullets: [
      "Built production-ready Power BI dashboards with advanced DAX measures and dimensional star-schema data models for client BI engagements.",
      "Consolidated multi-source transaction data, monitored operational KPIs, and produced structured performance reports with trend analysis and anomaly detection.",
      "Architected the E-Commerce Customer Retention & LTV Optimization project analyzing 541K+ UCI Online Retail II transactions with MySQL, scikit-learn (ROC-AUC 0.732), and interactive Streamlit application.",
      "Analyzed Noon Call Center performance across 5,000 incoming calls, uncovering an 18.92% unanswered call gap and delivering actionable staffing optimization recommendations."
    ],
    technologies: ["Power BI", "DAX", "MySQL", "Python (scikit-learn)", "Streamlit", "Advanced Excel"],
    kpis: [
      { label: "Transactions Analyzed", value: "541K+" },
      { label: "ML Churn ROC-AUC", value: "0.732" }
    ]
  },
  {
    id: "prodigy",
    company: "Prodigy InfoTech",
    role: "Data Analyst Intern",
    location: "Remote",
    period: "Nov 2024 – Jan 2025",
    type: "Internship",
    current: false,
    summary: "Engineered automated sales and marketing analytics reporting workflows for external clients.",
    bullets: [
      "Built Excel MIS reports and Power BI dashboards for sales and marketing analytics clients.",
      "Applied Pivot Tables, Power Query, XLOOKUP, and conditional formatting, reducing routine reporting turnaround by 40%.",
      "Conducted exploratory data analysis on customer acquisition and marketing spend across diverse campaign channels."
    ],
    technologies: ["Microsoft Excel", "Power Query", "Power BI", "Pivot Tables", "XLOOKUP"],
    kpis: [
      { label: "Turnaround Reduction", value: "40%" },
      { label: "Client Domains", value: "Sales & Marketing" }
    ]
  },
  {
    id: "deloitte",
    company: "Deloitte (via Forage)",
    role: "Data Analytics Simulation Participant",
    location: "Virtual / Global",
    period: "June 2026",
    type: "Simulation",
    current: false,
    summary: "Practical forensic data analysis, operational data auditing, and executive dashboard development.",
    bullets: [
      "Analyzed global operational datasets and built Tableau performance KPI dashboards tracking operations across 4 international sites.",
      "Validated 500+ records with 100% accuracy through forensic technology auditing and reconciliation procedures.",
      "Formulated strategic management decks featuring actionable recommendations for risk mitigation and workflow optimization."
    ],
    technologies: ["Tableau", "Forensic Analytics", "Data Auditing", "Executive Presentation", "KPI Dashboards"],
    kpis: [
      { label: "Records Audited", value: "500+" },
      { label: "Accuracy Rate", value: "100%" }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Data Analysis & Business Intelligence",
    description: "Transforming ambiguous transactional and operational data into quantifiable executive insights.",
    icon: "BarChart3",
    skills: [
      { name: "Exploratory Data Analysis (EDA)", level: "Advanced", description: "Detecting anomalies, distribution skews, patterns, and correlations across large datasets." },
      { name: "Target vs Actual Tracking", level: "Advanced", description: "Variance analysis, achievement percentage computation, and performance gap tracking." },
      { name: "DSM & RSM Sales Analytics", level: "Advanced", description: "Evaluating district and regional sales managers against territorial quotas and volume targets." },
      { name: "Data Cleaning & Transformation", level: "Advanced", description: "Resolving inconsistent schemas, null imputation, duplicate deduplication, and standardization." },
      { name: "Statistical Analysis & KPIs", level: "Proficient", description: "Descriptive statistics, hypothesis testing, churn rates, AOV, and customer retention metrics." }
    ]
  },
  {
    category: "Data Visualization & Power BI",
    description: "Architecting interactive executive dashboards with star schemas, custom DAX, and drill-through paths.",
    icon: "PieChart",
    skills: [
      { name: "Power BI Desktop & Service", level: "Advanced", description: "Enterprise dashboard development, scheduled data refreshes, and role-based access.", badge: "PL-300" },
      { name: "DAX Measures & Time Intelligence", level: "Advanced", description: "CALCULATE, FILTER, DATEADD, SAMEPERIODLASTYEAR, RUNNINGSUM, and complex aggregations." },
      { name: "Star-Schema Data Modeling", level: "Advanced", description: "Fact-dimension modeling, 1-to-many relationships, bi-directional filter control, and surrogate keys." },
      { name: "Executive KPI Scorecards", level: "Advanced", description: "Designing clean visual cards with trend indicators, target variances, and conditional alerts." },
      { name: "Drill-Through & Tooltips", level: "Advanced", description: "Building interactive hierarchy exploration from high-level country down to individual city/SKU." }
    ]
  },
  {
    category: "Databases & SQL Querying",
    description: "Extracting, aggregating, and modeling large datasets across SQL Server, MySQL, and PostgreSQL.",
    icon: "Database",
    skills: [
      { name: "SQL (Server / MySQL / PostgreSQL)", level: "Advanced", description: "Query writing, index awareness, staging architecture, and relational data manipulation.", badge: "UC Davis Certified" },
      { name: "Window Functions", level: "Advanced", description: "ROW_NUMBER(), RANK(), DENSE_RANK(), LEAD(), LAG(), and cumulative rolling partitions." },
      { name: "CTEs & Subqueries", level: "Advanced", description: "Structuring modular, maintainable, multi-step data pipelines for analytical aggregation." },
      { name: "Complex Joins & Aggregations", level: "Advanced", description: "Multi-table inner, left, cross joins with GROUP BY, HAVING, and conditional SUM/CASE." },
      { name: "Data Cleaning via SQL", level: "Advanced", description: "Creating staging tables, sanitizing strings, parsing dates, and stripping corrupted records." }
    ]
  },
  {
    category: "Microsoft Excel (Advanced)",
    description: "High-speed business reporting, dynamic formula architecture, and automated Power Query ETL.",
    icon: "FileSpreadsheet",
    skills: [
      { name: "Power Query (M Language)", level: "Advanced", description: "Automating data ingestion, unpivoting columns, merging queries, and daily pipeline refresh." },
      { name: "Pivot Tables & Pivot Charts", level: "Advanced", description: "Multi-dimensional summaries, calculated fields, slicers, and interactive dashboard layouts." },
      { name: "Advanced Formulas & Lookups", level: "Advanced", description: "XLOOKUP, INDEX/MATCH, dynamic arrays (FILTER, UNIQUE, SORT), nested IFS, SUMIFS.", badge: "MOS Associate" },
      { name: "Conditional Formatting & Rules", level: "Advanced", description: "Dynamic color scales, target attainment indicators, and alert thresholds." },
      { name: "Data Validation & Reconciliation", level: "Advanced", description: "Audit frameworks, cross-sheet reconciliation checks, and formula-driven input restrictions." }
    ]
  },
  {
    category: "Python & Machine Learning",
    description: "Automating analytical pipelines, exploratory analysis, and predictive retention modeling.",
    icon: "Code2",
    skills: [
      { name: "Pandas & NumPy", level: "Advanced", description: "Vectorized data manipulation, multi-index aggregation, datetime handling, and dataset merging." },
      { name: "Machine Learning (scikit-learn)", level: "Proficient", description: "Logistic Regression, XGBoost, decision trees, confusion matrices, and ROC-AUC evaluation." },
      { name: "Streamlit App Development", level: "Advanced", description: "Building responsive analytical web applications, interactive sliders, and live model inferencing." },
      { name: "Data Visualization (Seaborn / Plotly)", level: "Proficient", description: "Heatmaps, distribution KDEs, correlation matrices, and custom publication-quality charts." },
      { name: "Deep Learning (Keras/TensorFlow)", level: "Developing", description: "Convolutional Neural Networks (CNNs) for image classification on the HAM10000 dataset." }
    ]
  },
  {
    category: "Data Engineering & Architecture",
    description: "Reliable data ingestion, star-schema schemas, and scheduled reporting pipelines.",
    icon: "Layers",
    skills: [
      { name: "ETL Pipeline Design", level: "Advanced", description: "Extracting from multiple sources, transforming in Power Query/Python, and loading to BI models." },
      { name: "Data Modeling & Normalization", level: "Advanced", description: "Star schema, snowflake schema, fact tables, dimension tables, and cardinalities." },
      { name: "Automated Reporting Refreshes", level: "Proficient", description: "Configuring scheduled dataset refreshes and data gateway synchronization." },
      { name: "Data Quality & Reconciliation", level: "Advanced", description: "Establishing multi-source validation checkpoints to prevent discrepancies between ledger & MIS." }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "google-da",
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google (via Coursera)",
    date: "October 2025",
    credentialId: "500VZ4S86G2M",
    credentialUrl: "https://coursera.org/verify/500VZ4S86G2M",
    badgeType: "Google",
    description: "Rigorous 8-course professional program covering data foundations, exploratory data analysis, data cleaning with SQL, visualization with Tableau, and R programming.",
    skillsGained: ["SQL", "Data Cleaning", "Tableau", "R Programming", "Data Storytelling", "Statistical Thinking"]
  },
  {
    id: "pl-300",
    title: "Microsoft PL-300: Power BI Data Analyst Associate",
    issuer: "Microsoft",
    date: "2026",
    badgeType: "Microsoft",
    description: "Comprehensive validation of enterprise Power BI skills: data ingestion, cleaning with Power Query, star-schema modeling, advanced DAX measures, and workspace governance.",
    skillsGained: ["DAX", "Star Schema", "Power BI Service", "Row-Level Security", "Drill-Through", "KPI Cards"]
  },
  {
    id: "excel-assoc",
    title: "Microsoft Office Specialist: Excel Associate",
    issuer: "Microsoft",
    date: "2024",
    badgeType: "Microsoft",
    description: "Certified proficiency in Microsoft Excel: workbook management, dynamic formula writing (XLOOKUP, INDEX-MATCH), pivot tables, data validation, and conditional reporting.",
    skillsGained: ["XLOOKUP", "Pivot Tables", "Power Query", "Data Validation", "Dynamic Arrays", "Conditional Formatting"]
  },
  {
    id: "uc-davis-sql",
    title: "SQL for Data Science",
    issuer: "University of California, Davis (via Coursera)",
    date: "August 2025",
    credentialId: "NSXTHUJU8DEB",
    credentialUrl: "https://coursera.org/verify/NSXTHUJU8DEB",
    badgeType: "Coursera",
    description: "Advanced SQL querying course covering relational database principles, complex filtering, multi-table joins, subqueries, and analytical aggregations for business problem-solving.",
    skillsGained: ["Complex Joins", "Subqueries", "Aggregations", "Data Modeling", "SQL Query Optimization"]
  },
  {
    id: "ibm-python",
    title: "Data Analysis with Python",
    issuer: "IBM (via Coursera)",
    date: "October 2024",
    credentialId: "8TP4P1WV6KX4",
    credentialUrl: "https://coursera.org/verify/8TP4P1WV6KX4",
    badgeType: "IBM",
    description: "Hands-on analysis using Python: data wrangling with Pandas and NumPy, exploratory analysis, linear regression modeling, and statistical visualization.",
    skillsGained: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-Learn"]
  },
  {
    id: "deloitte-forage",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (via Forage)",
    date: "June 2026",
    credentialId: "69e60521451622bc36b1d300",
    badgeType: "Deloitte",
    description: "Completed forensic technology analysis, data auditing, and executive dashboard development across 4 global operating sites with 100% data audit accuracy.",
    skillsGained: ["Forensic Data Auditing", "Tableau", "Operational KPIs", "Executive Reporting", "Risk Modeling"]
  },
  {
    id: "biz-excel",
    title: "Business Analytics with Excel",
    issuer: "Simplilearn / Educational Partner",
    date: "August 2024",
    credentialId: "7321953",
    badgeType: "Other",
    description: "Applied business analytics using Excel: statistical distributions, pivot dashboards, financial scenario analysis, and executive KPI reporting.",
    skillsGained: ["Business Analytics", "Scenario Modeling", "Executive MIS", "Statistical Summary"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "restaurant-sales-insights",
    title: "UK Restaurant Sales Performance Intelligence",
    subtitle: "Enterprise Power BI dashboard analyzing 774K+ transactions across 4 UK locations with YoY financial intelligence.",
    category: "Power BI",
    tags: ["Power BI", "DAX", "Power Query", "Python ETL", "Sales Intelligence"],
    featured: true,
    highlightMetric: "774K+",
    highlightLabel: "Transactions Consolidated",
    businessProblem: "A multi-unit UK restaurant group operating 4 flagship sites struggled with disconnected POS databases, preventing leadership from identifying whether sales growth was driven by genuine ticket volume or aggressive discounting that eroded food margins.",
    objective: "Consolidate 774,000+ granular order transactions into an end-to-end Power BI sales analytics system with custom DAX time intelligence, menu cannibalization metrics, and location-level profit visibility.",
    datasetOverview: "774K+ transactional records spanning multi-year operations across 4 UK sites, covering timestamped item orders, menu categories, gross revenue, discount codes, table turnover, and financial calendar weeks.",
    dataCleaning: [
      "Engineered automated ETL pipeline using Python and Power Query to clean disparate POS extracts.",
      "Handled missing item categories, unlinked modifier records, and refunded bills.",
      "Constructed a standardized 4-4-5 Financial Calendar table to eliminate leap-year and day-of-week calendar distortion.",
      "Normalized discount voucher codes and mapped them to specific marketing promotional campaigns."
    ],
    methodology: [
      "Designed a dimensional Star Schema data model: Fact_Orders linked to Dim_Calendar, Dim_Menu, Dim_Location, and Dim_Promotion.",
      "Authored 30+ custom DAX measures including YoY Sales %, Same-Store Growth, Running Sales, and Discount Impact Ratio.",
      "Implemented dynamic drill-through allowing leadership to navigate from executive multi-site KPIs down to individual menu items and hourly rush windows.",
      "Configured visual alert thresholds identifying underperforming meal periods and locations falling behind target."
    ],
    toolsUsed: ["Power BI Desktop", "Advanced DAX", "Power Query M", "Python", "Star-Schema Modeling"],
    keyInsights: [
      "Aggressive weekend promotional discounting accounted for 18.4% of total discount volume but yielded only a 3.2% net margin expansion.",
      "Site 2 exhibited 24% higher weekday lunch traffic than Site 3, but suffered from 14% longer table dwell times due to menu complexity.",
      "Top 12% of menu items generated 61% of total gross profit, revealing major menu bloat in secondary appetizer categories."
    ],
    recommendations: [
      "Restructure discount promotions to cap voucher usage on peak Friday-Saturday nights and redirect incentives to low-traffic Tuesday afternoons.",
      "Rationalize bottom 15 underperforming menu items to reduce prep overhead and speed up table turnover.",
      "Implement real-time weekly location target scorecards for site general managers."
    ],
    finalOutcome: "Delivered a single source of truth for restaurant leadership, reducing monthly financial reporting time from 4 days to instant automated refresh and identifying an estimated 5.8% margin optimization path.",
    githubUrl: "https://github.com/ThAnalyser/Restaurant-Sales-Insights",
    daxSnippet: `YoY Sales Growth % = 
VAR CurrentSales = [Total Gross Sales]
VAR PreviousYearSales = CALCULATE([Total Gross Sales], SAMEPERIODLASTYEAR('Dim_Calendar'[Date]))
RETURN
DIVIDE(CurrentSales - PreviousYearSales, PreviousYearSales, 0)`
  },
  {
    id: "ecommerce-retention-ltv",
    title: "E-Commerce Customer Retention & Churn Prediction",
    subtitle: "End-to-end SQL, Machine Learning (ROC-AUC 0.732), and interactive Streamlit retention platform on 541K+ orders.",
    category: "Machine Learning",
    tags: ["Python", "scikit-learn", "XGBoost", "MySQL", "Streamlit", "RFM Segmentation"],
    featured: true,
    highlightMetric: "0.732",
    highlightLabel: "ROC-AUC Prediction Score",
    businessProblem: "An online retail brand suffered from a 22% spike in Customer Acquisition Cost (CAC) alongside a 14% collapse in 90-day repeat purchase rates. Management had no systematic mechanism to identify churn risks before customers went silent.",
    objective: "Build an end-to-end data analytics and predictive machine learning pipeline: extract and sanitize 541K+ transactions using SQL, segment users via RFM methodology, calculate 12-month cohort retention, and train an interpretable churn prediction model.",
    datasetOverview: "UCI Online Retail II dataset containing 541,909 raw transactions between December 2009 and December 2010 for a UK-based e-commerce gift retailer.",
    dataCleaning: [
      "Wrote modular MySQL cleaning queries removing null CustomerIDs, cancelled invoices (prefixed with 'C'), and negative quantities.",
      "Enforced a strict time-split between feature extraction window and holdout observation window to prevent target leakage.",
      "Engineered Recency, Frequency, Monetary (RFM) metrics, average order interval, and product diversity indexes.",
      "Standardized unit price outliers and filtered out non-commercial inventory adjustments."
    ],
    methodology: [
      "SQL RFM Segmentation: partitioned customer base into Champions, Loyal Customers, At Risk, and Lost segments.",
      "Constructed a 12-month Cohort Retention Matrix tracking month-over-month customer retention decay curves.",
      "Trained and evaluated Logistic Regression and XGBoost classifiers; selected Logistic Regression (ROC-AUC 0.732) for superior interpretability and calibrated probability scores.",
      "Built and deployed an interactive Streamlit application with live customer search, real-time risk scoring, and interactive RFM scatter charts."
    ],
    toolsUsed: ["Python 3.12", "scikit-learn", "XGBoost", "MySQL 8.0", "Streamlit", "Pandas", "Plotly"],
    keyInsights: [
      "Over 68% of first-time buyers never made a second purchase within 180 days, pinpointing post-purchase onboarding as the primary churn bottleneck.",
      "Customers purchasing at least 3 distinct product categories in their first 30 days had a 3.4x higher Lifetime Value than single-category buyers.",
      "Recency and purchase cadence were the two highest feature importance predictors in identifying at-risk accounts."
    ],
    recommendations: [
      "Trigger automated re-engagement workflows at day 21 for buyers who have not returned, offering personalized category recommendations.",
      "Launch a VIP loyalty tier for 'Champions' (top 8% of customers who generate 42% of revenue) to protect high-LTV accounts.",
      "Incorporate live churn risk scoring into the customer support CRM to proactively flag high-value inquiries."
    ],
    finalOutcome: "Delivered a fully functional retention platform enabling retention teams to query any customer ID and retrieve instant churn probability with clear driving factors.",
    githubUrl: "https://github.com/ThAnalyser/ECommerce_Retention_LTV_Project",
    image: "/assets/cohort_heatmap.png",
    gallery: [
      "/assets/cohort_heatmap.png",
      "/assets/roc_curves.png",
      "/assets/rfm_distributions.png",
      "/assets/feature_importance.png",
      "/assets/confusion_matrix_lr.png"
    ],
    pythonSnippet: `from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score

model = LogisticRegression(max_iter=1000, class_weight='balanced')
model.fit(X_train, y_train)
y_pred_proba = model.predict_proba(X_test)[:, 1]
print(f"Test ROC-AUC: {roc_auc_score(y_test, y_pred_proba):.4f}")`
  },
  {
    id: "world-layoffs-sql",
    title: "Global Tech Layoffs Exploratory SQL Data Warehouse",
    subtitle: "Complex SQL pipeline with CTEs, window functions, and staging architecture analyzing worldwide tech downsizing trends.",
    category: "SQL",
    tags: ["SQL", "MySQL", "CTEs", "Window Functions", "Data Cleaning"],
    featured: true,
    highlightMetric: "100%",
    highlightLabel: "SQL Pipeline Automation",
    businessProblem: "Unstructured, duplicate-ridden datasets of tech workforce reductions made it impossible to analyze macroeconomic trends, sector vulnerabilities, and post-funding burn rates.",
    objective: "Design and implement a multi-stage SQL architecture to sanitize dirty global layoff records, deduplicate records with window functions, standardize company identities, and extract sector vulnerability insights.",
    datasetOverview: "Worldwide tech layoffs records from 2020 through 2023, capturing company name, industry, total laid off, percentage laid off, date, stage, country, and funds raised in millions.",
    dataCleaning: [
      "Created isolated staging tables (`layoffs_staging`) to preserve raw data integrity.",
      "Employed `ROW_NUMBER() OVER (PARTITION BY company, location, industry, total_laid_off, date)` to isolate and remove duplicate rows.",
      "Standardized text inconsistencies (e.g. unifying variations of 'Crypto', 'Cryptocurrency' and 'Crypto Currency').",
      "Handled nulls and blank industry fields by executing self-joins matching records of the same company."
    ],
    methodology: [
      "Leveraged Common Table Expressions (CTEs) to calculate rolling 12-month totals of laid off employees by country.",
      "Applied `DENSE_RANK() OVER (PARTITION BY years ORDER BY total_laid_off DESC)` to determine top 5 companies downsizing per calendar year.",
      "Correlated layoff severity with funding stage (Seed vs Series A-D vs Post-IPO) to assess capitalization vulnerability."
    ],
    toolsUsed: ["MySQL 8.0", "Window Functions", "CTEs", "Self-Joins", "Data Staging"],
    keyInsights: [
      "Post-IPO and late-stage funded companies accounted for over 64% of all total tech workforce reductions.",
      "Consumer and Retail industries experienced the highest initial vulnerability, followed by Transportation and Real Estate.",
      "Rolling total analysis revealed three distinct waves corresponding to interest rate hikes."
    ],
    recommendations: [
      "Early-stage venture teams should maintain at least 24 months of runway during macroeconomic tightening.",
      "Workforce planning models should incorporate sector-specific sensitivity indexes rather than macro headcount averages."
    ],
    finalOutcome: "Produced a clean, reusable SQL repository of staging scripts, exploratory queries, and automated views that can ingest future layoff announcements seamlessly.",
    githubUrl: "https://github.com/ThAnalyser/World-Layoffs-SQL-Project",
    sqlSnippet: `WITH Company_Year (company, years, total_laid_off) AS (
    SELECT company, YEAR(\`date\`), SUM(total_laid_off)
    FROM layoffs_staging2
    GROUP BY company, YEAR(\`date\`)
),
Company_Year_Rank AS (
    SELECT *, DENSE_RANK() OVER (PARTITION BY years ORDER BY total_laid_off DESC) AS Ranking
    FROM Company_Year
    WHERE years IS NOT NULL
)
SELECT * FROM Company_Year_Rank WHERE Ranking <= 5;`
  },
  {
    id: "noon-call-center-analytics",
    title: "Noon Call Center Operational MIS & Performance Dashboard",
    subtitle: "Excel & Power BI performance analysis of 5,000 inbound calls uncovering an 18.92% unanswered call gap and agent SLAs.",
    category: "Excel",
    tags: ["Advanced Excel", "Pivot Tables", "Power BI", "KPI Architecture", "Operations MIS"],
    featured: true,
    highlightMetric: "18.92%",
    highlightLabel: "Unanswered Call Gap Uncovered",
    businessProblem: "Noon customer service operations faced customer satisfaction (CSAT) dips and customer frustration without clear visibility into call abandonment rates, peak hour bottlenecks, or agent-level SLA compliance.",
    objective: "Analyze 5,000 customer call records using advanced Excel pivot architectures, dynamic formulas, and Power BI visual scorecards to diagnose service bottlenecks and optimize staffing allocations.",
    datasetOverview: "5,000 operational call logs spanning Q1, tracking Call ID, Agent Name, Date & Time, Issue Topic (Streaming, Technical Support, Payment, Admin, Contract), Answered status, Resolved status, Speed of Answer in seconds, and CSAT rating.",
    dataCleaning: [
      "Sanitized speed of answer and call duration formats from text strings to numeric seconds.",
      "Structured validation rules to separate unanswered calls from zero-duration completed inquiries.",
      "Engineered helper columns for Hour of Day, Day of Week, and SLA breach indicators (>60s wait time)."
    ],
    methodology: [
      "Constructed multi-dimensional Pivot Tables analyzing call volume by topic, month, and agent.",
      "Built dynamic KPI cards monitoring Total Calls (5,000), Answered (4,054), Unanswered (946), Resolution Rate, and Average Speed of Answer.",
      "Segmented workload across all 5 operational topics to assess demand distribution (Streaming: 1,022, Tech: 1,019, Payments: 1,007, Admin: 976, Contract: 976).",
      "Evaluated agent resolution efficiency vs CSAT scores to distinguish between fast agents and effective problem-solvers."
    ],
    toolsUsed: ["Microsoft Excel", "Pivot Tables & Charts", "Power Query", "Power BI", "XLOOKUP", "Conditional Formatting"],
    keyInsights: [
      "18.92% of incoming calls (946 out of 5,000) went unanswered, representing the single largest operational leak in customer experience.",
      "January experienced peak volume (1,772 calls), dropping 9% in February (1,616) and stabilizing in March (1,612).",
      "Customer demand was remarkably evenly distributed across all 5 issue topics, confirming that no single department was overburdened, pointing instead to general shift understaffing during peak hours."
    ],
    recommendations: [
      "Implement dynamic shift scheduling with flexible part-time queues during peak hours (10 AM - 2 PM) to reduce the 18.92% unanswered rate to below 5%.",
      "Establish an automated IVR callback option for callers holding longer than 45 seconds to preserve CSAT without adding headcount.",
      "Pair top-resolving agents with underperforming team members for structured coaching on first-contact resolution."
    ],
    finalOutcome: "Delivered a structured management dashboard and executive insights document enabling leadership to identify workforce gaps and improve customer response times.",
    githubUrl: "https://github.com/ThAnalyser/Call-Centre-Dashboard-Excel"
  },
  {
    id: "tailwind-traders-bi",
    title: "Tailwind Traders Enterprise Power BI Architecture",
    subtitle: "Star-schema dimensional modeling, DAX time intelligence, and automated Power BI Service alerting for enterprise retail.",
    category: "Power BI",
    tags: ["Power BI", "DAX", "Star Schema", "Power BI Service", "Alerting"],
    featured: false,
    highlightMetric: "25+",
    highlightLabel: "DAX Measures Developed",
    businessProblem: "Tailwind Traders leadership required a unified analytics platform to monitor multi-category retail performance, inventory turnover, and sales targets across multiple geographic regions.",
    objective: "Build an end-to-end Power BI report following Microsoft best practices: ingest and shape data with Power Query, architect a star-schema model, write advanced DAX metrics, and configure automated threshold alerts in Power BI Service.",
    datasetOverview: "Enterprise retail dataset covering customer orders, product catalogs, distribution centers, sales territories, and historical sales targets.",
    dataCleaning: [
      "Created structured date tables with fiscal year offsets.",
      "Established star-schema relationships with 1-to-many cardinality and single direction filtering.",
      "Optimized data types and stripped unused columns to maximize VertiPaq engine compression."
    ],
    methodology: [
      "Wrote complex DAX calculations for YoY Variance, MTD/QTD/YTD Sales, and Dynamic Ranking.",
      "Designed an intuitive executive UI with dark/light visual contrast, custom tooltip cards, and bookmark-driven page navigation.",
      "Configured data-driven alerts in Power BI Service notifying territory managers when sales fell below 90% of quota."
    ],
    toolsUsed: ["Power BI Desktop", "Power BI Service", "DAX Studio", "Power Query", "Excel"],
    keyInsights: [
      "Online sales channel outperformed physical stores in revenue growth but suffered 2.1x higher return rates on apparel items.",
      "Three specific regional warehouses consistently triggered inventory stockouts during mid-quarter promotional spikes."
    ],
    recommendations: [
      "Reallocate buffer stock to regional fulfillment hubs before major promotional campaigns.",
      "Introduce virtual sizing guides on digital storefronts to reduce high return velocity."
    ],
    finalOutcome: "Enabled enterprise leadership to monitor global retail performance in real time with automated alerting and drill-through diagnostics.",
    githubUrl: "https://github.com/ThAnalyser/tailwind-traders-powerbi-report"
  },
  {
    id: "ai-skin-lesion-dermatology",
    title: "AI Dermatologist — HAM10000 Skin Lesion Deep Learning",
    subtitle: "Convolutional Neural Network (CNN) trained on 10,000+ dermatoscopic images with an interactive Streamlit diagnostic interface.",
    category: "Machine Learning",
    tags: ["Python", "TensorFlow", "Keras", "Streamlit", "Computer Vision", "Healthcare AI"],
    featured: true,
    highlightMetric: "10,015",
    highlightLabel: "Dermatoscopic Images Trained",
    businessProblem: "Dermatological malignancies, particularly melanoma, require early detection for favorable clinical outcomes; however, access to specialized dermatoscopy equipment and certified dermatologists is severely constrained in underserved communities.",
    objective: "Develop a computer vision classification system utilizing deep convolutional networks trained on the benchmark HAM10000 dataset, deployed into a user-friendly Streamlit web application for real-time lesion analysis.",
    datasetOverview: "HAM10000 ('Human Against Machine with 10,000 training images') clinical dataset containing 10,015 dermatoscopic images across 7 diagnostic categories: Actinic keratoses, Basal cell carcinoma, Benign keratosis, Dermatofibroma, Melanocytic nevi, Melanoma, and Vascular lesions.",
    dataCleaning: [
      "Parsed patient metadata (age, sex, anatomical lesion location) and resolved missing demographic fields.",
      "Applied image normalization, resizing to uniform dimensions (224x224), and one-hot label encoding.",
      "Implemented dynamic data augmentation (rotation, zoom, horizontal/vertical flips) to balance severe class disparities across rare diagnoses."
    ],
    methodology: [
      "Constructed a deep Convolutional Neural Network (CNN) architecture with batch normalization, dropout regularization, and softmax activation.",
      "Trained using categorical cross-entropy loss and Adam optimizer with learning rate decay schedules.",
      "Evaluated model performance using precision, recall, confusion matrix breakdown, and training history loss/accuracy trajectories.",
      "Built a production Streamlit web application allowing clinicians or users to upload lesion photos and view instant diagnostic probabilities."
    ],
    toolsUsed: ["Python 3.12", "TensorFlow / Keras", "OpenCV", "Streamlit", "NumPy", "PIL", "Joblib"],
    keyInsights: [
      "Data augmentation improved classification recall on minority malignant classes (such as Basal Cell Carcinoma) by over 19%.",
      "Model achieved high discriminatory power between benign melanocytic nevi and high-risk melanoma lesions."
    ],
    recommendations: [
      "Deploy the system as an assistive pre-screening triage tool in primary care clinics rather than an autonomous diagnostic device.",
      "Incorporate multi-modal tabular patient metadata (age, lesion location, evolution history) to augment visual prediction accuracy."
    ],
    finalOutcome: "Engineered a working end-to-end medical AI diagnostic prototype with an accessible web UI that provides instantaneous lesion assessment and class probability distribution.",
    image: "/assets/skin_training_history.png"
  },
  {
    id: "vrinda-store-sales",
    title: "Vrinda Store E-Commerce Analytics",
    subtitle: "Interactive Excel analytics system evaluating 31,000+ orders across India, uncovering sales channel and demographic drivers.",
    category: "Excel",
    tags: ["Microsoft Excel", "Pivot Tables", "Retail Analytics", "Customer Segmentation"],
    featured: false,
    highlightMetric: "31K+",
    highlightLabel: "Orders Analyzed",
    businessProblem: "An Indian multi-channel retail brand selling across Amazon, Flipkart, Myntra, and Meesho needed to understand which customer demographics and channels were delivering the most profitable order volume.",
    objective: "Audit and clean 31,000+ transaction rows in Excel, segment sales by channel, gender, age bracket, and state, and deliver an interactive dashboard with actionable growth recommendations.",
    datasetOverview: "31K+ retail order rows covering Order ID, Customer ID, Gender, Age, Date, Status, Channel, Category, Size, Quantity, Currency, Amount, and Delivery State/City.",
    dataCleaning: [
      "Standardized gender categorizations and cleaned irregular string variations.",
      "Created age group buckets (Adult, Senior, Teenager) using nested IF formulas.",
      "Filtered out cancelled and refunded transactions to compute true fulfilled revenue."
    ],
    methodology: [
      "Developed interactive Pivot Tables and dynamic linked charts with slicers for Channel, Category, and Month.",
      "Calculated channel-wise contribution margins and regional demand densities across top Indian states.",
      "Evaluated order status ratios to identify delivery failure rates across specific logistics partners."
    ],
    toolsUsed: ["Microsoft Excel", "Pivot Tables", "Advanced Formulas", "Conditional Formatting", "MIS Design"],
    keyInsights: [
      "Women shoppers accounted for approximately 65% of total purchasing volume, with the Adult age group (30-49) being the dominant revenue driver.",
      "Amazon, Flipkart, and Myntra collectively drove over 80% of fulfilled sales, whereas direct channels underperformed.",
      "Maharashtra, Karnataka, and Uttar Pradesh contributed over 35% of total national order volume."
    ],
    recommendations: [
      "Focus digital marketing campaigns specifically on women aged 30-49 residing in top 5 metropolitan regions.",
      "Negotiate tier-one fulfillment SLAs on Amazon and Flipkart to mitigate logistics delivery failures."
    ],
    finalOutcome: "Equipped retail leadership with an intuitive one-page Excel dashboard that simplified strategic channel and inventory planning.",
    githubUrl: "https://github.com/ThAnalyser/vrinda-store-sales-analytics"
  },
  {
    id: "ecommerce-kpi-dashboard",
    title: "Real-Time E-Commerce KPI Executive Dashboard",
    subtitle: "Executive scorecard tracking $649K in revenue, 2,400 orders, and operational efficiency across 13-week rolling trends.",
    category: "Business Intelligence",
    tags: ["Power BI", "Excel", "KPI Scorecards", "Operational Analytics"],
    featured: false,
    highlightMetric: "$649K",
    highlightLabel: "Revenue Tracked",
    businessProblem: "Executive team lacked a unified weekly scorecard reconciling revenue, order fulfillment velocity, delivery speed, and customer ratings.",
    objective: "Design a high-impact executive KPI dashboard tracking $649K in sales across 2,400 orders with 13-week trend analysis and operational efficiency metrics.",
    datasetOverview: "Multi-channel retail operations dataset tracking 2,400 fulfilled orders, delivery transit times, customer satisfaction stars (4.0 avg), and channel margins.",
    dataCleaning: [
      "Engineered automated rolling 13-week date logic.",
      "Calculated delivery transit intervals from warehouse dispatch to customer doorstep.",
      "Harmonized customer rating scales and identified negative review correlations."
    ],
    methodology: [
      "Constructed 5 core executive KPI tiles: Gross Revenue, Total Orders, Average Order Value (AOV), Delivery Speed (2.3-day avg), and Customer Rating (4.0★).",
      "Implemented sparkline trend visualizers displaying week-over-week trajectory directly beneath each KPI metric."
    ],
    toolsUsed: ["Power BI", "Excel", "KPI Architecture", "Trend Forecasting"],
    keyInsights: [
      "Faster delivery (< 48 hours) correlated with a 0.6 star lift in customer review ratings.",
      "AOV increased by 14% during promotional bundling weekends."
    ],
    recommendations: [
      "Incentivize local warehouse routing to maintain the sub-2.5-day delivery benchmark.",
      "Institutionalize standard weekly KPI reviews across operations and merchandising."
    ],
    finalOutcome: "Delivered a clean, high-contrast executive scorecard utilized for weekly operating reviews.",
    githubUrl: "https://github.com/ThAnalyser/ecommerce-kpi-dashboard"
  },
  {
    id: "usda-sql-project",
    title: "USDA Agricultural Commodity SQL Production Analysis",
    subtitle: "Historical SQL analysis of United States Department of Agriculture production metrics across milk, honey, coffee, and grain.",
    category: "SQL",
    tags: ["SQL", "Data Exploration", "Time Series Aggregation", "Agricultural Analytics"],
    featured: false,
    highlightMetric: "5+",
    highlightLabel: "Decades of Data Analyzed",
    businessProblem: "Understanding long-term macroeconomic agricultural production shifts, yield fluctuations, and state-level specialization across key United States food commodities.",
    objective: "Execute comprehensive SQL data exploration on USDA public datasets covering milk, cheese, honey, yogurt, and coffee yields across states and decades.",
    datasetOverview: "USDA National Agricultural Statistics Service datasets recording multi-decade state-by-state production volumes, commodity prices, and yield rates.",
    dataCleaning: [
      "Cleaned historical null entries and standardized unit metrics (pounds vs gallons vs hundredweight).",
      "Aggregated irregular reporting cadences into standardized annual time series."
    ],
    methodology: [
      "Constructed nested SQL aggregations and state-ranking queries utilizing window functions.",
      "Calculated multi-decade Compound Annual Growth Rates (CAGR) for specialty commodities."
    ],
    toolsUsed: ["SQL", "Relational Databases", "Data Aggregation", "Time Series Analysis"],
    keyInsights: [
      "Identified clear geographic consolidation: milk production concentrated into top 5 states with over 50% market share.",
      "Honey production showed sharp historical volatility linked to climate and colony collapse phenomena."
    ],
    recommendations: [
      "Commodity supply chains should diversify sourcing beyond top two production states to hedge regional weather vulnerabilities."
    ],
    finalOutcome: "Produced a documented SQL query suite providing instant macroeconomic commodity benchmarks.",
    githubUrl: "https://github.com/ThAnalyser/usda-sql-project"
  }
];

// Interactive Showcase Data
export const SHOWCASE_DATA = {
  overview: {
    totalRevenue: 1428500,
    targetRevenue: 1370000,
    targetAchievement: 104.27,
    totalOrders: 8420,
    avgOrderValue: 169.65,
    returnRate: 2.14,
    dsmRsmVariance: 58500
  },
  monthlyTrends: [
    { month: "Jan 2026", actual: 105000, target: 100000, orders: 620, achievement: 105.0 },
    { month: "Feb 2026", actual: 112000, target: 110000, orders: 660, achievement: 101.8 },
    { month: "Mar 2026", actual: 128000, target: 120000, orders: 750, achievement: 106.7 },
    { month: "Apr 2026", actual: 118000, target: 115000, orders: 690, achievement: 102.6 },
    { month: "May 2026", actual: 134000, target: 125000, orders: 790, achievement: 107.2 },
    { month: "Jun 2026", actual: 142000, target: 135000, orders: 840, achievement: 105.2 },
    { month: "Jul 2026", actual: 130000, target: 130000, orders: 770, achievement: 100.0 },
    { month: "Aug 2026", actual: 148500, target: 140000, orders: 880, achievement: 106.1 },
    { month: "Sep 2026", actual: 156000, target: 145000, orders: 920, achievement: 107.6 },
    { month: "Oct 2026", actual: 125000, target: 125000, orders: 740, achievement: 100.0 },
    { month: "Nov 2026", actual: 130000, target: 125000, orders: 760, achievement: 104.0 }
  ],
  categoryBreakdown: [
    { category: "Pharmaceuticals (Antibiotics & Pain)", revenue: 542000, percentage: 37.9, target: 510000, achievement: 106.3 },
    { category: "Nutraceuticals & Vitamins", revenue: 385000, percentage: 27.0, target: 360000, achievement: 106.9 },
    { category: "Cardiovascular & Metabolic Care", revenue: 295500, percentage: 20.7, target: 310000, achievement: 95.3 },
    { category: "Dermatological & Topical", revenue: 206000, percentage: 14.4, target: 190000, achievement: 108.4 }
  ],
  regionalPerformance: [
    { territory: "Karachi Metro", dsm: "DSM South-A", target: 450000, actual: 482000, achievement: 107.1, status: "Surpassed" },
    { territory: "Punjab Central (Lahore)", dsm: "DSM Central-1", target: 390000, actual: 408500, achievement: 104.7, status: "Surpassed" },
    { territory: "North Zone (Islamabad/Pindi)", dsm: "DSM North", target: 280000, actual: 291000, achievement: 103.9, status: "Surpassed" },
    { territory: "Sindh Rural (Hyd/Sukkur)", dsm: "DSM South-B", target: 150000, actual: 149000, achievement: 99.3, status: "On Track" },
    { territory: "KPK & Western Corridor", dsm: "DSM West", target: 100000, actual: 98000, achievement: 98.0, status: "Gap Identified" }
  ],
  topProducts: [
    { sku: "MAX-AMOX-500", name: "Amoxicillin 500mg Caps", category: "Pharmaceuticals", units: 28400, revenue: 284000, growth: "+14.2%" },
    { sku: "MAX-VIT-C1000", name: "Maxi-C Effervescent 1000mg", category: "Nutraceuticals", units: 22100, revenue: 198900, growth: "+21.8%" },
    { sku: "MAX-PAR-650", name: "Paracetamol Extra 650mg", category: "Pharmaceuticals", units: 35000, revenue: 175000, growth: "+6.4%" },
    { sku: "MAX-OMEG-3", name: "Ultra Omega-3 Gold EPA/DHA", category: "Nutraceuticals", units: 11400, revenue: 148200, growth: "+18.5%" },
    { sku: "MAX-DERM-CLOT", name: "Dermacure Antifungal Cream", category: "Dermatological", units: 14200, revenue: 113600, growth: "+11.1%" }
  ]
};
