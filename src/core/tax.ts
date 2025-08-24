import { AU_2024_25_CONFIG } from '@/config/au_2024_25';

/**
 * Calculate income tax based on Australian tax brackets for FY 2024/25
 */
export function calculateIncomeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  let tax = 0;
  let previousThreshold = 0;

  const brackets = AU_2024_25_CONFIG.TAX_BRACKETS;

  for (const bracket of brackets) {
    const currentThreshold = Math.min(taxableIncome, bracket.max);
    
    if (currentThreshold > previousThreshold) {
      const incomeInBracket = currentThreshold - Math.max(previousThreshold, bracket.min - 1);
      tax += incomeInBracket * bracket.rate;
      previousThreshold = currentThreshold;
    }
    
    if (taxableIncome <= bracket.max) break;
  }

  return Math.round(tax * 100) / 100;
}

/**
 * Calculate Medicare Levy for FY 2024/25
 */
export function calculateMedicareLevy(
  taxableIncome: number,
  includeMedicareLevy: boolean = true
): number {
  if (!includeMedicareLevy || taxableIncome <= AU_2024_25_CONFIG.MEDICARE_LEVY_THRESHOLD) {
    return 0;
  }

  return Math.round(taxableIncome * AU_2024_25_CONFIG.MEDICARE_LEVY_RATE * 100) / 100;
}

/**
 * Calculate marginal tax rate at a given income level
 */
export function getMarginalTaxRate(taxableIncome: number, includeMedicareLevy: boolean = true): number {
  const brackets = AU_2024_25_CONFIG.TAX_BRACKETS;
  
  let marginalRate = 0;
  for (const bracket of brackets) {
    if (taxableIncome >= bracket.min && taxableIncome <= bracket.max) {
      marginalRate = bracket.rate;
      break;
    }
  }

  if (includeMedicareLevy && taxableIncome > AU_2024_25_CONFIG.MEDICARE_LEVY_THRESHOLD) {
    marginalRate += AU_2024_25_CONFIG.MEDICARE_LEVY_RATE;
  }

  return marginalRate;
}

/**
 * Calculate total tax (income tax + Medicare levy)
 */
export function calculateTotalTax(
  taxableIncome: number,
  includeMedicareLevy: boolean = true
): { incomeTax: number; medicareLevy: number; totalTax: number } {
  const incomeTax = calculateIncomeTax(taxableIncome);
  const medicareLevy = calculateMedicareLevy(taxableIncome, includeMedicareLevy);
  const totalTax = incomeTax + medicareLevy;

  return { incomeTax, medicareLevy, totalTax };
}

/**
 * Calculate take-home pay after tax
 */
export function calculateTakeHomePay(
  grossIncome: number,
  includeMedicareLevy: boolean = true
): number {
  const { totalTax } = calculateTotalTax(grossIncome, includeMedicareLevy);
  return Math.round((grossIncome - totalTax) * 100) / 100;
}
