import React from "react";

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

const TableBody = ({ 
  children,
  className = "",
}: TableBodyProps) => {
  return <tbody className={className}>{children}</tbody>;
};

export default TableBody;
