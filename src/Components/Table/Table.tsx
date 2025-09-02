// // Table.tsx
// import React from "react";

// const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <div className="overflow-x-auto">{children}</div>
// );

// const Head: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <thead className="bg-[#1f1f1f] text-left text-sm text-white">{children}</thead>
// );

// const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <tbody className="text-gray-300">{children}</tbody>
// );

// const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <tr className="border-b border-gray-700">{children}</tr>
// );

// // ✅ export แบบ object ที่ใช้ JSX ได้
// const Table = {
//   Container,
//   Head,
//   Body,
//   Row,
// } as const;

// export default Table;


import Row from "./TableRow";
import Head from "./TableHead";
import Body from "./TableBody";
import Container from "./Container";
import Cell from "./TableCell";
import HeadCell from "./TableHead";

const Table = {
  Row,
  Head,
  Body,
  Container,
  Cell,
  HeadCell,
} as const;

export default Table;
