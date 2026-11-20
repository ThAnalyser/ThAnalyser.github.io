'use client';

import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Filter, 
  Download, 
  Layers, 
  Target, 
  DollarSign, 
  ShoppingCart, 
  MapPin, 
  AlertCircle, 
  RefreshCw, 
  Info,
  CheckCircle2,
  ChevronRight,
  PieChart as PieIcon
} from 'lucide-react';
import { SHOWCASE_DATA } from '@/data/portfolioData';

type Quarter = 'All' | 'Q1' | 'Q2' | 'Q3' | 'Q4';
type Category = 'All' | 'Pharmaceuticals' | 'Nutraceuticals' | 'Cardiovascular' | 'Dermatological';
type Territory = 'All' | 'Karachi' | 'Punjab' | 'North' | 'Sindh' | 'KPK';

export default function AnalyticsShowcase() {
  const [selectedQuarter, setSelectedQuarter] = useState<Quarter>('All');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedTerritory, setSelectedTerritory] = useState<Territory>('All');
  const [sortField, setSortField] = useState<'revenue' | 'units' | 'growth'>('revenue');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  // Compute dynamic filtered metrics
  const filteredMetrics = useMemo(() => {
    let multiplier = 1.0;
    if (selectedQuarter === 'Q1') multiplier *= 0.24;
    else if (selectedQuarter === 'Q2') multiplier *= 0.28;
    else if (selectedQuarter === 'Q3') multiplier *= 0.31;
    else if (selectedQuarter === 'Q4') multiplier *= 0.17;

    if (selectedCategory === 'Pharmaceuticals') multiplier *= 0.38;
    else if (selectedCategory === 'Nutraceuticals') multiplier *= 0.27;
    else if (selectedCategory === 'Cardiovascular') multiplier *= 0.21;
    else if (selectedCategory === 'Dermatological') multiplier *= 0.14;

    if (selectedTerritory === 'Karachi') multiplier *= 0.34;
    else if (selectedTerritory === 'Punjab') multiplier *= 0.29;
    else if (selectedTerritory === 'North') multiplier *= 0.20;
    else if (selectedTerritory === 'Sindh') multiplier *= 0.10;
    else if (selectedTerritory === 'KPK') multiplier *= 0.07;

    const baseRev = SHOWCASE_DATA.overview.totalRevenue * multiplier;
    const baseTarget = SHOWCASE_DATA.overview.targetRevenue * multiplier;
    const baseOrders = Math.round(SHOWCASE_DATA.overview.totalOrders * multiplier);
    const achievement = (baseRev / (baseTarget || 1)) * 100;
    const aov = baseOrders > 0 ? baseRev / baseOrders : 0;
    const variance = baseRev - baseTarget;

    return {
      revenue: Math.round(baseRev),
      target: Math.round(baseTarget),
      orders: baseOrders,
      achievement: achievement.toFixed(1),
      aov: aov.toFixed(2),
      variance: Math.round(variance),
    };
  }, [selectedQuarter, selectedCategory, selectedTerritory]);

  // Filtered monthly data
  const filteredMonthly = useMemo(() => {
    let list = SHOWCASE_DATA.monthlyTrends;
    if (selectedQuarter === 'Q1') list = list.slice(0, 3);
    else if (selectedQuarter === 'Q2') list = list.slice(3, 6);
    else if (selectedQuarter === 'Q3') list = list.slice(6, 9);
    else if (selectedQuarter === 'Q4') list = list.slice(9, 11);

    // Apply category & territory multiplier
    let factor = 1.0;
    if (selectedCategory !== 'All') factor *= 0.3;
    if (selectedTerritory !== 'All') factor *= 0.25;

    return list.map((m) => ({
      ...m,
      actual: Math.round(m.actual * factor),
      target: Math.round(m.target * factor),
      orders: Math.round(m.orders * factor),
    }));
  }, [selectedQuarter, selectedCategory, selectedTerritory]);

  // Filtered regional data
  const filteredRegions = useMemo(() => {
    let list = SHOWCASE_DATA.regionalPerformance;
    if (selectedTerritory !== 'All') {
      list = list.filter((r) => r.territory.toLowerCase().includes(selectedTerritory.toLowerCase()));
    }
    return list;
  }, [selectedTerritory]);

  // Filtered products sorted
  const sortedProducts = useMemo(() => {
    let list = [...SHOWCASE_DATA.topProducts];
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }

    list.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') valA = parseFloat(valA.replace(/[+%,$]/g, '')) || 0;
      if (typeof valB === 'string') valB = parseFloat(valB.replace(/[+%,$]/g, '')) || 0;
      return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });

    return list;
  }, [selectedCategory, sortField, sortAsc]);

  // Export current table view as CSV
  const handleExportCSV = () => {
    const headers = ['SKU', 'Product Name', 'Category', 'Units Sold', 'Revenue ($)', 'YoY Growth'];
    const rows = sortedProducts.map((p) => [
      p.sku,
      `"${p.name}"`,
      p.category,
      p.units,
      p.revenue,
      `"${p.growth}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sales_analytics_export_${selectedQuarter}_${selectedCategory}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetFilters = () => {
    setSelectedQuarter('All');
    setSelectedCategory('All');
    setSelectedTerritory('All');
  };

  // Find max value in monthly for chart scaling
  const maxMonthlyVal = Math.max(...filteredMonthly.map((m) => Math.max(m.actual, m.target)), 1000);

  return (
    <section id="showcase" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-semibold text-orange-600 dark:text-orange-400 tracking-wider uppercase">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Interactive Live Analytics System</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Commercial Analytics <span className="text-gradient-orange">Control Center</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
            Experience an interactive demonstration of my target vs actual sales analytics architecture, DSM/RSM quota tracking, and multi-dimensional slice-and-dice intelligence.
          </p>

          {/* Synthetic Data Disclaimer Banner */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs text-orange-800 dark:text-orange-200">
            <Info className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />
            <span>
              <strong>Note:</strong> Powered by clearly labeled synthetic telemetry showcasing data modeling and variance tracking principles.
            </span>
          </div>
        </div>

        {/* Dashboard Frame */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-2xl space-y-8">
          
          {/* Controls Bar: Time / Category / Territory Filters */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/5">
            
            {/* Filter Slicers */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                <span>Filters:</span>
              </span>

              {/* Quarter Filter */}
              <select
                aria-label="Filter by time period"
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value as Quarter)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 cursor-pointer shadow-sm"
              >
                <option value="All">Period: All 2026</option>
                <option value="Q1">Q1 (Jan - Mar)</option>
                <option value="Q2">Q2 (Apr - Jun)</option>
                <option value="Q3">Q3 (Jul - Sep)</option>
                <option value="Q4">Q4 (Oct - Nov)</option>
              </select>

              {/* Category Filter */}
              <select
                aria-label="Filter by product category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 cursor-pointer shadow-sm"
              >
                <option value="All">Category: All Business Units</option>
                <option value="Pharmaceuticals">Pharmaceuticals</option>
                <option value="Nutraceuticals">Nutraceuticals</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Dermatological">Dermatological</option>
              </select>

              {/* Territory Filter */}
              <select
                aria-label="Filter by sales territory"
                value={selectedTerritory}
                onChange={(e) => setSelectedTerritory(e.target.value as Territory)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 cursor-pointer shadow-sm"
              >
                <option value="All">Territory: All Regions</option>
                <option value="Karachi">Karachi Metro (DSM South-A)</option>
                <option value="Punjab">Punjab Central (DSM Central-1)</option>
                <option value="North">North Zone (DSM North)</option>
                <option value="Sindh">Sindh Rural (DSM South-B)</option>
                <option value="KPK">KPK & Corridor (DSM West)</option>
              </select>
            </div>

            {/* Actions: Reset & Export CSV */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                title="Reset all filters"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 shadow-sm transition-all cursor-pointer"
                title="Export filtered dataset to CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

          </div>

          {/* Dynamic KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI 1: Total Revenue */}
            <div className="bg-white/80 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/5 space-y-1 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Total Net Sales</span>
                <DollarSign className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                ${filteredMetrics.revenue.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between pt-1">
                <span>Target: ${filteredMetrics.target.toLocaleString()}</span>
                <span className={`font-bold ${
                  filteredMetrics.variance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {filteredMetrics.variance >= 0 ? '+' : ''}${filteredMetrics.variance.toLocaleString()}
                </span>
              </div>
            </div>

            {/* KPI 2: Target Attainment % */}
            <div className="bg-white/80 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/5 space-y-1 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Target Achievement</span>
                <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {filteredMetrics.achievement}%
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 dark:bg-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(parseFloat(filteredMetrics.achievement), 120)}%` }}
                />
              </div>
            </div>

            {/* KPI 3: Orders / Invoices */}
            <div className="bg-white/80 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/5 space-y-1 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Fulfilled Orders</span>
                <ShoppingCart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {filteredMetrics.orders.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                Avg Order Value: <strong className="text-orange-600 dark:text-orange-300">${filteredMetrics.aov}</strong>
              </div>
            </div>

            {/* KPI 4: Governance Variance Status */}
            <div className="bg-white/80 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/5 space-y-1 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>DSM/RSM Variance</span>
                <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-orange-600 dark:text-orange-400">
                {filteredMetrics.variance >= 0 ? 'Surplus' : 'Deficit'}
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 pt-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Field Force Quota Tracked</span>
              </div>
            </div>

          </div>

          {/* Interactive Visualizations Row: Monthly Sales vs Target + Territory Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Chart: Monthly Sales Trajectory (SVG interactive bar + target line) */}
            <div className="lg:col-span-7 bg-white/80 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-white/5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-orange-600 dark:text-cyan-400" />
                    <span>Monthly Sales vs Target Performance</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Hover bars to inspect variance details</p>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-orange-600 dark:text-cyan-400">
                    <span className="w-3 h-3 rounded-sm bg-orange-500 dark:bg-cyan-400 inline-block" />
                    <span>Actual Sales</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                    <span className="w-3 h-0.5 bg-purple-500 dark:bg-purple-400 inline-block" />
                    <span>Target Quota</span>
                  </div>
                </div>
              </div>

              {/* SVG Chart Frame */}
              <div className="h-56 w-full flex items-end justify-between gap-2 pt-8 pb-2 px-2 border-b border-slate-200 dark:border-white/10 relative">
                {filteredMonthly.map((m, idx) => {
                  const actualHeight = Math.min((m.actual / (maxMonthlyVal * 1.15)) * 100, 100);
                  const targetHeight = Math.min((m.target / (maxMonthlyVal * 1.15)) * 100, 100);
                  const variancePct = (((m.actual - m.target) / (m.target || 1)) * 100).toFixed(1);
                  const isHovered = hoveredMonth === idx;

                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                      onMouseEnter={() => setHoveredMonth(idx)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      {/* Tooltip on hover */}
                      {isHovered && (
                        <div className="absolute -top-16 z-20 bg-slate-900 border border-orange-500/50 rounded-lg p-2 text-[10px] shadow-xl whitespace-nowrap text-white">
                          <p className="font-bold text-white">{m.month}</p>
                          <p className="text-orange-400">Actual: ${m.actual.toLocaleString()}</p>
                          <p className="text-purple-400">Target: ${m.target.toLocaleString()}</p>
                          <p className={`font-semibold ${parseFloat(variancePct) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            Variance: {parseFloat(variancePct) >= 0 ? '+' : ''}{variancePct}%
                          </p>
                        </div>
                      )}

                      {/* Bar Column */}
                      <div className="w-full flex items-end justify-center h-full relative">
                        {/* Target line */}
                        <div
                          className="absolute w-full border-t-2 border-dashed border-purple-500 dark:border-purple-400 z-10"
                          style={{ bottom: `${targetHeight}%` }}
                        />

                        {/* Actual Bar */}
                        <div
                          className={`w-full max-w-[28px] rounded-t-md transition-all duration-300 ${
                            m.actual >= m.target
                              ? 'bg-gradient-to-t from-orange-600/60 via-orange-500 to-amber-500 dark:from-cyan-600/40 dark:via-cyan-500 dark:to-cyan-400 group-hover:brightness-110'
                              : 'bg-gradient-to-t from-slate-400 via-slate-500 to-slate-600 dark:from-amber-600/40 dark:via-amber-500 dark:to-amber-400 group-hover:brightness-110'
                          }`}
                          style={{ height: `${actualHeight}%` }}
                        />
                      </div>

                      {/* Label */}
                      <span className="text-[10px] text-slate-600 dark:text-slate-400 mt-2 font-medium">
                        {m.month.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                <span>Total Reporting Windows: {filteredMonthly.length} Months</span>
                <span>Time Intelligence: Month-over-Month & YTD Active</span>
              </div>
            </div>

            {/* Right Chart: Regional Territory Achievement (DSM/RSM Variance Bars) */}
            <div className="lg:col-span-5 bg-white/80 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-white/5 space-y-4 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Regional Territory & DSM Achievement</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Quota tracking across regional field forces</p>
              </div>

              <div className="space-y-4 pt-2">
                {filteredRegions.map((region, idx) => {
                  const ach = ((region.actual / (region.target || 1)) * 100).toFixed(1);
                  const isSurpassed = region.actual >= region.target;

                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white">{region.territory}</span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-2">({region.dsm})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-orange-600 dark:text-cyan-300">{ach}%</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            isSurpassed ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' : 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
                          }`}>
                            {region.status}
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden flex">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isSurpassed ? 'bg-gradient-to-r from-orange-500 to-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${Math.min(parseFloat(ach), 100)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-400">
                        <span>Actual: ${region.actual.toLocaleString()}</span>
                        <span>Target: ${region.target.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-white/5 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 dark:text-cyan-400" />
                <span>Enables swift reallocation of promotional samples & sales reps</span>
              </div>
            </div>

          </div>

          {/* Interactive Products Table with Sorting */}
          <div className="bg-white/80 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-white/5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-600 dark:text-cyan-400" />
                  <span>Top Product Performance Ledger</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Click column headers to sort by revenue, units, or YoY growth</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 dark:text-slate-400">Sort by:</span>
                {(['revenue', 'units', 'growth'] as const).map((field) => (
                  <button
                    key={field}
                    onClick={() => {
                      if (sortField === field) setSortAsc(!sortAsc);
                      else {
                        setSortField(field);
                        setSortAsc(false);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                      sortField === field
                        ? 'bg-orange-500/20 text-orange-700 dark:text-orange-300 border border-orange-500/40'
                        : 'glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {field} {sortField === field ? (sortAsc ? '↑' : '↓') : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">SKU</th>
                    <th className="py-2.5 px-3">Product Name</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3 text-right">Units Dispatched</th>
                    <th className="py-2.5 px-3 text-right">Revenue ($)</th>
                    <th className="py-2.5 px-3 text-right">YoY Velocity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                  {sortedProducts.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors group">
                      <td className="py-3 px-3 font-mono text-orange-600 dark:text-cyan-300 font-semibold">{p.sku}</td>
                      <td className="py-3 px-3 font-medium text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-cyan-300 transition-colors">
                        {p.name}
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{p.category}</td>
                      <td className="py-3 px-3 text-right font-semibold text-slate-800 dark:text-slate-200">
                        {p.units.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900 dark:text-white">
                        ${p.revenue.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-extrabold text-emerald-600 dark:text-emerald-400">
                        {p.growth}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
