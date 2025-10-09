import { EmptyState } from "./EmptyState";
import { HolidayCard } from "./HolidayCard";
import { BirthdayCard } from "./BirthdayCard";
import { CakeIcon } from "@/Shared/Asseet/Icons";
import { IHoliday } from "@/Interfaces/holidays.interface";
import { IBirthDay } from "@/Interfaces/user.interface";

interface MonthlyViewProps {
    filteredHolidays: IHoliday[];
    filteredBirthdays: IBirthDay[];
}
export const MonthlyView = ({ filteredHolidays, filteredBirthdays }: MonthlyViewProps) => (
  <>
    {/* Holidays Section */}
    <div className="flex flex-wrap gap-3">
      {filteredHolidays.length === 0 ? (
        <EmptyState message="เดือนนี้ไม่มีวันหยุด" />
      ) : (
        filteredHolidays.map(holiday => (
          <HolidayCard key={holiday.id} holiday={holiday} />
        ))
      )}
    </div>

    {/* Birthdays Section */}
    <div className="mt-12">
      <h3 className="font-prompt font-semibold mb-3 flex items-center gap-2 text-[18px] md:text-[20px]">
        <CakeIcon className="w-6 h-6 md:w-8 md:h-8 fill-white" /> วันเกิดพนักงานสุดน่ารัก
      </h3>
      <div className="flex flex-wrap gap-3">
        {filteredBirthdays.length === 0 ? (
          <EmptyState message="เดือนนี้ไม่มีวันเกิด" />
        ) : (
          filteredBirthdays.map((birthday, index) => (
            <BirthdayCard key={index} birthday={birthday} />
          ))
        )}
      </div>
    </div>
  </>
);
