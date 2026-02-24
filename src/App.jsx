/**
 * App.jsx
 * ─────────────────────────────────────────────────────────────────
 * Root component that owns the shared data state and wires all
 * child components together.
 *
 * State
 * ──────
 * records — array of enriched product records (raw + calculated fields)
 *
 * Data flow
 * ─────────
 * 1. App loads with SAMPLE_DATA pre-enriched via enrichAll()
 * 2. ProductForm submits a raw record → App enriches it → appended to state
 * 3. DataTable renders the enriched records (with sort/filter internally)
 * 4. KPIDashboard & ChartsSection receive the same enriched records
 * 5. Header's "Export CSV" button triggers exportToCSV(records)
 */

import { useState, useCallback } from 'react';

import Header         from './components/Header';
import ProductForm    from './components/ProductForm';
import KPIDashboard   from './components/KPIDashboard';
import ChartsSection  from './components/ChartsSection';
import DataTable      from './components/DataTable';

import { SAMPLE_DATA } from './data/sampleData';
import { enrichAll, enrichRecord } from './utils/calculations';
import { exportToCSV } from './utils/csvExport';

// ── Seed the app with enriched sample data on first render ───────
const INITIAL_RECORDS = enrichAll(SAMPLE_DATA);

// Simple auto-incrementing ID counter (starts after sample data)
let nextId = INITIAL_RECORDS.length + 1;

export default function App() {
  const [records, setRecords] = useState(INITIAL_RECORDS);

  // ── Add a new product record from the form ───────────────────────
  const handleAdd = useCallback((rawRecord) => {
    const enriched = enrichRecord({ ...rawRecord, id: nextId++ });
    setRecords((prev) => [...prev, enriched]);
  }, []);

  // ── Delete a record by id ────────────────────────────────────────
  const handleDelete = useCallback((id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  // ── Export current records to CSV ────────────────────────────────
  const handleExport = useCallback(() => {
    exportToCSV(records, 'product_sales_analytics.csv');
  }, [records]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Sticky header ── */}
      <Header onExport={handleExport} recordCount={records.length} />

      {/* ── Main content ── */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Hero tagline ── */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Sales Analytics Dashboard</h2>
          <p className="mt-1 text-sm text-slate-500">
            Track product performance, automate financial calculations, and surface key
            insights — all in one place.
          </p>
        </div>

        {/* ── 1. Add product form ── */}
        <ProductForm onAdd={handleAdd} />

        {/* ── 2. KPI summary cards ── */}
        <KPIDashboard records={records} />

        {/* ── 3. Charts ── */}
        <ChartsSection records={records} />

        {/* ── 4. Data table (sort + filter + delete) ── */}
        <DataTable records={records} onDelete={handleDelete} />

      </main>

      {/* ── Footer ── */}
      <footer className="text-center text-xs text-slate-400 py-8">
        Product Sales Analytics · Built with React, Recharts &amp; Tailwind CSS ·{' '}
        <span className="font-medium text-slate-500">Data Analyst Portfolio</span>
      </footer>
    </div>
  );
}
