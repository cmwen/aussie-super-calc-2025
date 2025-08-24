import { AU_2024_25_CONFIG } from '@/config/au_2024_25';

export interface SpouseContributionResult {
  spouseIncome: number;
  spouseContribution: number;
  taxOffset: number;
  effectiveTaxRate: number;
  netBenefit: number;
}

/**
 * Calculate spouse contribution tax offset for FY 2024/25
 */
export function calculateSpouseContributionOffset(
  spouseIncome: number,
  spouseContribution: number
): SpouseContributionResult {
  const maxOffset = AU_2024_25_CONFIG.SPOUSE_OFFSET_MAX;
  const lowThreshold = AU_2024_25_CONFIG.SPOUSE_OFFSET_INCOME_THRESHOLD_LOW;
  const highThreshold = AU_2024_25_CONFIG.SPOUSE_OFFSET_INCOME_THRESHOLD_HIGH;
  
  let taxOffset = 0;
  
  // Calculate tax offset based on spouse income
  if (spouseIncome <= lowThreshold) {
    // Full offset available (18% of contribution up to $3,000, max $540)
    const maxContribution = maxOffset / 0.18; // $3,000
    const eligibleContribution = Math.min(spouseContribution, maxContribution);
    taxOffset = eligibleContribution * 0.18;
  } else if (spouseIncome < highThreshold) {
    // Reduced offset - linear reduction from $37k to $40k
    const reductionFactor = (highThreshold - spouseIncome) / (highThreshold - lowThreshold);
    const maxContribution = maxOffset / 0.18; // $3,000
    const eligibleContribution = Math.min(spouseContribution, maxContribution);
    taxOffset = eligibleContribution * 0.18 * reductionFactor;
  }
  // No offset if spouse income >= $40,000
  
  // Cap the offset at maximum
  taxOffset = Math.min(taxOffset, maxOffset);
  taxOffset = Math.round(taxOffset * 100) / 100;
  
  // Calculate effective tax rate and net benefit
  const effectiveTaxRate = spouseContribution > 0 ? taxOffset / spouseContribution : 0;
  const netBenefit = taxOffset; // The tax offset is the direct benefit
  
  return {
    spouseIncome,
    spouseContribution,
    taxOffset,
    effectiveTaxRate: Math.round(effectiveTaxRate * 10000) / 100, // Convert to percentage
    netBenefit,
  };
}

/**
 * Calculate optimal spouse contribution for maximum offset
 */
export function calculateOptimalSpouseContribution(spouseIncome: number): number {
  const highThreshold = AU_2024_25_CONFIG.SPOUSE_OFFSET_INCOME_THRESHOLD_HIGH;
  
  if (spouseIncome >= highThreshold) {
    return 0; // No benefit available
  }
  
  // Maximum contribution that qualifies for offset is $3,000
  const maxQualifyingContribution = AU_2024_25_CONFIG.SPOUSE_OFFSET_MAX / 0.18;
  
  return maxQualifyingContribution;
}

/**
 * Check eligibility for spouse contribution offset
 */
export function isEligibleForSpouseOffset(spouseIncome: number): boolean {
  return spouseIncome < AU_2024_25_CONFIG.SPOUSE_OFFSET_INCOME_THRESHOLD_HIGH;
}
