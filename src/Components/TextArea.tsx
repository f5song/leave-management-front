import React from 'react';
import clsx from 'clsx';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error = false, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          'font-sukhumvit text-[var(--color-font)] p-[12px] rounded-[4px] backdrop-blur-[8px] transition duration-200',
          'bg-[#00000052] text-[var(--color-font)] placeholder-[var(--color-font)] border border-transparent',
          'hover:border-[#FFD000] hover:text-[#FFD000] hover:placeholder-[#FFD000]',
          'active:border-[#FFFFFF] active:text-[#FFFFFF] active:outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#1A1A1A]',
          error && 'border-red-500 text-red-500 placeholder-red-500',
          className
        )}
        {...props}
        rows={3}
      />
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
