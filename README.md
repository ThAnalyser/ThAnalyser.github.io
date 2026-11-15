# Hanzala Raja — Premium Data Analyst Portfolio Website

> **"Turning Data Into Insights. Insights Into Impact."**  
> Complete production-quality personal portfolio website for **Hanzala Raja** (Sales & Data Analyst).

---

## 🌟 Overview & Highlights

This portfolio represents an elite standard for data analytics portfolios:
- **Design System:** Deep Navy / Midnight Blue (`#070b14` / `#0d1527`), soft purple and cyan accents, selective glassmorphism, responsive data grids, and a Dark/Light mode toggle.
- **Real-World Experience:** Highlighting daily sales reporting, DSM/RSM performance tracking, territorial analytics (district, regional, city-wise), and automated Power Query ETL at **Maxitech Pharma (Pvt.) Ltd.**, alongside experience at **Aptech**, **Yahlum Solutions**, **Prodigy InfoTech**, and **Deloitte via Forage**.
- **Verified Credentials:** Official credentials with working verification links for **Google Data Analytics**, **Microsoft PL-300 Power BI Data Analyst Associate**, **Microsoft Excel Associate**, **UC Davis SQL for Data Science**, **IBM Data Analysis with Python**, and **Deloitte Job Simulation**.
- **Authentic Project Case Studies:** In-depth case studies for:
  - *UK Restaurant Sales Performance Intelligence* (774K+ transactions across 4 UK sites, YoY growth, DAX time intelligence)
  - *E-Commerce Customer Retention & Churn Prediction* (541K+ UCI records, RFM segmentation, ML churn ROC-AUC 0.732, cohort retention matrix)
  - *Global Tech Layoffs Exploratory SQL Data Warehouse* (CTEs, window functions, staging architecture)
  - *Noon Call Center Operational MIS* (5,000 calls, 18.92% unanswered call gap discovery)
  - *AI Dermatologist* (Deep Learning CNN on 10,015 HAM10000 skin lesion images with Streamlit interface)
  - *Tailwind Traders BI*, *Vrinda Store Sales Analytics*, *USDA Agricultural SQL Project*, and *Real-Time E-Commerce KPI Scorecard*.
- **Interactive Analytics Showcase:** A live, fully functional business dashboard demonstrating target-vs-actual variance tracking, quarterly filters, category slicers, DSM/RSM quota tracking, interactive SVG charts, top products ledger, and CSV export.
- **Direct Resume Download:** The verified 1-page resume PDF is embedded at `/public/Hanzala_Raja_Resume.pdf` and directly downloadable.
- **Functional Contact Form:** Client-side input validation, feedback status, direct mailto dispatch, and one-click copy for `hanzala.analyst@gmail.com`.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack, Static Generation)
- **Library:** [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/) + Custom SVG Brand Vectors
- **Telemetry:** Custom Interactive SVG Analytics Engine

---

## 📂 Project Structure

