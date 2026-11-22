'use client';

import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  AreaChart as AreaChartIcon,
  Search, 
  Filter, 
  Calendar, 
  ArrowUpDown, 
  Download, 
  Layers, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Percent,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface PlaygroundRecord {
  id: string;
  date: string;
  category: string;
  region: string;
  revenue: number;
  orders: number;
  margin: number;
}

const DATASETS = {
  restaurant: {
    name: 'UK Restaurant Group (774K Transaction Sample)',
    description: 'Consolidated POS order lines across London Central, Manchester, Birmingham, and Edinburgh.',
    records: [
      { id: 'ORD-701', date: '2023-10-01', category: 'Main Courses', region: 'London Central', revenue: 4850, orders: 184, margin: 68 },
      { id: 'ORD-702', date: '2023-10-03', category: 'Beverages & Wine', region: 'London Central', revenue: 2650, orders: 192, margin: 82 },
      { id: 'ORD-703', date: '2023-10-05', category: 'Appetizers', region: 'Manchester', revenue: 1940, orders: 140, margin: 71 },
      { id: 'ORD-704', date: '2023-10-08', category: 'Desserts', region: 'Birmingham', revenue: 1120, orders: 98, margin: 74 },
      { id: 'ORD-705', date: '2023-10-12', category: 'Main Courses', region: 'Edinburgh', revenue: 3890, orders: 152, margin: 65 },
      { id: 'ORD-706', date: '2023-10-15', category: 'Beverages & Wine', region: 'Manchester', revenue: 2180, orders: 160, margin: 80 },
      { id: 'ORD-707', date: '2023-10-18', category: 'Main Courses', region: 'Birmingham', revenue: 3410, orders: 135, margin: 66 },
      { id: 'ORD-708', date: '2023-10-22', category: 'Specialty Platters', region: 'London Central', revenue: 5120, orders: 112, margin: 62 },
      { id: 'ORD-709', date: '2023-10-25', category: 'Desserts', region: 'London Central', revenue: 1420, orders: 118, margin: 75 },
      { id: 'ORD-710', date: '2023-10-28', category: 'Appetizers', region: 'Edinburgh', revenue: 1680, orders: 124, margin: 70 }
    ]
  },
  ecommerce: {
    name: 'UCI E-Commerce Retail II (Gift & Home)',
    description: 'B2B and retail customer gift transactions across UK, Germany, France, and EIRE.',
    records: [
      { id: 'INV-401', date: '2023-09-02', category: 'Home Decor', region: 'United Kingdom', revenue: 5820, orders: 84, margin: 54 },
      { id: 'INV-402', date: '2023-09-07', category: 'Kitchenware', region: 'Germany', revenue: 4190, orders: 62, margin: 48 },
      { id: 'INV-403', date: '2023-09-12', category: 'Seasonal Gifts', region: 'France', revenue: 3280, orders: 49, margin: 52 },
      { id: 'INV-404', date: '2023-09-18', category: 'Stationery', region: 'United Kingdom', revenue: 1850, orders: 95, margin: 61 },
      { id: 'INV-405', date: '2023-09-22', category: 'Home Decor', region: 'EIRE', revenue: 2740, orders: 38, margin: 55 },
      { id: 'INV-406', date: '2023-09-26', category: 'Kitchenware', region: 'United Kingdom', revenue: 6420, orders: 104, margin: 49 },
      { id: 'INV-407', date: '2023-10-02', category: 'Seasonal Gifts', region: 'Germany', revenue: 4890, orders: 71, margin: 53 },
      { id: 'INV-408', date: '2023-10-09', category: 'Stationery', region: 'France', revenue: 2150, orders: 58, margin: 58 }
    ]
  },
  pharma: {
    name: 'Maxitech Pharma Regional Commercial Data',
    description: 'Pharmaceutical product family sales and territory quota performance.',
    records: [
      { id: 'TX-101', date: '2023-11-01', category: 'Antibiotics & Anti-Infectives', region: 'Karachi Central', revenue: 12400, orders: 42, margin: 42 },
      { id: 'TX-102', date: '2023-11-04', category: 'Cardiovascular Care', region: 'Lahore Metro', revenue: 14100, orders: 38, margin: 46 },
      { id: 'TX-103', date: '2023-11-08', category: 'Pediatric Syrups', region: 'Islamabad / Rawalpindi', revenue: 9800, orders: 51, margin: 38 },
      { id: 'TX-104', date: '2023-11-12', category: 'Gastroenterology', region: 'Multan & South', revenue: 7100, orders: 34, margin: 40 },
      { id: 'TX-105', date: '2023-11-16', category: 'Antibiotics & Anti-Infectives', region: 'Peshawar North', revenue: 6500, orders: 29, margin: 41 },
      { id: 'TX-106', date: '2023-11-20', category: 'Cardiovascular Care', region: 'Karachi South', revenue: 11200, orders: 36, margin: 45 },
      { id: 'TX-107', date: '2023-11-24', category: 'Pediatric Syrups', region: 'Faisalabad District', revenue: 8400, orders: 44, margin: 39 }
    ]
  }
};

