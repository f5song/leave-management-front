import React from "react";

type Column = {
  label: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  align?: "left" | "center" | "right";
};

type TableHeadProps = {
  columns: Column[];
  rowHeight?: string;
  className?: string;
};

const TableHead = ({
  columns,
  rowHeight = "h-[54px]",
  className = "bg-[#00000052] font-sukhumvit text-white text-left font-size-[16px] gap-5",
}: TableHeadProps) => {
  return (
    <thead>
      <tr className={`${className} ${rowHeight}`}>
        {columns.map((col, index) => (
          <th
            key={index}
            className={`px-4 py-2 ${col.width ?? ""} ${col.className ?? ""} ${
              col.align ? `text-${col.align}` : ""
            }`}
            style={col.style}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
