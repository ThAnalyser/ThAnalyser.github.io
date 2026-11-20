import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { PERSONAL_INFO } from '@/data/portfolioData';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hanzala-analyst.com'),
  title: `${PERSONAL_INFO.name} | Data Analyst Portfolio`,
  description: `Explore the personal portfolio of ${PERSONAL_INFO.name}, a professional Data Analyst specializing in SQL, Power BI, Advanced Excel, Python, sales reporting, and business intelligence.`,
  keywords: [
    'Hanzala Raja',
    'Data Analyst',
    'Sales Analyst',
    'Power BI Developer',
    'SQL Analyst',
    'Advanced Excel',
    'Karachi Data Analyst',
    'Maxitech Pharma',
    'Business Intelligence',
    'DAX',
    'Python Data Analysis',
  ],
  authors: [{ name: PERSONAL_INFO.name, url: PERSONAL_INFO.linkedin }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hanzala-analyst.com',
    title: `${PERSONAL_INFO.name} | Data Analyst Portfolio`,
    description: `Turning Data Into Insights. Insights Into Impact. Explore verified Power BI dashboards, SQL data pipelines, and sales analytics projects by ${PERSONAL_INFO.name}.`,
    siteName: `${PERSONAL_INFO.name} Portfolio`,
    images: [
      {
        url: '/assets/cohort_heatmap.png',
        width: 1200,
        height: 630,
        alt: `${PERSONAL_INFO.name} - Data Analyst Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PERSONAL_INFO.name} | Data Analyst Portfolio`,
    description: `Explore the portfolio of ${PERSONAL_INFO.name}, a Data Analyst specializing in SQL, Power BI, Excel, and Python.`,
    images: ['/assets/cohort_heatmap.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#07080b] dark:text-slate-100 selection:bg-orange-500/20 selection:text-orange-600 dark:selection:text-orange-400`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
