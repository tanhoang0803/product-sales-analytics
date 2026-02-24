/**
 * sampleData.js
 * ─────────────────────────────────────────────────────────────────
 * Pre-loaded product sales records used to populate the dashboard
 * on first load.  Each record represents one product's performance
 * for a calendar month.
 *
 * Fields
 * ──────
 * id          – unique row identifier
 * product     – product name
 * category    – product category (used for grouping / filtering)
 * month       – "MMM YYYY" string (used on chart x-axis)
 * unitsSold   – number of units sold that month
 * unitPrice   – selling price per unit  (USD)
 * unitCost    – variable cost per unit  (USD) – materials, fulfilment, etc.
 * fixedCosts  – monthly fixed overhead attributed to this product
 *               (rent, salaries, licensing, etc.)
 */

export const SAMPLE_DATA = [
  // ── Electronics ─────────────────────────────────────────────────
  {
    id: 1,
    product: 'Wireless Headphones Pro',
    category: 'Electronics',
    month: 'Jan 2024',
    unitsSold: 245,
    unitPrice: 89.99,
    unitCost: 34.5,
    fixedCosts: 1200,
  },
  {
    id: 2,
    product: 'Wireless Headphones Pro',
    category: 'Electronics',
    month: 'Feb 2024',
    unitsSold: 310,
    unitPrice: 89.99,
    unitCost: 34.5,
    fixedCosts: 1200,
  },
  {
    id: 3,
    product: 'Wireless Headphones Pro',
    category: 'Electronics',
    month: 'Mar 2024',
    unitsSold: 390,
    unitPrice: 89.99,
    unitCost: 34.5,
    fixedCosts: 1200,
  },
  {
    id: 4,
    product: 'Smart Watch Series X',
    category: 'Electronics',
    month: 'Jan 2024',
    unitsSold: 180,
    unitPrice: 199.99,
    unitCost: 82.0,
    fixedCosts: 1800,
  },
  {
    id: 5,
    product: 'Smart Watch Series X',
    category: 'Electronics',
    month: 'Feb 2024',
    unitsSold: 220,
    unitPrice: 199.99,
    unitCost: 82.0,
    fixedCosts: 1800,
  },
  {
    id: 6,
    product: 'Smart Watch Series X',
    category: 'Electronics',
    month: 'Mar 2024',
    unitsSold: 265,
    unitPrice: 199.99,
    unitCost: 82.0,
    fixedCosts: 1800,
  },
  // ── Footwear ─────────────────────────────────────────────────────
  {
    id: 7,
    product: 'Running Shoes Elite',
    category: 'Footwear',
    month: 'Jan 2024',
    unitsSold: 320,
    unitPrice: 119.99,
    unitCost: 45.0,
    fixedCosts: 950,
  },
  {
    id: 8,
    product: 'Running Shoes Elite',
    category: 'Footwear',
    month: 'Feb 2024',
    unitsSold: 275,
    unitPrice: 119.99,
    unitCost: 45.0,
    fixedCosts: 950,
  },
  {
    id: 9,
    product: 'Running Shoes Elite',
    category: 'Footwear',
    month: 'Mar 2024',
    unitsSold: 410,
    unitPrice: 119.99,
    unitCost: 45.0,
    fixedCosts: 950,
  },
  // ── Sports ────────────────────────────────────────────────────────
  {
    id: 10,
    product: 'Yoga Mat Premium',
    category: 'Sports',
    month: 'Jan 2024',
    unitsSold: 480,
    unitPrice: 49.99,
    unitCost: 14.0,
    fixedCosts: 600,
  },
  {
    id: 11,
    product: 'Yoga Mat Premium',
    category: 'Sports',
    month: 'Feb 2024',
    unitsSold: 530,
    unitPrice: 49.99,
    unitCost: 14.0,
    fixedCosts: 600,
  },
  {
    id: 12,
    product: 'Yoga Mat Premium',
    category: 'Sports',
    month: 'Mar 2024',
    unitsSold: 615,
    unitPrice: 49.99,
    unitCost: 14.0,
    fixedCosts: 600,
  },
  // ── Appliances ────────────────────────────────────────────────────
  {
    id: 13,
    product: 'Coffee Maker Deluxe',
    category: 'Appliances',
    month: 'Jan 2024',
    unitsSold: 140,
    unitPrice: 159.99,
    unitCost: 72.0,
    fixedCosts: 1500,
  },
  {
    id: 14,
    product: 'Coffee Maker Deluxe',
    category: 'Appliances',
    month: 'Feb 2024',
    unitsSold: 175,
    unitPrice: 159.99,
    unitCost: 72.0,
    fixedCosts: 1500,
  },
  {
    id: 15,
    product: 'Coffee Maker Deluxe',
    category: 'Appliances',
    month: 'Mar 2024',
    unitsSold: 205,
    unitPrice: 159.99,
    unitCost: 72.0,
    fixedCosts: 1500,
  },
  // ── Accessories ───────────────────────────────────────────────────
  {
    id: 16,
    product: 'Laptop Stand Pro',
    category: 'Accessories',
    month: 'Jan 2024',
    unitsSold: 390,
    unitPrice: 39.99,
    unitCost: 11.5,
    fixedCosts: 400,
  },
  {
    id: 17,
    product: 'Laptop Stand Pro',
    category: 'Accessories',
    month: 'Feb 2024',
    unitsSold: 425,
    unitPrice: 39.99,
    unitCost: 11.5,
    fixedCosts: 400,
  },
  {
    id: 18,
    product: 'Laptop Stand Pro',
    category: 'Accessories',
    month: 'Mar 2024',
    unitsSold: 510,
    unitPrice: 39.99,
    unitCost: 11.5,
    fixedCosts: 400,
  },
];

/** Distinct categories derived from the sample data */
export const CATEGORIES = [...new Set(SAMPLE_DATA.map((d) => d.category))].sort();
