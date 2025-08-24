export interface MortgageOffsetResult {
  offsetContribution: number;
  annualInterestRate: number;
  loanPrincipal: number;
  currentOffsetBalance: number;
  
  // Calculated values
  interestSavedYear1: number;
  newOffsetBalance: number;
  totalInterestSavedOverLife: number;
  yearsOffLoan: number;
  totalInterestWithoutOffset: number;
  totalInterestWithOffset: number;
  
  // Cash flow impact
  monthlyInterestSaving: number;
  annualCashFlowImprovement: number;
}

/**
 * Calculate mortgage offset account benefits
 */
export function calculateMortgageOffset(
  loanPrincipal: number,
  annualInterestRate: number,
  loanTermYears: number,
  currentOffsetBalance: number,
  offsetContribution: number
): MortgageOffsetResult {
  const monthlyRate = annualInterestRate / 12;
  const totalPayments = loanTermYears * 12;
  
  // Calculate interest saved in first year
  const newOffsetBalance = currentOffsetBalance + offsetContribution;
  const effectiveLoanBalance = Math.max(0, loanPrincipal - newOffsetBalance);
  const effectiveLoanBalanceBefore = Math.max(0, loanPrincipal - currentOffsetBalance);
  
  const interestSavedYear1 = (effectiveLoanBalanceBefore - effectiveLoanBalance) * annualInterestRate;
  const monthlyInterestSaving = interestSavedYear1 / 12;
  
  // Simplified calculation for total interest savings over loan life
  // This assumes the offset balance remains constant (conservative estimate)
  const totalInterestWithoutOffset = calculateTotalInterestPaid(loanPrincipal, monthlyRate, totalPayments);
  const totalInterestWithOffset = calculateTotalInterestPaid(effectiveLoanBalance, monthlyRate, totalPayments);
  const totalInterestSavedOverLife = Math.max(0, totalInterestWithoutOffset - totalInterestWithOffset);
  
  // Calculate years saved on loan (simplified)
  const yearsOffLoan = estimateYearsSaved(loanPrincipal, annualInterestRate, loanTermYears, newOffsetBalance);
  
  return {
    offsetContribution,
    annualInterestRate,
    loanPrincipal,
    currentOffsetBalance,
    interestSavedYear1: Math.round(interestSavedYear1 * 100) / 100,
    newOffsetBalance,
    totalInterestSavedOverLife: Math.round(totalInterestSavedOverLife * 100) / 100,
    yearsOffLoan: Math.round(yearsOffLoan * 100) / 100,
    totalInterestWithoutOffset: Math.round(totalInterestWithoutOffset * 100) / 100,
    totalInterestWithOffset: Math.round(totalInterestWithOffset * 100) / 100,
    monthlyInterestSaving: Math.round(monthlyInterestSaving * 100) / 100,
    annualCashFlowImprovement: Math.round(interestSavedYear1 * 100) / 100,
  };
}

/**
 * Calculate total interest paid over loan term
 */
function calculateTotalInterestPaid(
  principal: number,
  monthlyRate: number,
  totalPayments: number
): number {
  if (principal <= 0 || monthlyRate <= 0) return 0;
  
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  const totalAmountPaid = monthlyPayment * totalPayments;
  return totalAmountPaid - principal;
}

/**
 * Estimate years saved on loan with offset account
 */
function estimateYearsSaved(
  loanPrincipal: number,
  annualInterestRate: number,
  originalTermYears: number,
  offsetBalance: number
): number {
  if (offsetBalance <= 0) return 0;
  if (offsetBalance >= loanPrincipal) return originalTermYears;
  
  const monthlyRate = annualInterestRate / 12;
  const originalPayments = originalTermYears * 12;
  const effectivePrincipal = loanPrincipal - offsetBalance;
  
  // Calculate original monthly payment
  const monthlyPayment = loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, originalPayments)) / 
                        (Math.pow(1 + monthlyRate, originalPayments) - 1);
  
  // Calculate new term with reduced principal but same payment
  if (effectivePrincipal <= 0) return originalTermYears;
  
  const newTermMonths = Math.log(1 + (effectivePrincipal * monthlyRate) / monthlyPayment) / 
                       Math.log(1 + monthlyRate);
  
  const yearsSaved = originalTermYears - (newTermMonths / 12);
  return Math.max(0, yearsSaved);
}

/**
 * Calculate compound interest growth for offset account balance
 */
export function calculateOffsetGrowth(
  initialBalance: number,
  annualContributions: number,
  interestRate: number,
  years: number
): number {
  let balance = initialBalance;
  
  for (let year = 0; year < years; year++) {
    balance += annualContributions;
    balance *= (1 + interestRate);
  }
  
  return Math.round(balance * 100) / 100;
}
