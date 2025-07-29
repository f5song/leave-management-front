import React from "react";

type TableBodyProps = {
  children: React.ReactNode;
  className?: string;
};

const TableBody = ({ 
  children,
  className = "",
}: TableBodyProps) => {
  return <tbody className={className}>{children}</tbody>;
};

export default TableBody;
