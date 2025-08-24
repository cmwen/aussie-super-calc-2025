import { InputsPanel } from './components/InputsPanel';
import { ResultsPanel } from './components/ResultsPanel';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Aussie Super Calculator 2025
              </h1>
              <p className="text-gray-600 mt-2">
                Compare Super contributions vs Mortgage Offset for FY 2024/25
              </p>
            </div>
            <div className="text-sm text-gray-500">
              FY 2024/25 • Australian Tax Residents Only
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Panel */}
          <div className="lg:w-1/3">
            <InputsPanel />
          </div>

          {/* Results Panel */}
          <div className="lg:w-2/3">
            <ResultsPanel />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              <strong>Important Disclaimer:</strong> This calculator is for general information and educational purposes only. 
              It applies to Australia FY 2024/25 only. Calculations are simplified and may not reflect your full personal situation, 
              fees, or all tax rules. Results do not constitute tax, financial, or legal advice.
            </p>
            <p className="text-xs text-gray-500">
              Always consult a qualified tax professional before making financial decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
