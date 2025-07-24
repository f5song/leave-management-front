import React from "react";

type TableHeadProps = {
  columns: string[];
};

const TableHead: React.FC<TableHeadProps> = ({ columns }) => {
  return (
    <thead className="bg-gray-200">
      <tr>
        {columns.map((col, index) => (
          <th
            key={index}
            className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
