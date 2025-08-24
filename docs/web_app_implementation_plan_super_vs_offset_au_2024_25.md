# Web Application Implementation Plan – Super vs Offset (AU 2024/25)

## Goal

Build a front-end web application that allows Australian tax residents (FY 2024/25) to interactively compare:

- **Super contributions** (Salary Sacrifice / Personal Deductible) including tax savings, net amount added to Super, and **take-home cash**.
- **Mortgage Offset** contributions and their interest savings, cash flow, and long-term outcomes.
- **Spouse Contribution** tax offsets.

> **Scope:** This tool is limited to the **2024/25 financial year**. Future tax rates and thresholds are not included.

---

## Scenarios

1. Allocate an extra amount \$X between Salary Sacrifice / Personal Deductible Super and Mortgage Offset.
2. See the impact of different contribution amounts on tax savings, take-home cash, and net Super balance.
3. Evaluate 1-year or multi-year outcomes (interest savings vs tax savings + investment growth).
4. Include Spouse Contribution and potential tax offset for low-income spouse.

---

## Features

- **Input Panel:**

  - Personal taxable income
  - Contribution amount (lump sum / monthly)
  - Salary Sacrifice amount
  - Personal Deductible Contribution amount
  - Employer SG (automatic 11.5% or manual input)
  - Alert for exceeding Concessional Cap (\$30,000)
  - Mortgage principal, annual interest rate, remaining term, offset account balance
  - Super investment annual return assumptions (Conservative / Balanced / Growth)
  - Spouse taxable income and contributions
  - Optional Medicare Levy (2%) inclusion

- **Output & Visualization:**

  - Charts:
    - Tax savings vs Interest savings (bar chart)
    - Take-home pay impact (stacked or bar chart)
    - Net Super contributions (after 15% contributions tax)
    - N-year cumulative outcomes (line chart)
  - Tables:
    - Scenario comparison (Salary Sacrifice / Personal Deductible / Offset / Spouse Contribution)
    - Annual cash flow and balances
  - Warnings for cap limits and Division 293 applicability

- **Scenario Switch:**

  - Current year only vs N-year projection
  - Sensitivity sliders for tax rate or investment return

- **Export Options:**

  - Export charts/tables to PDF or image

---

## Calculation Engine

> **For FY 2024/25 only.** Parameters are centralized in `config/au_2024_25.ts`.

### Parameters

- Tax brackets: 0–\$18,200 = 0%; \$18,201–\$45,000 = 16%; \$45,001–\$135,000 = 30%; \$135,001–\$190,000 = 37%; \$190,001+ = 45%
- Medicare Levy: 2%
- Concessional cap: \$30,000
- SG: 11.5% (manual override allowed)
- Contributions tax: 15% (Division 293: warning if applicable)
- Spouse contribution offset: max \$540 for spouse income ≤ \$37,000, linear reduction \$37k–\$40k

### Tax Calculations

- `income_tax(taxableIncome)` based on brackets
- `medicare_levy(taxableIncome)` optional
- `take_home_pay = taxableIncome - income_tax - medicare_levy`

### Super Contributions

- `CC_user = salarySacrifice + personalDeductible`
- `totalCC = SG + CC_user` (alert if > cap)
- Taxable income reduction: `taxableIncome_after = taxableIncome_before - CC_user`
- Tax saving: `(MTR * CC_user) - (0.15 * CC_user)`
- Net into Super: `net_into_super = CC_user * (1 - 0.15)`

### Mortgage Offset

- Single year interest savings: `interest_saved_yr1 = offset_contribution * mortgage_rate`
- N-year projection using approximate amortization or compound interest model

### Spouse Contribution

- Tax offset calculation based on spouse income: linear reduction from max \$540

### N-Year Projection

- Super: `future_super = current_super + net_into_super * (1 + r_super)^N`
- Offset: estimated long-term interest savings

---

## UI/UX Design

- Single-page app (SPA) with left input panel, right-side charts
- Three main cards: Super, Mortgage Offset, Spouse Contribution
- Charts: annual tax savings vs interest savings, take-home impact, net Super vs Offset cash, N-year cumulative projections
- Alerts for cap, Div 293, thresholds
- i18n: English / Chinese
- Accessibility: ARIA, keyboard navigation

---

## Tech Stack

