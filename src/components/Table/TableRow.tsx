import React from "react";
import { ArrowIcon } from "@/Shared/Asseet/Icons";

type LeaveItem = {
  [key: string]: any;
};

type Column = {
  key: string; // ชื่อฟิลด์ใน item
  label?: string; // ถ้าต้องการ
  className?: string; // ใส่ class เฉพาะคอลัมน์นี้ได้
  render?: (value: any, item: LeaveItem) => React.ReactNode; // custom render เฉพาะคอลัมน์นี้
};

type TableRowProps = {
  item: LeaveItem;
  index: number;
  columns: Column[];
  getStatusClass: (status: string) => string;
};

const TableRow: React.FC<TableRowProps> = ({
  item,
  index,
  columns,
  getStatusClass,
}) => {
  return (
    <tr className="text-[var(--color-font-gray)] font-sukhumvit">
      {columns.map((col, colIndex) => {
        const value = item[col.key];
        return (
          <td
            key={colIndex}
            className={`px-4 ${index !== 0 ? "border-t border-[#444] pt-2" : ""} ${
              col.className || ""
            }`}
          >
            {col.render
              ? col.render(value, item) // ถ้าใส่ render มา ให้ใช้ render นั้น
              : value}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
