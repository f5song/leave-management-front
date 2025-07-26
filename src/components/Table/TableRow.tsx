const TableRow = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <tr className={`text-[var(--color-font-gray)] font-sukhumvit ${className}`}>
      {children}
    </tr>
  );
};

export default TableRow;
