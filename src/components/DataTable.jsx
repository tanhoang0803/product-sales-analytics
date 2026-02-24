/**
 * DataTable.jsx
 * ─────────────────────────────────────────────────────────────────
 * Sortable, filterable data table for all enriched product records.
 *
 * Features
 * ────────
 * • Text search across product name, category, and month
 * • Category dropdown filter
 * • Click any column header to sort (toggle asc / desc)
 * • Colour-coded profit margin badges
 * • Delete row action
 * • Empty-state placeholder
 */

import { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, Trash2 } from 'lucide-react';
import { CATEGORIES } from '../data/sampleData';
import { formatCurrency, formatPercent } from '../utils/calculations';

// ── Column definitions ───────────────────────────────────────────
const COLUMNS = [
  { key: 'product',            label: 'Product',               sortable: true  },
  { key: 'category',           label: 'Category',              sortable: true  },
  { key: 'month',              label: 'Month',                 sortable: true  },
  { key: 'unitsSold',          label: 'Units Sold',            sortable: true  },
  { key: 'unitPrice',          label: 'Unit Price',            sortable: true  },
  { key: 'unitCost',           label: 'Unit Cost',             sortable: true  },
  { key: 'fixedCosts',         label: 'Fixed Costs',           sortable: true  },
  { key: 'revenue',            label: 'Revenue',               sortable: true  },
  { key: 'totalCost',          label: 'Total Cost',            sortable: true  },
  { key: 'grossProfit',        label: 'Gross Profit',          sortable: true  },
  { key: 'profitMargin',       label: 'Margin %',              sortable: true  },
  { key: 'contributionMargin', label: 'Contrib. Margin',       sortable: true  },
  { key: 'breakEvenUnits',     label: 'Break-Even (units)',    sortable: true  },
  { key: '_actions',           label: '',                      sortable: false },
];

// ── Currency / number cell formatter ────────────────────────────
function formatCell(key, value) {
  if (value === null || value === undefined) return '—';
  const currency = ['unitPrice','unitCost','fixedCosts','revenue','totalCost',
                    'grossProfit','contributionMargin'];
  if (currency.includes(key)) return formatCurrency(value);
  if (key === 'profitMargin')  return null; // rendered as badge below
  return String(value);
}

// ── Profit margin badge ──────────────────────────────────────────
function MarginBadge({ value }) {
  let cls;
  if (value >= 40)      cls = 'bg-emerald-100 text-emerald-700';
  else if (value >= 20) cls = 'bg-amber-100 text-amber-700';
  else if (value >= 0)  cls = 'bg-orange-100 text-orange-700';
  else                  cls = 'bg-red-100 text-red-700';

  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {formatPercent(value)}
    </span>
  );
}

// ── Sort icon ────────────────────────────────────────────────────
function SortIcon({ columnKey, sortKey, sortDir }) {
  if (columnKey !== sortKey) return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-300" />;
  return sortDir === 'asc'
    ? <ChevronUp   className="w-3.5 h-3.5 text-indigo-500" />
    : <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />;
}

// ── Main component ───────────────────────────────────────────────
export default function DataTable({ records, onDelete }) {
  const [search,  setSearch]  = useState('');
  const [catFilter, setCat]   = useState('');   // '' = all categories
  const [sortKey,   setSortKey]  = useState('revenue');
  const [sortDir,   setSortDir]  = useState('desc');

  // ── Filter ──────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return records.filter((r) => {
      const matchSearch =
        !q ||
        r.product.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.month.toLowerCase().includes(q);
      const matchCat = !catFilter || r.category === catFilter;
      return matchSearch && matchCat;
    });
  }, [records, search, catFilter]);

  // ── Sort ────────────────────────────────────────────────────────
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av === null && bv === null) return 0;
      if (av === null) return 1;
      if (bv === null) return -1;
      const cmp = typeof av === 'string'
        ? av.localeCompare(bv)
        : av - bv;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  function handleSort(key) {
    if (!key || key === '_actions') return;
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  return (
    <section>
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
        Data Table
      </h2>
      <div className="card p-0 overflow-hidden">

        {/* ── Toolbar ── */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-slate-100">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product, category, month…"
              className="form-input pl-9"
            />
          </div>

          {/* Category filter */}
          <select
            value={catFilter}
            onChange={(e) => setCat(e.target.value)}
            className="form-input sm:w-44"
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Record count badge */}
          <div className="flex items-center text-xs text-slate-400 whitespace-nowrap self-center">
            {sorted.length} of {records.length} rows
          </div>
        </div>

        {/* ── Table ── */}
        <div className="overflow-x-auto table-wrapper">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className={`th select-none whitespace-nowrap ${col.sortable ? 'hover:text-indigo-600 cursor-pointer' : ''}`}
                    data-sortable={col.sortable || undefined}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {col.sortable && (
                        <SortIcon columnKey={col.key} sortKey={sortKey} sortDir={sortDir} />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="td text-center py-12 text-slate-400">
                    No records match your filters.
                  </td>
                </tr>
              ) : (
                sorted.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors group">
                    {COLUMNS.map((col) => {
                      if (col.key === '_actions') {
                        return (
                          <td key="_actions" className="td">
                            <button
                              onClick={() => onDelete(row.id)}
                              title="Delete row"
                              className="opacity-0 group-hover:opacity-100 transition-opacity
                                         text-slate-400 hover:text-red-500 p-1 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        );
                      }
                      if (col.key === 'profitMargin') {
                        return (
                          <td key={col.key} className="td">
                            <MarginBadge value={row.profitMargin} />
                          </td>
                        );
                      }
                      // Colour gross profit cells red when negative
                      if (col.key === 'grossProfit') {
                        const negative = row.grossProfit < 0;
                        return (
                          <td key={col.key} className={`td font-medium ${negative ? 'text-red-500' : 'text-emerald-700'}`}>
                            {formatCell(col.key, row[col.key])}
                          </td>
                        );
                      }
                      return (
                        <td key={col.key} className="td whitespace-nowrap">
                          {formatCell(col.key, row[col.key])}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
