import { describe, it, expect } from 'vitest';
import { calculateSuperContribution } from '../core/super';

describe('Super Calculations', () => {
  describe('calculateSuperContribution', () => {
    it('should calculate salary sacrifice scenario correctly', () => {
      const result = calculateSuperContribution(80000, 10000, 0, 0.115, true);
      
      expect(result.salarySacrifice).toBe(10000);
      expect(result.personalDeductible).toBe(0);
      expect(result.employerSG).toBe(9200); // 80000 * 0.115
      expect(result.totalConcessional).toBe(19200);
      expect(result.taxableIncomeAfter).toBe(70000);
      expect(result.contributionsTax).toBe(1500); // 10000 * 0.15
      expect(result.netIntoSuper).toBe(8500); // 10000 - 1500
      expect(result.exceedsConcessionalCap).toBe(false);
    });

    it('should detect concessional cap excess', () => {
      const result = calculateSuperContribution(100000, 25000, 0, 0.115, true);
      
      expect(result.totalConcessional).toBe(36500); // 11500 + 25000
      expect(result.exceedsConcessionalCap).toBe(true);
    });

    it('should calculate personal deductible contribution correctly', () => {
      const result = calculateSuperContribution(80000, 0, 15000, 0.115, true);
      
      expect(result.personalDeductible).toBe(15000);
      expect(result.taxableIncomeAfter).toBe(80000); // No change for personal deductible
      expect(result.contributionsTax).toBe(2250); // 15000 * 0.15
      expect(result.netIntoSuper).toBe(12750);
    });

    it('should detect Division 293 applicability', () => {
      const result = calculateSuperContribution(300000, 10000, 0, 0.115, true);
      
      expect(result.division293Applicable).toBe(true);
    });
  });
});
