import React from "react";

type TableHeadProps = {
  columns: string[];
};

const TableHead: React.FC<TableHeadProps> = ({ columns }) => {
  return (
    <thead>
      <tr className="bg-[#00000052] h-[54px] font-sukhumvit text-white text-left">
        {columns.map((col, idx) => (
          <th key={idx} className="px-4">
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
