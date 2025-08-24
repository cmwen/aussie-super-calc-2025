import { AU_2024_25_CONFIG } from '@/config/au_2024_25';
import { calculateTotalTax, getMarginalTaxRate } from './tax';

export interface SuperContributionResult {
  // Input values
  salarySacrifice: number;
  personalDeductible: number;
  employerSG: number;
  
  // Calculated values
  totalConcessional: number;
  taxableIncomeBefore: number;
  taxableIncomeAfter: number;
  
  // Tax calculations
  incomeTaxBefore: number;
  incomeTaxAfter: number;
  medicareLevyBefore: number;
  medicareLevyAfter: number;
  totalTaxBefore: number;
  totalTaxAfter: number;
  
  // Super calculations
  contributionsTax: number;
  netIntoSuper: number;
  taxSaving: number;
  takeHomePayBefore: number;
  takeHomePayAfter: number;
  takeHomePayDelta: number;
  
  // Warnings and alerts
  exceedsConcessionalCap: boolean;
  division293Applicable: boolean;
  marginalTaxRate: number;
}

/**
 * Calculate superannuation contribution scenario
 */
export function calculateSuperContribution(
  taxableIncome: number,
  salarySacrifice: number,
  personalDeductible: number,
  sgRate: number = AU_2024_25_CONFIG.SUPERANNUATION_GUARANTEE_RATE,
  includeMedicareLevy: boolean = true
): SuperContributionResult {
  // Calculate employer SG
  const employerSG = Math.round(taxableIncome * sgRate * 100) / 100;
  
  // Total concessional contributions
  const userContributions = salarySacrifice + personalDeductible;
  const totalConcessional = employerSG + userContributions;
  
  // Adjusted taxable income (after salary sacrifice)
  const taxableIncomeAfter = Math.max(0, taxableIncome - salarySacrifice);
  
  // Tax calculations before and after
  const taxBefore = calculateTotalTax(taxableIncome, includeMedicareLevy);
  const taxAfter = calculateTotalTax(taxableIncomeAfter, includeMedicareLevy);
  
  // Super contributions tax (15%)
  const contributionsTax = Math.round(userContributions * AU_2024_25_CONFIG.CONTRIBUTIONS_TAX_RATE * 100) / 100;
  
  // Net amount going into super (after 15% tax)
  const netIntoSuper = Math.round((userContributions - contributionsTax) * 100) / 100;
  
  // Tax saving calculation
  const taxSaving = Math.round((taxBefore.totalTax - taxAfter.totalTax - contributionsTax) * 100) / 100;
  
  // Take-home pay calculations
  const takeHomePayBefore = Math.round((taxableIncome - taxBefore.totalTax) * 100) / 100;
  const takeHomePayAfter = Math.round((taxableIncomeAfter - taxAfter.totalTax - personalDeductible) * 100) / 100;
  const takeHomePayDelta = Math.round((takeHomePayAfter - takeHomePayBefore) * 100) / 100;
  
  // Warnings and checks
  const exceedsConcessionalCap = totalConcessional > AU_2024_25_CONFIG.CONCESSIONAL_CAP;
  const division293Applicable = taxableIncome >= AU_2024_25_CONFIG.DIVISION_293_THRESHOLD;
  const marginalTaxRate = getMarginalTaxRate(taxableIncome, includeMedicareLevy);
  
  return {
    salarySacrifice,
    personalDeductible,
    employerSG,
    totalConcessional,
    taxableIncomeBefore: taxableIncome,
    taxableIncomeAfter,
    incomeTaxBefore: taxBefore.incomeTax,
    incomeTaxAfter: taxAfter.incomeTax,
    medicareLevyBefore: taxBefore.medicareLevy,
    medicareLevyAfter: taxAfter.medicareLevy,
    totalTaxBefore: taxBefore.totalTax,
    totalTaxAfter: taxAfter.totalTax,
    contributionsTax,
    netIntoSuper,
    taxSaving,
    takeHomePayBefore,
    takeHomePayAfter,
    takeHomePayDelta,
    exceedsConcessionalCap,
    division293Applicable,
    marginalTaxRate,
  };
}

/**
 * Calculate future super balance with compound growth
 */
export function calculateFutureSuperBalance(
  currentBalance: number,
  annualContributions: number,
  annualReturnRate: number,
  years: number
): number {
  let balance = currentBalance;
  
  for (let year = 0; year < years; year++) {
    // Add contributions at the beginning of the year
    balance += annualContributions;
    // Apply investment return
    balance *= (1 + annualReturnRate);
  }
  
  return Math.round(balance * 100) / 100;
}