- Frontend: React + TypeScript + Vite (or Next.js static), UI: Tailwind, shadcn/ui, Recharts
- State: Zustand or Redux Toolkit
- Config file: `/config/au_2024_25.ts`
- Core modules: `/core/tax.ts`, `/core/super.ts`, `/core/offset.ts`, `/core/spouse.ts`
- Tests: Vitest + Testing Library
- Deployment: GitHub Pages (Vite build + gh-pages branch / GitHub Actions)

---

## Project Structure (Example)

```
src/
├─ app/
│  ├─ App.tsx
│  └─ routes.tsx
├─ components/
│  ├─ InputsPanel.tsx
│  ├─ ResultCards.tsx
│  ├─ Charts/
│  │  ├─ TaxVsInterestBar.tsx
│  │  ├─ TakeHomeDeltaBar.tsx
│  │  └─ LongTermLines.tsx
├─ core/
│  ├─ tax.ts
│  ├─ super.ts
│  ├─ offset.ts
│  └─ spouse.ts
├─ config/
│  └─ au_2024_25.ts
├─ i18n/
│  ├─ en.json
│  └─ zh-Hant.json
├─ lib/
│  └─ format.ts
└─ index.tsx
```

---

## Calculation Steps (Single Year)

1. Read inputs: taxableIncome\_before, salarySacrifice, personalDeductible, mortgageRate, offsetContribution, spouseIncome, spouseContrib
2. `CC_user = salarySacrifice + personalDeductible`; `taxableIncome_after = taxableIncome_before - CC_user`
3. Compute income tax and Medicare Levy before/after, take-home pay before/after
4. Compute tax saving: `(income_tax_before - income_tax_after) - 0.15 * CC_user`
5. Net into Super: `net_into_super = CC_user * 0.85`
6. Offset interest savings: `interest_saved = offsetContribution * mortgageRate`
7. Spouse offset calculation based on income
8. Output charts/tables with scenario comparison

---

## Validation & Edge Cases

- Concessional cap alert if `SG + CC_user > $30,000`
- Tax bracket boundaries tested
- Inputs: non-negative, max contribution limits, numeric validation
- Optional Medicare Levy inclusion
- Division 293 warning for high income (≥ \$250k)

---

## GitHub Copilot Strategy

- Use clear function signatures with JSDoc comments
- TDD: write `core/*.test.ts` first
- Generate Recharts skeletons and refine props
- Generate i18n JSON template and fill English text

Example prompt for Copilot:

```ts
// Implement calculateConcessionalScenario(incomeBefore, salarySacrifice, personalDeductible, sgRate, includeMedicare)
// Return { taxableBefore, taxableAfter, incomeTaxBefore, incomeTaxAfter, medicareBefore, medicareAfter, netIntoSuper, taxSaving, takeHomeDelta }
```

---

## GitHub Pages Deployment

1. Create repository and initialize Vite project
2. Set `base: "/<repo-name>/"` in `vite.config.ts`
3. Add GitHub Action for build & deploy to gh-pages
4. Verify paths, resources, and i18n

---

## Testing Plan

- Unit tests for tax brackets, concessional cap, spouse offset boundaries
- Property-based tests for random input validation
- Optional visual regression testing

---

## Privacy & Data

- Runs entirely in the browser; no data sent to server
- Local storage for input saving/reset optional

---

## Limitations & Disclaimer

- Only for **FY 2024/25**; laws and tax rates may change
- Simplified assumptions:
  - Medicare Levy and MLS simplified
  - Division 293 shown as warning only
  - Other deductions not included
  - Super fees/insurance not considered
  - Investment returns are hypothetical

**Disclaimer:** This tool is for general information and educational purposes only. It applies to Australia FY 2024/25 only. Calculations are simplified and may not reflect your full personal situation, fees, or all tax rules. Results do not constitute tax, financial, or legal advice. Consult a qualified professional before taking any action.

---

## Milestones

1. Day 1–2: Project skeleton, config, core calculation prototype
2. Day 3–4: UI/Charts, cap/Div293 alerts, i18n
3. Day 5: N-year projection, tests
4. Day 6: Documentation, GitHub Pages deployment

---

## Future Enhancements

- Multi-year/future tax year parameters
- Detailed Medicare/MLS and Division 293 calculation
- Retirement age & withdrawal rules guidance
- Monte Carlo analysis for savings vs mortgage vs super

