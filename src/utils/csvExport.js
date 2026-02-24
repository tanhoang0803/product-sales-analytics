/**
 * csvExport.js
 * ─────────────────────────────────────────────────────────────────
 * Utility to convert the enriched data table into a downloadable
 * CSV file without any third-party library dependency.
 */

/** Column definitions: { key, label } */
const COLUMNS = [
  { key: 'id',                 label: 'ID'                      },
  { key: 'product',            label: 'Product'                 },
  { key: 'category',           label: 'Category'                },
  { key: 'month',              label: 'Month'                   },
  { key: 'unitsSold',          label: 'Units Sold'              },
  { key: 'unitPrice',          label: 'Unit Price ($)'          },
  { key: 'unitCost',           label: 'Unit Cost ($)'           },
  { key: 'fixedCosts',         label: 'Fixed Costs ($)'         },
  { key: 'revenue',            label: 'Revenue ($)'             },
  { key: 'variableCost',       label: 'Variable Cost ($)'       },
  { key: 'totalCost',          label: 'Total Cost ($)'          },
  { key: 'grossProfit',        label: 'Gross Profit ($)'        },
  { key: 'profitMargin',       label: 'Profit Margin (%)'       },
  { key: 'contributionMargin', label: 'Contribution Margin ($)' },
  { key: 'breakEvenUnits',     label: 'Break-Even Units'        },
];

/**
 * Escape a single CSV cell value.
 * Wraps in quotes if the value contains commas, quotes, or newlines.
 */
function escapeCell(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Convert an array of enriched records into a CSV string.
 * @param {Object[]} records
 * @returns {string}
 */
function toCsvString(records) {
  const header = COLUMNS.map((c) => escapeCell(c.label)).join(',');
  const rows = records.map((row) =>
    COLUMNS.map((c) => escapeCell(row[c.key])).join(',')
  );
  return [header, ...rows].join('\n');
}

/**
 * Trigger a browser download of the CSV file.
 *
 * @param {Object[]} records     - enriched product records to export
 * @param {string}   [filename]  - optional override for the file name
 */
export function exportToCSV(records, filename = 'product_sales_analytics.csv') {
  const csvContent = toCsvString(records);

  // Create an in-memory Blob with the correct MIME type for CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Build a temporary anchor element to trigger the download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();

  // Clean up the temporary DOM element and object URL
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
