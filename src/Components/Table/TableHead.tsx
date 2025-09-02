import React from "react";

type TableHeadProps = {
  children: React.ReactNode;
  className?: string;
  rowHeight?: string;
};

const TableHead = ({
  children,
  className = "bg-[#00000052] font-sukhumvit text-white text-[16px]",
  rowHeight = "h-[54px]",
}: TableHeadProps) => {
  return (
    <thead>
      <tr className={`${className} ${rowHeight}`}>
        {children}
      </tr>
    </thead>
  );
};

export default TableHead;
