import Link from 'next/link';
import { BarChart2, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b14] text-white p-6 data-grid-pattern">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-white/10 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
          <BarChart2 className="w-8 h-8 text-white" />
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl font-black text-cyan-400">404</h1>
          <h2 className="text-xl font-bold text-white">Dataset Record Not Found</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            The data point or route you requested could not be located in the current schema partition.
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
