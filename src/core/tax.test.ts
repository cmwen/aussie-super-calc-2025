import { describe, it, expect } from 'vitest';
import { calculateIncomeTax, calculateMedicareLevy, getMarginalTaxRate, calculateTotalTax } from '../core/tax';

describe('Tax Calculations', () => {
  describe('calculateIncomeTax', () => {
    it('should calculate zero tax for income below tax-free threshold', () => {
      expect(calculateIncomeTax(18200)).toBe(0);
      expect(calculateIncomeTax(10000)).toBe(0);
    });

    it('should calculate correct tax for 16% bracket', () => {
      expect(calculateIncomeTax(30000)).toBe(1888); // (30000 - 18200) * 0.16
    });

    it('should calculate correct tax for 30% bracket', () => {
      // For $80,000: 
      // $0-$18,200: $0
      // $18,201-$45,000: $4,288 (26,800 * 0.16)
      // $45,001-$80,000: $10,500 (35,000 * 0.30)
      // Total: $14,788
      expect(calculateIncomeTax(80000)).toBeCloseTo(14788, 0);
    });

    it('should calculate correct tax for high income', () => {
      // For $200,000:
      // $0-$18,200: $0
      // $18,201-$45,000: $4,288
      // $45,001-$135,000: $27,000 (90,000 * 0.30) 
      // $135,001-$190,000: $20,350 (55,000 * 0.37)
      // $190,001-$200,000: $4,500 (10,000 * 0.45)
      // Total: $56,138
      expect(calculateIncomeTax(200000)).toBeCloseTo(56138, 0);
    });
  });

  describe('calculateMedicareLevy', () => {
    it('should not apply Medicare levy below threshold', () => {
      expect(calculateMedicareLevy(20000, true)).toBe(0);
    });

    it('should apply Medicare levy above threshold', () => {
      expect(calculateMedicareLevy(50000, true)).toBe(1000); // 50000 * 0.02
    });

    it('should not apply Medicare levy when disabled', () => {
      expect(calculateMedicareLevy(50000, false)).toBe(0);
    });
  });

  describe('getMarginalTaxRate', () => {
    it('should return correct marginal tax rates', () => {
      expect(getMarginalTaxRate(15000, false)).toBe(0);
      expect(getMarginalTaxRate(30000, false)).toBe(0.16);
      expect(getMarginalTaxRate(80000, false)).toBe(0.30);
      expect(getMarginalTaxRate(150000, false)).toBe(0.37);
      expect(getMarginalTaxRate(200000, false)).toBe(0.45);
    });

    it('should include Medicare levy in marginal rate when applicable', () => {
      expect(getMarginalTaxRate(30000, true)).toBe(0.18); // 16% + 2%
      expect(getMarginalTaxRate(80000, true)).toBe(0.32); // 30% + 2%
    });
  });

  describe('calculateTotalTax', () => {
    it('should combine income tax and Medicare levy correctly', () => {
      const result = calculateTotalTax(80000, true);
      expect(result.incomeTax).toBeCloseTo(14788, 0);
      expect(result.medicareLevy).toBe(1600);
      expect(result.totalTax).toBeCloseTo(16388, 0);
    });
  });
});
