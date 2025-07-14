import { IHoliday } from '../interfaces/holidays.interface';

export const expandHolidayDates = (holidays: IHoliday[]) => {
  const expanded: IHoliday[] = [];

  holidays.forEach(holiday => {
    const start = new Date(holiday.startDate);
    const end = new Date(holiday.endDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      expanded.push({
        ...holiday,
        startDate: new Date(d).toISOString(),
        endDate: new Date(d).toISOString(),
      });
    }
  });

  return expanded;
};
