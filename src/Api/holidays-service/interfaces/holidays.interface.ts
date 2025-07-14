// api/holidays.interface.ts
export interface IHoliday {
    id: string;
    title: string;
    startDate: string;  // ISO date string
    endDate: string;    // ISO date string
    description: string;
    totalDays: number;
    color: string;
  }
  