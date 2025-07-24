import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, className, ...props }, ref) => {
    return (
      <input
        ref={ref} 
        className={clsx(
          'text-[var(--color-font)] h-[49px] p-[12px] rounded-[4px] backdrop-blur-[8px] transition duration-200',
          'bg-[#00000052] text-[var(--color-font)] placeholder-[var(--color-font)] border border-transparent',
          'hover:border-[#FFD000] hover:text-[#FFD000] hover:placeholder-[#FFD000]',
          'active:border-[#FFFFFF] active:text-[#FFFFFF] active:outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#1A1A1A]',
          error && 'border-red-500 text-red-500 placeholder-red-500',
          className
        )}
        {...props}
      />
    );
  }
);

// จำเป็น: ตั้ง display name เพื่อไม่ให้ React เตือน
Input.displayName = 'Input';

export default Input;
