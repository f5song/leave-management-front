import React from "react";

type TableHeadProps = {
  columns: {
    label: string;
  }[];
};

const TableHead: React.FC<TableHeadProps> = ({ columns }) => {
  return (
    <thead className="bg-[#00000052] text-white h-[54px]">
      <tr>
        {columns.map((col, index) => (
          <th
            key={index}
            className={`px-4 py-2 font-bold font-sukhumvit text-left`}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
