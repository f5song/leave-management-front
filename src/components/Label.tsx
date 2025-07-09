// components/ui/Label.tsx
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ required = false, children, ...props }) => (
  <label
    className="text-[16px] text-[var(--color-font)] font-sukhumvit"
    {...props}
  >
    {children}
    {required && <span className="text-[#FFA100] ml-1">*</span>}
  </label>
);

export default Label;
