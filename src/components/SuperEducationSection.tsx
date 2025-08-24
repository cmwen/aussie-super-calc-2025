import { ExternalLink, Info } from 'lucide-react';
import { Card } from './ui';

export function SuperEducationSection() {
  return (
    <Card title="Understanding Superannuation Contributions">
      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Key Contribution Types
              </h4>
              <div className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
                <div>
                  <strong>Personal Deductible:</strong> After-tax contributions you can claim as a tax deduction. 
                  This is what the Money Allocation slider controls - flexible and adjustable anytime.
                </div>
                <div>
                  <strong>Salary Sacrifice:</strong> Pre-tax contributions deducted from your salary. 
                  Reduces your taxable income immediately and is taxed at 15% in super.
                </div>
                <div>
                  <strong>Superannuation Guarantee (SG):</strong> Mandatory 11.5% employer contribution 
                  (increasing to 12% by 2025).
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              Benefits of Super Contributions
            </h4>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>• Tax savings: 15% vs your marginal rate</li>
              <li>• Compound growth over time</li>
              <li>• Retirement security</li>
              <li>• Government co-contributions (if eligible)</li>
            </ul>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
              Important Limits (FY 2024/25)
            </h4>
            <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
              <li>• Concessional cap: $30,000</li>
              <li>• Division 293: Extra 15% tax if income &gt; $250k</li>
              <li>• Can carry forward unused caps (5 years)</li>
              <li>• Age restrictions apply for some contributions</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Official Resources
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a
              href="https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/caps-limits-and-tax-on-super-contributions/concessional-contributions-cap"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              <span>ATO: Concessional Contribution Caps</span>
            </a>
            <a
              href="https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/how-to-save-more-in-your-super/salary-sacrificing-super"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              <span>ATO: Salary Sacrifice</span>
            </a>
            <a
              href="https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/how-to-save-more-in-your-super/personal-super-contributions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              <span>ATO: Personal Deductible Contributions</span>
            </a>
            <a
              href="https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/caps-limits-and-tax-on-super-contributions/division-293-tax-on-concessional-contributions-by-high-income-earners"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              <span>ATO: Division 293 Tax</span>
            </a>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
            ⚠️ Important Disclaimer
          </h4>
          <p className="text-sm text-red-800 dark:text-red-200">
            This calculator provides general information only. Tax laws are complex and can change. 
            Always consult a qualified financial advisor or tax professional before making contribution decisions.
            Consider your personal circumstances, including access to funds until preservation age.
          </p>
        </div>
      </div>
    </Card>
  );
}
