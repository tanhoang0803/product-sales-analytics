/**
 * ChartsSection.jsx
 * ─────────────────────────────────────────────────────────────────
 * Two side-by-side interactive charts powered by Recharts:
 *
 * 1. Revenue Trend Line Chart
 *    X-axis: month   |  Y-axis: total revenue per month
 *    Shows revenue trajectory over time.
 *
 * 2. Profit Comparison Bar Chart
 *    X-axis: product |  Y-axis: total revenue vs gross profit
 *    Lets analysts compare profitability across products.
 */

import {
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { aggregateByMonth, aggregateByProduct } from '../utils/calculations';

// ── Custom tooltip formatter (shared) ───────────────────────────
function currencyFormatter(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// ── Branded colour palette ───────────────────────────────────────
const COLORS = {
  revenue:     '#6366f1', // indigo-500
  grossProfit: '#10b981', // emerald-500
};

// ── Revenue Trend Line Chart ─────────────────────────────────────
function RevenueTrendChart({ data }) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-slate-400">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          tickLine={false}
          axisLine={false}
          width={50}
        />
        <Tooltip
          formatter={(value, name) => [currencyFormatter(value), name === 'revenue' ? 'Revenue' : 'Gross Profit']}
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
          }}
        />
        <Legend
          formatter={(value) => value === 'revenue' ? 'Revenue' : 'Gross Profit'}
          wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
        />
        {/* Revenue line with dots */}
        <Line
          type="monotone"
          dataKey="revenue"
          stroke={COLORS.revenue}
          strokeWidth={2.5}
          dot={{ r: 4, fill: COLORS.revenue, strokeWidth: 0 }}
          activeDot={{ r: 6 }}
        />
        {/* Gross Profit line */}
        <Line
          type="monotone"
          dataKey="grossProfit"
          stroke={COLORS.grossProfit}
          strokeWidth={2.5}
          dot={{ r: 4, fill: COLORS.grossProfit, strokeWidth: 0 }}
          activeDot={{ r: 6 }}
          strokeDasharray="5 3"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ── Profit Comparison Bar Chart ──────────────────────────────────
function ProfitBarChart({ data }) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-slate-400">
        No data available
      </div>
    );
  }

  // Shorten long product names for x-axis readability
  const formattedData = data.map((d) => ({
    ...d,
    // Use the first word of the product name as a short label
    shortName: d.product.split(' ').slice(0, 2).join(' '),
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={formattedData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis
          dataKey="shortName"
          tick={{ fontSize: 10, fill: '#94a3b8' }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          tickLine={false}
          axisLine={false}
          width={50}
        />
        <Tooltip
          formatter={(value, name) => [
            currencyFormatter(value),
            name === 'revenue' ? 'Revenue' : 'Gross Profit',
          ]}
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
          }}
          cursor={{ fill: '#f8fafc' }}
        />
        <Legend
          formatter={(value) => value === 'revenue' ? 'Revenue' : 'Gross Profit'}
          wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
        />
        <Bar dataKey="revenue"     fill={COLORS.revenue}     radius={[4, 4, 0, 0]} maxBarSize={40} />
        <Bar dataKey="grossProfit" fill={COLORS.grossProfit} radius={[4, 4, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Main export ──────────────────────────────────────────────────
export default function ChartsSection({ records }) {
  // Aggregate data for each chart type
  const monthlyData  = aggregateByMonth(records);
  const productData  = aggregateByProduct(records);

  return (
    <section>
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
        Interactive Charts
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Line chart */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-800 mb-1">Revenue Trend</h3>
          <p className="text-xs text-slate-400 mb-4">
            Monthly revenue &amp; gross profit over time
          </p>
          <RevenueTrendChart data={monthlyData} />
        </div>

        {/* Bar chart */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-800 mb-1">Product Profit Comparison</h3>
          <p className="text-xs text-slate-400 mb-4">
            Total revenue vs gross profit per product (all months combined)
          </p>
          <ProfitBarChart data={productData} />
        </div>

      </div>
    </section>
  );
}
