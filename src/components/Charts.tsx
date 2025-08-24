import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TaxVsInterestChartProps {
  taxSaving: number;
  interestSaving: number;
  className?: string;
}

export function TaxVsInterestChart({ taxSaving, interestSaving, className = '' }: TaxVsInterestChartProps) {
  const data = [
    {
      name: 'Annual Savings',
      'Tax Savings (Super)': Math.max(0, taxSaving),
      'Interest Savings (Offset)': Math.max(0, interestSaving),
    },
  ];

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  return (
    <div className={`w-full h-80 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatCurrency} />
          <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
          <Legend />
          <Bar dataKey="Tax Savings (Super)" fill="#3B82F6" />
          <Bar dataKey="Interest Savings (Offset)" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface TakeHomeImpactChartProps {
  takeHomeBefore: number;
  takeHomeAfter: number;
  className?: string;
}

export function TakeHomeImpactChart({ takeHomeBefore, takeHomeAfter, className = '' }: TakeHomeImpactChartProps) {
  const data = [
    {
      name: 'Before',
      'Take Home Pay': takeHomeBefore,
    },
    {
      name: 'After',
      'Take Home Pay': takeHomeAfter,
    },
  ];

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  return (
    <div className={`w-full h-80 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatCurrency} />
          <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
          <Legend />
          <Bar dataKey="Take Home Pay" fill="#8B5CF6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
