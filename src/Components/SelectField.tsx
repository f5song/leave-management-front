import React from 'react';

interface Option  {
  value: string;
  label: string;
};

interface SelectFieldProps  {
  id?: string;
  label: string;
  name: string;
  value: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  className,
  id,
  name,
  value,
  options,
  disabled = false,
  onChange,
  placeholder = 'กรุณาเลือก',
}) => {
  return (
    <div className="flex flex-col gap-2 w-full font-sukhumvit">
      <select
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`
          ${className}
          h-[49px] p-[12px] rounded-[4px]
          bg-[#00000052] backdrop-blur-[8px]
          text-gray-400

          hover:border-yellow-400 hover:text-yellow-400
          focus:outline-none focus:border-white focus:text-white

          disabled:cursor-not-allowed
        `}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;