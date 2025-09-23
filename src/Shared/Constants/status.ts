export const STATUS_FILTERS = [
  { label: "ทั้งหมด", value: "ALL" },
  { label: "มีในสต๊อค", value: "AVAILABLE" },
  { label: "ไม่พร้อมใช้งาน", value: "UNAVAILABLE" },
  { label: "ซ่อมบำรุง", value: "REPAIR" },
] as const;

export const STATUS_REQUEST = [
  { label: "อนุมัติ", value: "APPROVED", color: "#34D399" },
  { label: "รออนุมัติ", value: "PENDING", color: "#6FA5F7" },
  { label: "ปฏิเสธ", value: "REJECTED", color: "#EF4444" },
] as const;

export const STATUS_TABS = [
  { label: "อนุมัติ", value: "APPROVED", color: "#34D399" },
  { label: "รออนุมัติ", value: "PENDING", color: "#6FA5F7" },
  { label: "ปฏิเสธ", value: "REJECTED", color: "#EF4444" },
] as const;

export type FilterValue = typeof STATUS_FILTERS[number]['value'];