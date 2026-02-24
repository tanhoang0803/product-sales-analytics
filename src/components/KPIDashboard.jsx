/**
 * KPIDashboard.jsx
 * ─────────────────────────────────────────────────────────────────
 * Displays four summary KPI cards at the top of the dashboard:
 *   1. Total Revenue          — sum of all revenue
 *   2. Total Gross Profit     — sum of all gross profit
 *   3. Average Profit Margin  — mean of per-record margins
 *   4. Top Performing Product — product name with highest total revenue
 */

import {
  DollarSign,
  TrendingUp,
  Percent,
  Award,
} from 'lucide-react';
import {
  totalRevenue,
  totalGrossProfit,
  averageProfitMargin,
  topProductByRevenue,
  formatCurrency,
  formatPercent,
} from '../utils/calculations';

// ── Individual KPI card component ───────────────────────────────
function KPICard({ icon: Icon, iconBg, title, value, sub, trend }) {
  return (
    <div className="card flex items-start gap-4">
      <div className={`p-3 rounded-xl flex-shrink-0 ${iconBg}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{title}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900 truncate">{value}</p>
        {sub && <p className="mt-0.5 text-xs text-slate-400 truncate">{sub}</p>}
        {trend !== undefined && (
          <p className={`mt-1 text-xs font-medium ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend >= 0 ? '▲' : '▼'} {Math.abs(trend).toFixed(1)}%
          </p>
        )}
      </div>
    </div>
  );
}

// ── Dashboard component ──────────────────────────────────────────
export default function KPIDashboard({ records }) {
  // Derive all KPIs from the current filtered / visible records
  const rev    = totalRevenue(records);
  const profit = totalGrossProfit(records);
  const margin = averageProfitMargin(records);
  const top    = topProductByRevenue(records);

  // Overall margin acts as its own "trend" indicator (positive = green)
  const marginSign = margin >= 0 ? margin : margin;

  return (
    <section>
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
        KPI Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* 1. Total Revenue */}
        <KPICard
          icon={DollarSign}
          iconBg="bg-indigo-500"
          title="Total Revenue"
          value={formatCurrency(rev)}
          sub={`Across ${records.length} record${records.length !== 1 ? 's' : ''}`}
        />

        {/* 2. Total Gross Profit */}
        <KPICard
          icon={TrendingUp}
          iconBg={profit >= 0 ? 'bg-emerald-500' : 'bg-red-500'}
          title="Total Gross Profit"
          value={formatCurrency(profit)}
          sub="Revenue minus all costs"
        />

        {/* 3. Average Profit Margin */}
        <KPICard
          icon={Percent}
          iconBg={margin >= 30 ? 'bg-violet-500' : margin >= 10 ? 'bg-amber-500' : 'bg-red-500'}
          title="Avg Profit Margin"
          value={formatPercent(margin)}
          sub={margin >= 30 ? 'Healthy margin' : margin >= 10 ? 'Moderate margin' : 'Low margin'}
          trend={marginSign}
        />

        {/* 4. Top Performing Product */}
        <KPICard
          icon={Award}
          iconBg="bg-rose-500"
          title="Top Product"
          value={top ? top.product : '—'}
          sub={top ? `${formatCurrency(top.revenue)} revenue` : 'No data'}
        />

      </div>
    </section>
  );
}