export default function DataPlayground() {
  const [selectedDatasetKey, setSelectedDatasetKey] = useState<keyof typeof DATASETS>('restaurant');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area' | 'donut'>('bar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [sortField, setSortField] = useState<keyof PlaygroundRecord>('revenue');
  const [sortAsc, setSortAsc] = useState(false);

  const activeDataset = DATASETS[selectedDatasetKey];

  // Distinct categories and regions
  const categories = useMemo(() => {
    return Array.from(new Set(activeDataset.records.map(r => r.category)));
  }, [activeDataset]);

  const regions = useMemo(() => {
    return Array.from(new Set(activeDataset.records.map(r => r.region)));
  }, [activeDataset]);

  // Filtered & Sorted records
  const filteredRecords = useMemo(() => {
    return activeDataset.records
      .filter((r) => {
        const matchesCategory = selectedCategory === 'ALL' || r.category === selectedCategory;
        const matchesRegion = selectedRegion === 'ALL' || r.region === selectedRegion;
        const matchesSearch = 
          r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.region.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesRegion && matchesSearch;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortAsc ? valA - valB : valB - valA;
        }
        return sortAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
  }, [activeDataset, selectedCategory, selectedRegion, searchQuery, sortField, sortAsc]);

  // Aggregated KPIs
  const totalRevenue = useMemo(() => filteredRecords.reduce((sum, r) => sum + r.revenue, 0), [filteredRecords]);
  const totalOrders = useMemo(() => filteredRecords.reduce((sum, r) => sum + r.orders, 0), [filteredRecords]);
  const avgOrderValue = useMemo(() => (totalOrders > 0 ? totalRevenue / totalOrders : 0), [totalRevenue, totalOrders]);
  const avgMargin = useMemo(() => {
    if (filteredRecords.length === 0) return 0;
    return filteredRecords.reduce((sum, r) => sum + r.margin, 0) / filteredRecords.length;
  }, [filteredRecords]);

  // Chart aggregation by category or date
  const chartAggregates = useMemo(() => {
    const map: { [key: string]: number } = {};
    filteredRecords.forEach((r) => {
      const key = r.category;
      map[key] = (map[key] || 0) + r.revenue;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [filteredRecords]);

  const maxChartVal = useMemo(() => {
    return Math.max(...chartAggregates.map(c => c.value), 1);
  }, [chartAggregates]);

  return (
    <section id="playground" className="relative py-24 bg-[var(--bg-primary)] overflow-hidden tech-grid-pattern">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-600 dark:text-blue-400 shadow-sm shadow-blue-500/10">
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            <span>Multi-Dimensional Data Studio</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Interactive Data <span className="text-gradient-cyan">Playground</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Slice and drill through enterprise transactional datasets. Dynamically switch visualizations, filter by geographical territory and product family, and evaluate live business KPIs.
          </p>
        </div>

        {/* Dataset Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto p-1.5 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 shadow-md">
          {(Object.keys(DATASETS) as (keyof typeof DATASETS)[]).map((key) => (
            <button
              key={key}
              onClick={() => {
                setSelectedDatasetKey(key);
                setSelectedCategory('ALL');
                setSelectedRegion('ALL');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDatasetKey === key
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              {key === 'restaurant' && 'UK Restaurant (774K)'}
              {key === 'ecommerce' && 'UCI E-Commerce (541K)'}
              {key === 'pharma' && 'Maxitech Pharma Sales'}
            </button>
          ))}
        </div>

        {/* Dataset Info Banner */}
        <div className="glass-panel rounded-2xl p-4 border border-blue-500/20 bg-blue-500/[0.03] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {activeDataset.name}
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              {activeDataset.description}
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-white/10 font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300">
            {filteredRecords.length} Active Records Shown
          </span>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Total Net Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              Active Selection Aggregate
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Total Order Volume</span>
              <ShoppingBag className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              {totalOrders.toLocaleString()}
            </div>
            <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-1">
              Customer Orders Completed
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Average Order Value (AOV)</span>
              <TrendingUp className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              ${avgOrderValue.toFixed(2)}
            </div>
            <div className="text-[11px] text-orange-600 dark:text-orange-400 font-semibold mt-1">
              Revenue / Completed Orders
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Gross Margin %</span>
              <Percent className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              {avgMargin.toFixed(1)}%
            </div>
            <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold mt-1">
              Target Threshold: &gt;50%
            </div>
          </div>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          
          {/* Slicers */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search category or region..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/30 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/30 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Region Dropdown */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/30 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Regions</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Chart Type Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl glass-panel border border-slate-200 dark:border-white/10">
            <button
              onClick={() => setChartType('bar')}
              title="Bar Chart"
              className={`p-1.5 rounded-lg text-xs transition-all ${
                chartType === 'bar' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('line')}
              title="Line Chart"
              className={`p-1.5 rounded-lg text-xs transition-all ${
                chartType === 'line' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LineChartIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('area')}
              title="Area Chart"
              className={`p-1.5 rounded-lg text-xs transition-all ${
                chartType === 'area' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <AreaChartIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('donut')}
              title="Donut Distribution"
              className={`p-1.5 rounded-lg text-xs transition-all ${
                chartType === 'donut' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <PieChartIcon className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Dynamic Chart Display */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              <span>Revenue by Category Distribution ({chartType.toUpperCase()} View)</span>
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Total Category Segments: {chartAggregates.length}
            </span>
          </div>

          {/* High-Performance SVG Chart Visualizer */}
          <div className="pt-4 pb-2">
            {chartType === 'bar' && (
              <div className="space-y-3">
                {chartAggregates.map((cat, idx) => {
                  const pct = (cat.value / maxChartVal) * 100;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                        <span>{cat.name}</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400">${cat.value.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {chartType === 'line' && (
              <div className="h-56 w-full flex items-end justify-between gap-4 pt-6 pb-2 px-4 border-b border-l border-slate-300 dark:border-white/10 relative">
                {chartAggregates.map((cat, idx) => {
                  const heightPct = Math.max(12, (cat.value / maxChartVal) * 88);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                      <div className="text-[10px] font-mono text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5">
                        ${cat.value.toLocaleString()}
                      </div>
                      <div 
                        className="w-3 rounded-t-full bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-500 group-hover:w-4"
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className="text-[10px] text-slate-500 truncate max-w-[70px] mt-2">
                        {cat.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {chartType === 'area' && (
              <div className="h-56 w-full p-4 rounded-xl bg-gradient-to-b from-blue-500/15 via-cyan-500/5 to-transparent border border-blue-500/20 flex items-end justify-between gap-3">
                {chartAggregates.map((cat, idx) => {
                  const heightPct = Math.max(15, (cat.value / maxChartVal) * 92);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500/30 to-cyan-500/60 rounded-t-lg transition-all duration-500 border-t-2 border-cyan-400"
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className="text-[10px] text-slate-500 truncate max-w-[75px] mt-2 font-medium">
                        {cat.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {chartType === 'donut' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="flex justify-center">
                  <div className="relative w-44 h-44 rounded-full border-8 border-cyan-500/30 flex items-center justify-center p-4 shadow-xl">
                    <div className="text-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Sales</span>
                      <span className="text-lg font-black text-slate-900 dark:text-white">
                        ${totalRevenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {chartAggregates.map((cat, idx) => {
                    const share = totalRevenue > 0 ? ((cat.value / totalRevenue) * 100).toFixed(1) : '0';
                    return (
                      <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg glass-panel">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{cat.name}</span>
                        </div>
                        <div className="font-mono text-slate-600 dark:text-slate-400">
                          {share}% (${cat.value.toLocaleString()})
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Data Table */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Interactive Granular Record Explorer ({filteredRecords.length} Rows)
            </span>
            <span className="text-xs text-slate-500">
              Click any column header to sort
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th 
                    className="p-3 cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() => { setSortField('id'); setSortAsc(!sortAsc); }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Transaction ID</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>
                  <th 
                    className="p-3 cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() => { setSortField('date'); setSortAsc(!sortAsc); }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Date</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>
                  <th 
                    className="p-3 cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() => { setSortField('category'); setSortAsc(!sortAsc); }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Category</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>
                  <th 
                    className="p-3 cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() => { setSortField('region'); setSortAsc(!sortAsc); }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Region</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>
                  <th 
                    className="p-3 cursor-pointer hover:text-blue-500 transition-colors text-right"
                    onClick={() => { setSortField('revenue'); setSortAsc(!sortAsc); }}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Revenue ($)</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>
                  <th 
                    className="p-3 cursor-pointer hover:text-blue-500 transition-colors text-right"
                    onClick={() => { setSortField('orders'); setSortAsc(!sortAsc); }}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Orders</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>
                  <th 
                    className="p-3 cursor-pointer hover:text-blue-500 transition-colors text-right"
                    onClick={() => { setSortField('margin'); setSortAsc(!sortAsc); }}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Margin %</span>
                      <ArrowUpDown className="w-3 h-3 opacity-60" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5 font-mono text-[11px]">
                {filteredRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">{r.id}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{r.date}</td>
                    <td className="p-3 font-sans font-medium text-slate-800 dark:text-slate-200">{r.category}</td>
                    <td className="p-3 font-sans text-slate-600 dark:text-slate-400">{r.region}</td>
                    <td className="p-3 text-right font-bold text-slate-900 dark:text-white">${r.revenue.toLocaleString()}</td>
                    <td className="p-3 text-right text-slate-700 dark:text-slate-300">{r.orders}</td>
                    <td className="p-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">{r.margin}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
