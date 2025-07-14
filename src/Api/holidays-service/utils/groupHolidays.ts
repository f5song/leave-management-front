import { IHoliday } from '../interfaces/holidays.interface';

export type HolidaysByMonth = {
  [month: string]: IHoliday[];
};

const monthNames = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

export const groupHolidaysByMonth = (holidays: IHoliday[]): HolidaysByMonth => {
  return holidays.reduce((acc, holiday) => {
    const monthIndex = new Date(holiday.startDate).getMonth();
    const monthName = monthNames[monthIndex];

    if (!acc[monthName]) {
      acc[monthName] = [];
    }
    acc[monthName].push(holiday);
    return acc;
  }, {} as HolidaysByMonth);
};
