# Product Sales Analytics Dashboard

> A professional data analytics web application built for a **Data Analyst portfolio**.
> Demonstrates financial calculations, interactive visualisations, and clean data UX.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Recharts](https://img.shields.io/badge/Recharts-2.10-8884d8)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)

---

## Features

| Feature | Details |
|---------|---------|
| **Product Form** | Add new monthly product records with validation |
| **Auto Calculations** | Revenue, Total Cost, Gross Profit, Profit Margin, Break-even |
| **KPI Dashboard** | Total Revenue · Total Gross Profit · Avg Margin · Top Product |
| **Revenue Trend Chart** | Line chart of monthly revenue & gross profit (Recharts) |
| **Profit Comparison Chart** | Bar chart comparing revenue vs profit per product (Recharts) |
| **Data Table** | Sortable by any column, filterable by search + category |
| **CSV Export** | One-click download of all enriched records |
| **Delete Rows** | Hover to reveal per-row delete action |
| **Sample Data** | 18 pre-loaded records across 5 categories & 3 months |

---

## Financial Calculations Explained

```
Revenue            = Units Sold × Unit Price
Variable Cost      = Units Sold × Unit Cost
Total Cost         = Variable Cost + Fixed Costs
Gross Profit       = Revenue − Total Cost
Profit Margin (%)  = (Gross Profit / Revenue) × 100
Contribution Margin/unit = Unit Price − Unit Cost
Break-Even (units) = Fixed Costs / Contribution Margin per Unit
```

All formulas are documented with JSDoc comments in
`src/utils/calculations.js`.

---

## Project Structure

```
product-sales-analytics/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header + Export CSV button
│   │   ├── ProductForm.jsx     # Controlled form for adding records
│   │   ├── KPIDashboard.jsx    # Four KPI summary cards
│   │   ├── ChartsSection.jsx   # Line chart + Bar chart (Recharts)
│   │   └── DataTable.jsx       # Sortable + filterable data table
│   ├── data/
│   │   └── sampleData.js       # 18 dummy records (5 products, 3 months)
│   ├── utils/
│   │   ├── calculations.js     # Pure financial calculation functions
│   │   └── csvExport.js        # CSV generation + browser download
│   ├── App.jsx                 # Root component — state + data flow
│   ├── main.jsx                # ReactDOM entry point
│   └── index.css               # Tailwind directives + component classes
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:5173
```

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Tech Stack

- **React 18** — component architecture, hooks (`useState`, `useMemo`, `useCallback`)
- **Recharts 2** — composable, responsive SVG charts
- **Tailwind CSS 3** — utility-first styling with custom component classes
- **Vite 5** — lightning-fast dev server and optimised production builds
- **Lucide React** — consistent icon set

---

## Skills Demonstrated

- React state management & controlled components
- Pure function design for testable business logic
- Data aggregation & transformation (`Map`, `reduce`, `sort`)
- Responsive dashboard layout (CSS Grid + Flexbox via Tailwind)
- Accessible, keyboard-friendly UI
- Clean file & folder organisation for team / open-source projects

---

*Built as a portfolio project to demonstrate data-driven application development.*
