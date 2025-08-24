import { create } from 'zustand';
import { InvestmentStrategy } from '@/config/au_2024_25';

export interface CalculatorInputs {
  // Personal details
  taxableIncome: number;
  includeMedicareLevy: boolean;
  
  // Super contributions
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
  offsetContribution: number;
  
  // Spouse details
  spouseIncome: number;
  spouseContribution: number;
  
  // Projection settings
  projectionYears: number;
}

export interface CalculatorStore extends CalculatorInputs {
  // Actions
  updateInput: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
  resetInputs: () => void;
}

const defaultInputs: CalculatorInputs = {
  taxableIncome: 80000,
  includeMedicareLevy: true,
  salarySacrifice: 0,
  personalDeductible: 0,
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
  
  resetInputs: () => set(defaultInputs),
}));
