/**
 * Australian Tax Configuration for FY 2024/25
 * All rates, thresholds, and caps for the 2024/25 financial year
 */

export const AU_2024_25_CONFIG = {
  // Tax brackets for FY 2024/25
  TAX_BRACKETS: [
    { min: 0, max: 18200, rate: 0 },
    { min: 18201, max: 45000, rate: 0.16 },
    { min: 45001, max: 135000, rate: 0.30 },
    { min: 135001, max: 190000, rate: 0.37 },
    { min: 190001, max: Infinity, rate: 0.45 },
  ],

  // Medicare Levy
  MEDICARE_LEVY_RATE: 0.02,
  MEDICARE_LEVY_THRESHOLD: 24276,
  MEDICARE_LEVY_THRESHOLD_FAMILY: 40939,

  // Superannuation
  SUPERANNUATION_GUARANTEE_RATE: 0.115, // 11.5%
  CONCESSIONAL_CAP: 30000,
  CONTRIBUTIONS_TAX_RATE: 0.15,

  // Division 293 threshold
  DIVISION_293_THRESHOLD: 250000,
  DIVISION_293_ADDITIONAL_TAX: 0.15,

  // Spouse contribution offset
  SPOUSE_OFFSET_MAX: 540,
  SPOUSE_OFFSET_INCOME_THRESHOLD_LOW: 37000,
  SPOUSE_OFFSET_INCOME_THRESHOLD_HIGH: 40000,

  // Default investment return assumptions
  INVESTMENT_RETURNS: {
    CONSERVATIVE: 0.05,
    BALANCED: 0.07,
    GROWTH: 0.09,
  },
} as const;

export type TaxBracket = typeof AU_2024_25_CONFIG.TAX_BRACKETS[0];
export type InvestmentStrategy = keyof typeof AU_2024_25_CONFIG.INVESTMENT_RETURNS;
