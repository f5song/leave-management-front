import { STATUS_TABS } from "@/Shared/Constants/status";

/**
 * แปลง status value เป็น label
 * ถ้าไม่เจอ label คืนค่า value เดิม
 */
export const getStatusLabel = (value?: string) => {
  if (!value) return "-";
  return STATUS_TABS.find((s) => s.value === value)?.label ?? value;
};
