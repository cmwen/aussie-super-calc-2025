# Aussie Super Calculator 2025

A comprehensive web application for Australian tax residents to compare superannuation contributions versus mortgage offset account benefits for the 2024/25 financial year.

## Features

- **Super Contribution Analysis**: Calculate tax savings from salary sacrifice and personal deductible contributions
- **Mortgage Offset Comparison**: Analyze interest savings from offset account contributions
- **Spouse Contribution Benefits**: Calculate spouse contribution tax offsets
- **Interactive Charts**: Visualize tax savings vs interest savings and take-home pay impact
- **Cap Monitoring**: Alerts for concessional contribution caps and Division 293 thresholds
- **Multi-year Projections**: Project long-term outcomes for different strategies

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aussie-super-calc-2025.git
cd aussie-super-calc-2025
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: Zustand
- **Testing**: Vitest + Testing Library
- **Deployment**: GitHub Pages

## Tax Year Coverage

This calculator is specifically designed for **FY 2024/25** and includes:

- Tax brackets: 0%, 16%, 30%, 37%, 45%
- Medicare Levy: 2% (above $24,276 threshold)
- Superannuation Guarantee: 11.5%
- Concessional contribution cap: $30,000
- Contributions tax: 15%
- Division 293 threshold: $250,000
- Spouse contribution offset: max $540

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:ui
```

## Deployment

This project is configured for GitHub Pages deployment:

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy to `gh-pages` branch
3. Enable GitHub Pages in repository settings pointing to `gh-pages` branch

### Manual Deployment

```bash
npm run deploy
```

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── Charts.tsx       # Chart components
│   ├── InputsPanel.tsx  # Input form
│   └── ResultsPanel.tsx # Results display
├── core/                # Core calculation logic
│   ├── tax.ts          # Tax calculations
│   ├── super.ts        # Super calculations
│   ├── offset.ts       # Mortgage offset calculations
│   └── spouse.ts       # Spouse contribution calculations
├── config/              # Configuration
│   └── au_2024_25.ts   # 2024/25 tax year parameters
├── store/               # State management
│   └── calculator.ts   # Zustand store
└── lib/                # Utilities
    └── utils.ts        # Helper functions
```

## Key Features Explained

### Super Contributions
- **Salary Sacrifice**: Pre-tax contributions that reduce taxable income
- **Personal Deductible**: Post-tax contributions that can be claimed as tax deductions
- **Tax Savings**: Difference between marginal tax rate and 15% contributions tax
- **Net Amount**: Final amount added to super after contributions tax

### Mortgage Offset
- **Interest Savings**: Annual interest saved on mortgage principal
- **Cash Flow**: Immediate impact on monthly expenses
- **Long-term Benefits**: Total interest savings over loan term

### Spouse Contributions
- **Tax Offset**: Up to $540 offset for contributing to low-income spouse's super
- **Income Thresholds**: Full offset for spouse income ≤$37,000, reducing to $40,000

## Important Disclaimers

⚠️ **This calculator is for general information and educational purposes only.**

- Only applies to **FY 2024/25** - tax laws and rates may change
- Calculations are simplified and may not reflect your full tax situation
- Does not include all deductions, offsets, or fees
- Super investment returns are hypothetical
- Does not constitute tax, financial, or legal advice

**Always consult a qualified tax professional before making financial decisions.**

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or issues, please open a GitHub issue or contact the maintainers.
