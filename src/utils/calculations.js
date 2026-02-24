/**
 * calculations.js
 * ─────────────────────────────────────────────────────────────────
 * Pure functions that derive all financial metrics from raw inputs.
 * Keeping calculations separate from UI components makes them easy
 * to unit-test and re-use across the application.
 */

/**
 * Compute all derived financial metrics for a single product record.
 *
 * @param {Object} record - raw product data row
 * @param {number} record.unitsSold   - number of units sold
 * @param {number} record.unitPrice   - selling price per unit ($)
 * @param {number} record.unitCost    - variable cost per unit ($)
 * @param {number} record.fixedCosts  - fixed monthly costs ($)
 * @returns {Object} record enriched with calculated fields
 */
export function enrichRecord(record) {
  const { unitsSold, unitPrice, unitCost, fixedCosts } = record;

  // ── Revenue ──────────────────────────────────────────────────────
  // Total income generated from sales before any costs are deducted.
  // Formula: units sold × selling price per unit
  const revenue = unitsSold * unitPrice;

  // ── Variable Cost ────────────────────────────────────────────────
  // Costs that scale directly with production / fulfilment volume.
  // Formula: units sold × cost per unit
  const variableCost = unitsSold * unitCost;

  // ── Total Cost ───────────────────────────────────────────────────
  // Combined variable costs + fixed overhead for the period.
  // Formula: variable cost + fixed costs
  const totalCost = variableCost + fixedCosts;

  // ── Gross Profit ─────────────────────────────────────────────────
  // Profit remaining after all costs are subtracted from revenue.
  // Formula: revenue − total cost
  const grossProfit = revenue - totalCost;

  // ── Profit Margin (%) ────────────────────────────────────────────
  // Percentage of each revenue dollar kept as profit.
  // Formula: (gross profit / revenue) × 100
  // Guard against division-by-zero when revenue is 0.
  const profitMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;

  // ── Contribution Margin per Unit ─────────────────────────────────
  // Amount each additional unit sold contributes toward covering
  // fixed costs (and then profit).
  // Formula: unit price − unit cost
  const contributionMargin = unitPrice - unitCost;

  // ── Break-even Point (units) ─────────────────────────────────────
  // Minimum units that must be sold for this product to cover its
  // fixed costs and reach zero profit/loss.
  // Formula: fixed costs / contribution margin per unit
  // Guard against division-by-zero when contributionMargin is 0.
  const breakEvenUnits =
    contributionMargin > 0
      ? Math.ceil(fixedCosts / contributionMargin)
      : null;

  return {
    ...record,
    revenue: round2(revenue),
    variableCost: round2(variableCost),
    totalCost: round2(totalCost),
    grossProfit: round2(grossProfit),
    profitMargin: round2(profitMargin),
    contributionMargin: round2(contributionMargin),
    breakEvenUnits,
  };
}

/**
 * Enrich an entire array of raw records.
 *
 * @param {Object[]} records
 * @returns {Object[]}
 */
export function enrichAll(records) {
  return records.map(enrichRecord);
}

// ── Aggregate / KPI helpers ──────────────────────────────────────

/**
 * Sum of revenue across all enriched records.
 * @param {Object[]} records
 */
export function totalRevenue(records) {
  return round2(records.reduce((sum, r) => sum + r.revenue, 0));
}

/**
 * Sum of gross profit across all enriched records.
 * @param {Object[]} records
 */
export function totalGrossProfit(records) {
  return round2(records.reduce((sum, r) => sum + r.grossProfit, 0));
}

/**
 * Simple average of per-record profit margins.
 * @param {Object[]} records
 */
export function averageProfitMargin(records) {
  if (records.length === 0) return 0;
  const sum = records.reduce((acc, r) => acc + r.profitMargin, 0);
  return round2(sum / records.length);
}

/**
 * Return the record with the highest revenue.
 * @param {Object[]} records
 * @returns {Object|null}
 */
export function topProductByRevenue(records) {
  if (records.length === 0) return null;
  return records.reduce((best, r) => (r.revenue > best.revenue ? r : best));
}

/**
 * Aggregate revenue and gross profit grouped by month,
 * preserving the original data order.
 *
 * @param {Object[]} records - enriched records
 * @returns {{ month: string, revenue: number, grossProfit: number }[]}
 */
export function aggregateByMonth(records) {
  const map = new Map();
  records.forEach(({ month, revenue, grossProfit }) => {
    if (!map.has(month)) {
      map.set(month, { month, revenue: 0, grossProfit: 0 });
    }
    const entry = map.get(month);
    entry.revenue = round2(entry.revenue + revenue);
    entry.grossProfit = round2(entry.grossProfit + grossProfit);
  });
  return Array.from(map.values());
}

/**
 * Aggregate revenue and gross profit grouped by product name,
 * sorted descending by revenue.
 *
 * @param {Object[]} records - enriched records
 * @returns {{ product: string, revenue: number, grossProfit: number }[]}
 */
export function aggregateByProduct(records) {
  const map = new Map();
  records.forEach(({ product, revenue, grossProfit }) => {
    if (!map.has(product)) {
      map.set(product, { product, revenue: 0, grossProfit: 0 });
    }
    const entry = map.get(product);
    entry.revenue = round2(entry.revenue + revenue);
    entry.grossProfit = round2(entry.grossProfit + grossProfit);
  });
  return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue);
}

// ── Formatting helpers ───────────────────────────────────────────

/** Round to 2 decimal places (avoids floating-point drift). */
function round2(n) {
  return Math.round(n * 100) / 100;
}

/**
 * Format a number as USD currency string.
 * @param {number} value
 * @returns {string}  e.g. "$1,234.56"
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a decimal as a percentage string.
 * @param {number} value - already a percentage (e.g. 42.3)
 * @returns {string}  e.g. "42.3%"
 */
export function formatPercent(value) {
  return `${value.toFixed(1)}%`;
}

/**
 * Format large numbers with comma separators.
 * @param {number} value
 * @returns {string}
 */
export function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value);
}
