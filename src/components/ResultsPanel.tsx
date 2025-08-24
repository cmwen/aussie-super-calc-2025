import { Card, Alert } from './ui';
import { TaxVsInterestChart, TakeHomeImpactChart } from './Charts';
import { useCalculatorStore } from '@/store/calculator';
import { calculateSuperContribution } from '@/core/super';
import { calculateMortgageOffset } from '@/core/offset';
import { calculateSpouseContributionOffset } from '@/core/spouse';
import { AU_2024_25_CONFIG } from '@/config/au_2024_25';

export function ResultsPanel() {
  const {
    taxableIncome,
    includeMedicareLevy,
    salarySacrifice,
    personalDeductible,
    sgRate,
    loanPrincipal,
    annualInterestRate,
    loanTermYears,
    currentOffsetBalance,
    offsetContribution,
    spouseIncome,
    spouseContribution,
  } = useCalculatorStore();

  // Calculate super contribution results
  const superResult = calculateSuperContribution(
    taxableIncome,
    salarySacrifice,
    personalDeductible,
    sgRate,
    includeMedicareLevy
  );

  // Calculate mortgage offset results
  const offsetResult = calculateMortgageOffset(
    loanPrincipal,
    annualInterestRate,
    loanTermYears,
    currentOffsetBalance,
    offsetContribution
  );

  // Calculate spouse contribution results
  const spouseResult = calculateSpouseContributionOffset(spouseIncome, spouseContribution);

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;

  return (
    <div className="flex-1 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Super Contribution Summary">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Tax Saving:</span>
              <span className="font-semibold text-green-600">{formatCurrency(superResult.taxSaving)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Net into Super:</span>
              <span className="font-semibold">{formatCurrency(superResult.netIntoSuper)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Take Home Change:</span>
              <span className={`font-semibold ${superResult.takeHomePayDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(superResult.takeHomePayDelta)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Marginal Tax Rate:</span>
              <span className="font-semibold">{formatPercentage(superResult.marginalTaxRate)}</span>
            </div>
          </div>
        </Card>

        <Card title="Mortgage Offset Summary">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Annual Interest Saved:</span>
              <span className="font-semibold text-green-600">{formatCurrency(offsetResult.interestSavedYear1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Saving:</span>
              <span className="font-semibold">{formatCurrency(offsetResult.monthlyInterestSaving)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Lifetime Savings:</span>
              <span className="font-semibold">{formatCurrency(offsetResult.totalInterestSavedOverLife)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Years off Loan:</span>
              <span className="font-semibold">{offsetResult.yearsOffLoan.toFixed(1)} years</span>
            </div>
          </div>
        </Card>

        <Card title="Spouse Contribution Summary">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Tax Offset:</span>
              <span className="font-semibold text-green-600">{formatCurrency(spouseResult.taxOffset)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Effective Rate:</span>
              <span className="font-semibold">{spouseResult.effectiveTaxRate.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Net Benefit:</span>
              <span className="font-semibold text-green-600">{formatCurrency(spouseResult.netBenefit)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Tax Savings vs Interest Savings">
          <TaxVsInterestChart
            taxSaving={superResult.taxSaving}
            interestSaving={offsetResult.interestSavedYear1}
          />
        </Card>

        <Card title="Take Home Pay Impact">
          <TakeHomeImpactChart
            takeHomeBefore={superResult.takeHomePayBefore}
            takeHomeAfter={superResult.takeHomePayAfter}
          />
        </Card>
      </div>

      {/* Detailed Breakdown Table */}
      <Card title="Detailed Scenario Comparison">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scenario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Annual Benefit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Take Home Impact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Position
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Super Contribution
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  {formatCurrency(superResult.taxSaving)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(superResult.takeHomePayDelta)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(superResult.netIntoSuper)}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Mortgage Offset
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  {formatCurrency(offsetResult.interestSavedYear1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  -{formatCurrency(offsetContribution)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(offsetContribution)}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Spouse Contribution
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  {formatCurrency(spouseResult.taxOffset)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  -{formatCurrency(spouseContribution)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(spouseContribution)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Warnings and Alerts */}
      {superResult.exceedsConcessionalCap && (
        <Alert
          type="warning"
          title="Concessional Cap Exceeded"
          message={`Total concessional contributions (${formatCurrency(superResult.totalConcessional)}) exceed the annual cap of ${formatCurrency(AU_2024_25_CONFIG.CONCESSIONAL_CAP)}.`}
        />
      )}

      {superResult.division293Applicable && (
        <Alert
          type="info"
          title="Division 293 Tax May Apply"
          message="Your income exceeds $250,000. Additional 15% tax may apply to superannuation contributions. Consult a qualified tax professional."
        />
      )}

      {/* Disclaimer */}
      <Alert
        type="info"
        title="Important Disclaimer"
        message="This calculator is for FY 2024/25 only and provides general information. Results are simplified estimates and may not reflect your full tax situation. Always consult a qualified tax professional before making financial decisions."
      />
    </div>
  );
}