```text
hanzala-portfolio/
├── public/
│   ├── assets/                     # Real analytical chart outputs & artifacts
│   │   ├── cohort_heatmap.png      # E-Commerce 12-month cohort retention matrix
│   │   ├── roc_curves.png          # Churn model ROC curves (Logistic Reg vs XGBoost)
│   │   ├── feature_importance.png  # ML retention drivers
│   │   ├── rfm_distributions.png   # RFM distributions
│   │   ├── confusion_matrix_lr.png # Logistic Regression confusion matrix
│   │   └── skin_training_history.png # HAM10000 CNN training history
│   ├── Hanzala_Raja_Resume.pdf     # Verified 1-page PDF Resume
│   └── favicon.svg                 # Custom SVG Data Icon
├── src/
│   ├── app/
│   │   ├── globals.css             # Glassmorphism, CSS variables & data grid patterns
│   │   ├── layout.tsx              # SEO Metadata, OpenGraph, Twitter Cards, Schema
│   │   ├── not-found.tsx           # Custom 404 Analytics Page
│   │   └── page.tsx                # Main Portfolio Page
│   ├── components/
│   │   ├── Navbar.tsx              # Sticky header, section spy, theme toggle, resume CTA
│   │   ├── Hero.tsx                # Interactive telemetry cockpit, value prop, badges
│   │   ├── About.tsx               # Academic degree, analytical philosophy, 4 pillars
│   │   ├── Experience.tsx          # Interactive career timeline & Maxitech Pharma focus
│   │   ├── Skills.tsx              # 6 categorized skill sections with qualitative levels
│   │   ├── Projects.tsx            # Filterable project gallery with keyword search
│   │   ├── ProjectModal.tsx        # 10-point expandable case study modal with code snippets
│   │   ├── AnalyticsShowcase.tsx   # Live interactive commercial sales control center
│   │   ├── Certifications.tsx      # Verified credentials with direct verify links
│   │   ├── Contact.tsx             # Functional contact form & copyable channels
│   │   ├── Footer.tsx              # Bottom bar, quick links & back-to-top button
│   │   └── SocialIcons.tsx         # Clean SVG LinkedIn & GitHub brand icons
│   ├── context/
│   │   └── ThemeContext.tsx        # Dark/Light theme manager with localStorage persistence
│   └── data/
│       └── portfolioData.ts        # Centralized data model (easy to update!)
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or newer; v20.12+ recommended)
- npm or pnpm or yarn

### 1. Clone or Open Directory
```bash
cd C:\Users\dell\.gemini\antigravity\scratch\hanzala-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🌐 Deployment Instructions

### Deploying to Vercel (Recommended)
Vercel is the native platform for Next.js and provides instant deployment with zero configuration.

#### Option A: Using the Vercel Web Dashboard
1. Push this repository to your GitHub account (`https://github.com/ThAnalyser/portfolio` or similar).
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **"Add New Project"** and import your repository.
4. Next.js will be detected automatically. Leave the build settings as default:
   - **Framework Preset:** `Next.js`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
5. Click **"Deploy"**. Your website will be live with free SSL in less than 2 minutes!

#### Option B: Using the Vercel CLI
```bash
npm i -g vercel
vercel
```
Follow the interactive prompts to deploy.

---

### Deploying to Netlify
1. Push this project to GitHub.
2. Sign in to [netlify.com](https://netlify.com).
3. Click **"Add new site"** → **"Import an existing project"**.
4. Select GitHub and choose your repository.
5. Set the build settings:
   - **Build Command:** `npm run build`
   - **Publish directory:** `.next`
6. Click **"Deploy Site"**.

---

## ✏️ How to Update Your Portfolio Content

All your data is cleanly separated from UI components in a single, well-structured TypeScript file:
📍 `src/data/portfolioData.ts`

- **Update Resume:** Replace `/public/Hanzala_Raja_Resume.pdf` with your new PDF file.
- **Add or Edit Projects:** Add a new object to the `PROJECTS` array in `portfolioData.ts` with problem, dataset, tools, insights, and GitHub link.
- **Update Work Experience:** Edit the `EXPERIENCES` array in `portfolioData.ts`.
- **Add Certifications:** Add an entry to the `CERTIFICATIONS` array in `portfolioData.ts`.
- **Update Skills:** Modify the `SKILL_CATEGORIES` list in `portfolioData.ts`.
- **Update Live Showcase Data:** Modify `SHOWCASE_DATA` in `portfolioData.ts`.

---

## 👤 Author
**Hanzala Raja**  
- **Email:** [hanzala.analyst@gmail.com](mailto:hanzala.analyst@gmail.com)  
- **LinkedIn:** [linkedin.com/in/hanzalaraja](https://www.linkedin.com/in/hanzalaraja/)  
- **GitHub:** [github.com/ThAnalyser](https://github.com/ThAnalyser)  
- **Location:** Karachi, Pakistan
