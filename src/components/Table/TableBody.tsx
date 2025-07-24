import React from "react";
import TableRow from "./TableRow";

type LeaveItem = {
  [key: string]: any;
};

type Column = {
  key: string;
  label?: string;
  className?: string;
  render?: (value: any, item: LeaveItem) => React.ReactNode;
};

type TableBodyProps = {
  data: LeaveItem[];
  columns: Column[];
  getStatusClass: (status: string) => string;
};

const TableBody: React.FC<TableBodyProps> = ({ data, columns, getStatusClass }) => {
  return (
    <tbody>
      {data.map((item, index) => (
        <TableRow
          key={index}
          item={item}
          index={index}
          columns={columns}
          getStatusClass={getStatusClass}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
