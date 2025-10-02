export const STATUS_FILTERS = [
  { label: "ทั้งหมด", value: "ALL", color: "#676767" },
  { label: "มีในสต๊อค", value: "AVAILABLE", color: "#34D399" },
  { label: "ไม่พร้อมใช้งาน", value: "UNAVAILABLE", color: "#EF4444" },
] as const;


export const STATUS_TABS = [
  // { label: "ทั้งหมด", value: "ALL" , color: "#676767"},
  { label: "อนุมัติ", value: "APPROVED", color: "#34D399" },
  { label: "รออนุมัติ", value: "PENDING", color: "#6FA5F7" },
  { label: "ปฏิเสธ", value: "REJECTED", color: "#EF4444" },
] as const;

export type FilterValue = typeof STATUS_FILTERS[number]['value'];