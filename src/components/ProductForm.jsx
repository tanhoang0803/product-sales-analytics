/**
 * ProductForm.jsx
 * ─────────────────────────────────────────────────────────────────
 * Controlled form for adding new product records.  All financial
 * metrics are automatically computed on the server side — the user
 * only enters the raw inputs.
 *
 * Inputs:
 *   Product name | Category | Month | Units Sold
 *   Unit Price   | Unit Cost | Fixed Costs
 *
 * The parent App component passes `onAdd(record)` which receives
 * the raw (pre-calculation) record to append to state.
 */

import { useState } from 'react';
import { PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { CATEGORIES } from '../data/sampleData';

// ── Default empty form state ──────────────────────────────────────
const EMPTY_FORM = {
  product: '',
  category: '',
  month: '',
  unitsSold: '',
  unitPrice: '',
  unitCost: '',
  fixedCosts: '',
};

export default function ProductForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [open, setOpen] = useState(false); // collapsible panel
  const [errors, setErrors] = useState({});

  // ── Field change handler ────────────────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  // ── Validation ──────────────────────────────────────────────────
  function validate() {
    const e = {};
    if (!form.product.trim()) e.product = 'Required';
    if (!form.category.trim()) e.category = 'Required';
    if (!form.month.trim()) e.month = 'Required';
    if (form.unitsSold === '' || Number(form.unitsSold) < 0) e.unitsSold = 'Must be ≥ 0';
    if (form.unitPrice === '' || Number(form.unitPrice) <= 0)  e.unitPrice = 'Must be > 0';
    if (form.unitCost  === '' || Number(form.unitCost)  <  0)  e.unitCost  = 'Must be ≥ 0';
    if (form.fixedCosts === '' || Number(form.fixedCosts) < 0) e.fixedCosts = 'Must be ≥ 0';
    return e;
  }

  // ── Submit ──────────────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    onAdd({
      product:    form.product.trim(),
      category:   form.category.trim(),
      month:      form.month.trim(),
      unitsSold:  Number(form.unitsSold),
      unitPrice:  Number(form.unitPrice),
      unitCost:   Number(form.unitCost),
      fixedCosts: Number(form.fixedCosts),
    });

    setForm(EMPTY_FORM);
    setErrors({});
  }

  // ── Helpers ─────────────────────────────────────────────────────
  const labelClass = 'block text-xs font-medium text-slate-600 mb-1';
  const errClass   = 'mt-1 text-xs text-red-500';

  function Field({ name, label, type = 'text', placeholder }) {
    return (
      <div>
        <label className={labelClass} htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          step={type === 'number' ? 'any' : undefined}
          min={type === 'number' ? '0' : undefined}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`form-input ${errors[name] ? 'border-red-400 focus:ring-red-400' : ''}`}
        />
        {errors[name] && <p className={errClass}>{errors[name]}</p>}
      </div>
    );
  }

  return (
    <section className="card">
      {/* ── Collapsible header ─── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h2 className="text-base font-semibold text-slate-800">Add New Product Record</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter raw sales inputs — all metrics are calculated automatically
          </p>
        </div>
        {open
          ? <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
          : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        }
      </button>

      {/* ── Form body ─── */}
      {open && (
        <form onSubmit={handleSubmit} noValidate className="mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Row 1 */}
            <Field name="product"   label="Product Name"     placeholder="e.g. Wireless Headphones" />

            {/* Category select */}
            <div>
              <label className={labelClass} htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`form-input ${errors.category ? 'border-red-400 focus:ring-red-400' : ''}`}
              >
                <option value="">Select category…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {errors.category && <p className={errClass}>{errors.category}</p>}
            </div>

            <Field name="month"      label="Month"            placeholder="e.g. Jan 2024" />
            <Field name="unitsSold"  label="Units Sold"       type="number" placeholder="0" />

            {/* Row 2 */}
            <Field name="unitPrice"  label="Unit Price ($)"   type="number" placeholder="0.00" />
            <Field name="unitCost"   label="Unit Cost ($)"    type="number" placeholder="0.00" />
            <Field name="fixedCosts" label="Fixed Costs ($)"  type="number" placeholder="0.00" />

            {/* Submit aligned to bottom */}
            <div className="flex items-end">
              <button type="submit" className="btn-primary w-full justify-center py-2">
                <PlusCircle className="w-4 h-4" />
                Add Record
              </button>
            </div>
          </div>

          {/* Calculation preview hint */}
          <p className="mt-3 text-xs text-slate-400">
            Revenue, Total Cost, Gross Profit, Profit Margin &amp; Break-even will be
            calculated automatically after you add the record.
          </p>
        </form>
      )}
    </section>
  );
}
