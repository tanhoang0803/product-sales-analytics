/**
 * Header.jsx
 * ─────────────────────────────────────────────────────────────────
 * Application header with title, subtitle, and the CSV export button.
 */

import { BarChart2, Download } from 'lucide-react';

export default function Header({ onExport, recordCount }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Brand / title */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl">
            <BarChart2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900 leading-tight">
              Product Sales Analytics
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              Data Analyst Portfolio · {recordCount} record{recordCount !== 1 ? 's' : ''} loaded
            </p>
          </div>
        </div>

        {/* Export button */}
        <button
          onClick={onExport}
          className="btn-success"
          title="Export current table view to CSV"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export CSV</span>
        </button>
      </div>
    </header>
  );
}
