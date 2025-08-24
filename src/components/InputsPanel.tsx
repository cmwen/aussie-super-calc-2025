import { InputField } from './ui/InputField';
import { Card, Alert } from './ui';
import { useCalculatorStore } from '@/store/calculator';
import { AU_2024_25_CONFIG } from '@/config/au_2024_25';

export function InputsPanel() {
  const {
    taxableIncome,
    includeMedicareLevy,
    salarySacrifice,
    personalDeductible,
    sgRate,
    currentSuperBalance,
    investmentStrategy,
    loanPrincipal,
    annualInterestRate,
    loanTermYears,
    currentOffsetBalance,
    offsetContribution,
    spouseIncome,
    spouseContribution,
    projectionYears,
    updateInput,
  } = useCalculatorStore();

  const totalConcessional = (taxableIncome * sgRate) + salarySacrifice + personalDeductible;
  const exceedsConcessionalCap = totalConcessional > AU_2024_25_CONFIG.CONCESSIONAL_CAP;
  const division293Applicable = taxableIncome >= AU_2024_25_CONFIG.DIVISION_293_THRESHOLD;

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Personal Income */}
      <Card title="Personal Income">
        <InputField
          label="Taxable Income"
          value={taxableIncome}
          onChange={(value) => updateInput('taxableIncome', value)}
          type="currency"
          placeholder="Enter your taxable income"
        />
        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="medicare-levy"
            checked={includeMedicareLevy}
            onChange={(e) => updateInput('includeMedicareLevy', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="medicare-levy" className="text-sm text-gray-700">
            Include Medicare Levy (2%)
          </label>
        </div>
      </Card>

      {/* Super Contributions */}
      <Card title="Super Contributions">
        <InputField
          label="Salary Sacrifice"
          value={salarySacrifice}
          onChange={(value) => updateInput('salarySacrifice', value)}
          type="currency"
          placeholder="Annual salary sacrifice amount"
        />
        
        <InputField
          label="Personal Deductible Contribution"
          value={personalDeductible}
          onChange={(value) => updateInput('personalDeductible', value)}
          type="currency"
          placeholder="Personal deductible contribution"
        />
        
        <InputField
          label="Superannuation Guarantee Rate"
          value={sgRate}
          onChange={(value) => updateInput('sgRate', value / 100)}
          type="percentage"
          step={0.1}
          min={0}
          max={20}
        />
        
        <InputField
          label="Current Super Balance"
          value={currentSuperBalance}
          onChange={(value) => updateInput('currentSuperBalance', value)}
          type="currency"
          placeholder="Your current super balance"
        />
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Investment Strategy
          </label>
          <select
            value={investmentStrategy}
            onChange={(e) => updateInput('investmentStrategy', e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="CONSERVATIVE">Conservative (5%)</option>
            <option value="BALANCED">Balanced (7%)</option>
            <option value="GROWTH">Growth (9%)</option>
          </select>
        </div>

        {exceedsConcessionalCap && (
          <Alert
            type="warning"
            title="Concessional Cap Exceeded"
            message={`Total concessional contributions ($${totalConcessional.toLocaleString()}) exceed the $30,000 cap. Excess may be taxed at your marginal rate.`}
          />
        )}

        {division293Applicable && (
          <Alert
            type="info"
            title="Division 293 May Apply"
            message="Your income exceeds $250,000. Additional 15% tax may apply to super contributions. Consult a tax professional."
          />
        )}
      </Card>

      {/* Mortgage Offset */}
      <Card title="Mortgage Offset">
        <InputField
          label="Loan Principal"
          value={loanPrincipal}
          onChange={(value) => updateInput('loanPrincipal', value)}
          type="currency"
          placeholder="Outstanding loan amount"
        />
        
        <InputField
          label="Annual Interest Rate"
          value={annualInterestRate}
          onChange={(value) => updateInput('annualInterestRate', value / 100)}
          type="percentage"
          step={0.01}
          min={0}
          max={15}
        />
        
        <InputField
          label="Loan Term (Years)"
          value={loanTermYears}
          onChange={(value) => updateInput('loanTermYears', value)}
          type="number"
          min={1}
          max={40}
          step={1}
        />
        
        <InputField
          label="Current Offset Balance"
          value={currentOffsetBalance}
          onChange={(value) => updateInput('currentOffsetBalance', value)}
          type="currency"
          placeholder="Current offset account balance"
        />
        
        <InputField
          label="Additional Offset Contribution"
          value={offsetContribution}
          onChange={(value) => updateInput('offsetContribution', value)}
          type="currency"
          placeholder="Amount to add to offset"
        />
      </Card>

      {/* Spouse Contribution */}
      <Card title="Spouse Contribution">
        <InputField
          label="Spouse Income"
          value={spouseIncome}
          onChange={(value) => updateInput('spouseIncome', value)}
          type="currency"
          placeholder="Spouse's taxable income"
        />
        
        <InputField
          label="Spouse Super Contribution"
          value={spouseContribution}
          onChange={(value) => updateInput('spouseContribution', value)}
          type="currency"
          placeholder="Contribution to spouse's super"
        />
        
        {spouseIncome >= AU_2024_25_CONFIG.SPOUSE_OFFSET_INCOME_THRESHOLD_HIGH && (
          <Alert
            type="info"
            title="No Spouse Offset Available"
            message="Spouse income exceeds $40,000. No tax offset available for spouse contributions."
          />
        )}
      </Card>

      {/* Projection Settings */}
      <Card title="Projection Settings">
        <InputField
          label="Projection Years"
          value={projectionYears}
          onChange={(value) => updateInput('projectionYears', value)}
          type="number"
          min={1}
          max={40}
          step={1}
        />
      </Card>
    </div>
  );
}
