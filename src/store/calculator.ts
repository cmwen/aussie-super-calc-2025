import { create } from 'zustand';
import { InvestmentStrategy } from '@/config/au_2024_25';

export interface CalculatorInputs {
  // Personal details
  taxableIncome: number;
  includeMedicareLevy: boolean;
  
  // Total amount to allocate between super and offset
  totalAvailableAmount: number;
  superAllocationPercentage: number; // 0-100, determines split between super and offset
  
  // Super contributions (calculated from allocation)
  salarySacrifice: number;
  personalDeductible: number;
  sgRate: number; // Superannuation Guarantee rate
  currentSuperBalance: number;
  investmentStrategy: InvestmentStrategy;
  
  // Mortgage details
  loanPrincipal: number;
  annualInterestRate: number;
  loanTermYears: number;
  currentOffsetBalance: number;
  offsetContribution: number; // calculated from allocation
  
  // Spouse details
  spouseIncome: number;
  spouseContribution: number;
  
  // Projection settings
  projectionYears: number;
}

export interface CalculatorStore extends CalculatorInputs {
  // Actions
  updateInput: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
  updateAllocation: (percentage: number) => void;
  resetInputs: () => void;
}

const defaultInputs: CalculatorInputs = {
  taxableIncome: 80000,
  includeMedicareLevy: true,
  totalAvailableAmount: 20000,
  superAllocationPercentage: 50, // 50% to super, 50% to offset by default
  salarySacrifice: 0, // Keep separate from allocation slider
  personalDeductible: 10000, // Now controlled by allocation slider
  sgRate: 0.115,
  currentSuperBalance: 100000,
  investmentStrategy: 'BALANCED',
  loanPrincipal: 500000,
  annualInterestRate: 0.06,
  loanTermYears: 30,
  currentOffsetBalance: 50000,
  offsetContribution: 10000,
  spouseIncome: 30000,
  spouseContribution: 3000,
  projectionYears: 10,
};

export const useCalculatorStore = create<CalculatorStore>((set: any) => ({
  ...defaultInputs,
  
  updateInput: (key: any, value: any) => 
    set((state: any) => ({ ...state, [key]: value })),
  
  updateAllocation: (percentage: number) => 
    set((state: any) => {
      const superAmount = (state.totalAvailableAmount * percentage) / 100;
      const offsetAmount = state.totalAvailableAmount - superAmount;
      return {
        ...state,
        superAllocationPercentage: percentage,
        personalDeductible: superAmount, // Now using personal deductible instead of salary sacrifice
        offsetContribution: offsetAmount,
      };
    }),
  
  resetInputs: () => set(defaultInputs),
}));
