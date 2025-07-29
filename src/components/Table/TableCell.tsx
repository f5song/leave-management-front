type TableCellProps = {
    children: React.ReactNode;
    className?: string;
    hasTopBorder?: boolean;
  };
  
  const TableCell = ({ 
    children,
    className = '', 
    hasTopBorder = false }: TableCellProps) => {
    const borderClass = hasTopBorder ? 'border-t border-[#444] pt-2' : '';
    return <td className={`px-4 ${borderClass} ${className}`}>{children}</td>;
  };
  
  export default TableCell;
  