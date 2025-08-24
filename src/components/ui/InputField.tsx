interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  type?: 'currency' | 'percentage' | 'number';
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export function InputField({
  label,
  value,
  onChange,
  type = 'number',
  placeholder,
  disabled = false,
  min = 0,
  max,
  step = 1,
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.-]/g, '');
    const numValue = parseFloat(rawValue);
    
    if (isNaN(numValue)) {
      onChange(0);
    } else {
      const clampedValue = Math.max(min, max ? Math.min(max, numValue) : numValue);
      onChange(clampedValue);
    }
  };

  const formatValue = (val: number): string => {
    if (val === 0) return '';
    
    switch (type) {
      case 'currency':
        return val.toLocaleString('en-AU');
      case 'percentage':
        return (val * 100).toString();
      default:
        return val.toString();
    }
  };

  const getPrefix = (): string => {
    switch (type) {
      case 'currency':
        return '$';
      case 'percentage':
        return '';
      default:
        return '';
    }
  };

  const getSuffix = (): string => {
    switch (type) {
      case 'percentage':
        return '%';
      default:
        return '';
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        {getPrefix() && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {getPrefix()}
          </span>
        )}
        <input
          type="text"
          value={formatValue(value)}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          step={step}
          className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
            getPrefix() ? 'pl-8' : ''
          } ${getSuffix() ? 'pr-8' : ''} ${disabled ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
        />
        {getSuffix() && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {getSuffix()}
          </span>
        )}
      </div>
    </div>
  );
}
