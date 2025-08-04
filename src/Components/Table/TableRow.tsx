type TableRowProps = {
    children: React.ReactNode;
    className?: string;
    hasTopBorder?: boolean;
}

const TableRow = ({
  children,
  className = "",
  hasTopBorder = false,
}: TableRowProps) => {
  const borderClass = hasTopBorder ? 'border-t border-[#444] pt-2' : '';
  return (
    <tr className={`text-[var(--color-font-gray)] font-sukhumvit ${borderClass} ${className}`}>
      {children}
    </tr>
  );
};

export default TableRow;
