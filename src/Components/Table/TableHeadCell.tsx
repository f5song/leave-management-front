import React from "react";

interface TableHeadCellProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  align?: "left" | "center" | "right";
}

const TableHeadCell = ({
  children,
  width = "",
  height = "",
  className = "",
  style,
  align = "left",
}: TableHeadCellProps) => {
  return (
    <th
      className={`px-4 py-2 ${width} ${height} ${className} text-${align} font-sukhumvit text-white bg-[#00000052]`}
      style={style}
    >
      {children}
    </th>
  );
};

export default TableHeadCell;
