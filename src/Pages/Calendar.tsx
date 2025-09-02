import BackgroundGradient from "@/Components/BackgroundGradient";
import Navbar from "@/Components/Navbar";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import { useNavigate } from "react-router-dom";
import SelectField from "@/Components/SelectField";
import { ArrowIcon, BackIcon, CalendarIcon, ComputerIcon, EditIcon } from "@/Shared/Asseet/Icons";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import LeaveModal from "@/Components/Modals/LeaveModal";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DividerLine from "@/Components/HorizontalDivider";
import HorizontalDivider from "@/Components/HorizontalDivider";
import LeaveRequestModal from "@/Components/Modals/LeaveRequestModal";
import { useAuth } from "@/Context/AuthContext";
import { IHoliday } from "@/Api/holidays-service/interfaces/holidays.interface";
import { useQuery } from "@tanstack/react-query";
import { getHolidays } from "@/Api/holidays-service";
import { getLeaves, getLeavesByUser } from "@/Api/leave-service";

const mockUser = {
  firstName: "สมชาย",
  lastName: "ใจดี",
  email: "somchai@example.com",
  departmentId: "dep1",
  jobTitleId: "title1",
  nickName: "ชาย",
  birthDate: "1995-08-10",
  googleId: "somchai.google",
  avatarUrl: "https://via.placeholder.com/160",
};

const holidays = [
  {
    id: 1,
    title: 'วันหยุด: วันเฉลิมพระชนมพรรษา สมเด็จพระนางเจ้าสุทิดา พัชรสุธาพิมลลักษณ พระบรมราชินี',
    startDate: '2025-07-27',
    endDate: '2025-07-28',
    totalDays: 2,
    color: '#6FA5F7',
    backgroundColor: '#6FA5F752'
  }
]

const leavesmock = [
  {
    id: 3,
    employee: 'สุดารัตน์ สวยมาก',
    type: 'ลาป่วย',
    totalDays: 3,
    title: 'เดินทางไปกรุงเทพ',
    description: 'ลาป่วยเนื่องจากมีอาการไม่สบายและต้องเดินทางไปพบแพทย์ที่กรุงเทพฯ',
    startDate: '2025-07-28',
    endDate: '2025-07-30',
    color: '#00FFBB',
    backgroundColor: '#FFFFFF14',
  },
  {
    id: 3,
    employee: 'สุดารัตน์ สวยมาก',
    type: 'ลาป่วย',
    totalDays: 3,
    title: 'เดินทางไปกรุงเทพ',
    description: 'ลาป่วยเนื่องจากมีอาการไม่สบายและต้องเดินทางไปพบแพทย์ที่กรุงเทพฯ',
    startDate: '2025-07-28',
    endDate: '2025-07-30',
    color: '#00FFBB',
    backgroundColor: '#FFFFFF14',
  },
  {
    id: 3,
    employee: 'สุดารัตน์ สวยมาก',
    type: 'ลาป่วย',
    totalDays: 3,
    title: 'เดินทางไปกรุงเทพ',
    description: 'ลาป่วยเนื่องจากมีอาการไม่สบายและต้องเดินทางไปพบแพทย์ที่กรุงเทพฯ',
    startDate: '2025-07-28',
    endDate: '2025-07-30',
    color: '#00FFBB',
    backgroundColor: '#FFFFFF14',
  },
  {
    id: 4,
    employee: 'ปกรณ์ ตั้งใจทำงาน',
    type: 'ลาพักร้อน',
    totalDays: 2,
    title: 'เดินทางไปกรุงเทพ',
    description: 'พักร้อนเพื่อไปท่องเที่ยวและทำธุระที่กรุงเทพฯ',
    startDate: '2025-07-28',
    endDate: '2025-07-29',
    color: '#00FFBB',
    backgroundColor: '#FFFFFF14',
  },
  {
    id: 5,
    employee: 'วิภา ใจงาม',
    type: 'ลาพักร้อน',
    totalDays: 1,
    title: 'วันหยุดประจำปี',
    description: 'วันหยุดพักผ่อนประจำปี',
    startDate: '2025-07-29',
    endDate: '2025-07-29',
    color: '#FFD700',
    backgroundColor: '#FFFFFF14',
  },
  {
    id: 6,
    employee: 'อนันต์ สายชิล',
    type: 'ลาพักร้อน',
    totalDays: 2,
    title: 'พักร้อนยาววววววววววววววว',
    description: 'พักร้อนเดินทางไปพักผ่อนต่างจังหวัด',
    startDate: '2025-07-30',
    endDate: '2025-07-31',
    color: '#FFD700',
    backgroundColor: '#FFFFFF14',
  },
  {
    id: 7,
    employee: 'พิมพ์ชนก สายบุญ',
    type: 'ลาพักร้อน',
    totalDays: 3,
    title: 'วันหยุดพิเศษ',
    description: 'หยุดพิเศษสำหรับงานครอบครัว',
    startDate: '2025-08-03',
    endDate: '2025-08-05',
    color: '#F2FF00',
    backgroundColor: '#FFFFFF14',
  },
  {
    id: 8,
    employee: 'ณัฐพล อ่านหนังสือเก่ง',
    type: 'ลาพักร้อน',
    totalDays: 2,
    title: 'วันลงชื่อหนังสือร่วมมมมมมมมมมมมมม',
    description: 'เดินทางเพื่อเข้าร่วมงานลงชื่อหนังสือ',
    startDate: '2025-08-04',
    endDate: '2025-08-05',
    color: '#6FA5F7',
    backgroundColor: '#FFFFFF14',
  },
];


const monthNames = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const dayNames = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];




const Calendar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
  const [isFacilitiesModalOpen, setFacilitiesModalOpen] = useState(false);
  const toggleLeaveModal = () => setLeaveModalOpen((v) => !v);
  const toggleFacilitiesModal = () => setFacilitiesModalOpen((v) => !v);

  const [formData, setFormData] = useState({
    googleId: user?.googleId,
    firstName: user?.firstName,
    lastName: user?.lastName,
    nickName: user?.nickName,
    avatarUrl: user?.avatarUrl,
    birthDate: user?.birthDate,
    jobTitleId: user?.jobTitleId,
    departmentId: user?.departmentId,
    email: user?.email,
    role: user?.role,
  });
  console.log('user', user);

  //query
  //leaves calendar VV1
  // const { data: leaves = [] } = useQuery({
  //   queryKey: ['leaves', user.role], // key ต่างกันตาม role
  //   queryFn: () => {
  //     if (user.role === 'admin') {
  //       return getLeaves();
  //     } else {
  //       return getLeaves().then((data) =>
  //         data.filter((h) => h.status !== 'PENDING')
  //       );
  //     }
  //   },
  //   enabled: !!user, // รอ user load ก่อน
  // });

  //leaves calendar VV2
  const { data: leaves = [] } = useQuery({
    queryKey: ['leaves', user.role],
    queryFn: async () => {
      if (!user) return [];

      const allLeaves = await getLeaves(); // get all leave
      if (user.role === 'admin') {
        return allLeaves; // admin เอาทั้งหมด
      } else {
        // employee
        const othersLeaves = allLeaves.filter(
          (l) => l.status !== 'PENDING' && l.userId !== user.id
        );

        const myLeaves = allLeaves.filter((l) => l.userId === user.id);

        // รวม array และกรองซ้ำตาม id
        const combined = [...othersLeaves, ...myLeaves];
        const uniqueLeaves = Array.from(
          new Map(combined.map((l) => [l.id, l])).values()
        );

        return uniqueLeaves;
      }
    },
    enabled: !!user,
  });

  //holidays calendar
  const { data: holidays = [] } = useQuery({
    queryKey: ['holidays'],
    queryFn: getHolidays,
  });
  console.log('role', user.role);
  console.log('leaves', leaves);
  console.log('holidays', holidays);


  const onChange = (key: keyof typeof formData, value: any) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  // const events = [...leaves, ...holidays];
  const [currentDate, setCurrentDate] = useState(new Date());


  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // const getEventsForDay = (day: Date) => {
  //   return events.filter((event) => {
  //     const start = new Date(event.startDate);
  //     const end = new Date(event.endDate);
  //     return day >= start && day <= end;
  //   });
  // };

  const getHolidaysForDay = (day: Date) => {
    return holidays.filter((event) => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      return day >= start && day <= end;
    });
  };

  const getLeavesForDay = (day: Date) => {
    return leaves.filter((event) => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      return day >= start && day <= end;
    });
  };

  const [isLeaveRequestModalOpen, setLeaveRequestModalOpen] = useState(false);
  const toggleLeaveRequestModal = () => setLeaveRequestModalOpen((v) => !v);



  return (
    <div className="flex flex-col min-h-screen bg-quaternary text-white px-4 md:px-8 py-8 relative">
      <LeaveModal
        isOpen={isLeaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
        data={{ title: "ประวัติการลา" }}
        toggleModal={toggleLeaveModal}
      />
      <LeaveRequestModal
        isOpen={isLeaveRequestModalOpen}
        onClose={() => setLeaveRequestModalOpen(false)}
        data={{ title: "แจ้งลางาน" }}
        toggleModal={toggleLeaveRequestModal}
      />
      <Navbar onClick={() => navigate("/home")} />
      <BackgroundGradient />

      <div className="flex flex-col pt-10">
        <div className="flex flex-row justify-between border-b border-[#676767] w-full my-6">
          <p className="font-sukhumvit text-[28px] md:text-[36px] font-bold text-center">แดชบอร์ด</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-5">
          {/* left panel */}
          {/* Calendar Section */}
          <div className="flex flex-col w-full rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
            <div className="px-5 pt-5">
              <div className="flex justify-between items-center">
                {/* left */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-gray-700 rounded transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="font-sukhumvit text-[20px]">{monthNames[currentMonth - 1]}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <h2 className="font-sukhumvit-bold text-[20px]">{monthNames[currentMonth]} {currentYear}</h2>
                </div>

                {/* right */}
                <div className="flex items-center space-x-4">
                  <span className="font-sukhumvit text-[20px]">{monthNames[currentMonth + 2]}</span>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-gray-700 rounded transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <HorizontalDivider />

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 pb-5 border border-[#FFFFFF14] rounded-[8px]">
                {/* Day Headers */}
                {dayNames.map((day) => (
                  <div key={day} className="text-center font-sukhumvit text-[14px] p-3 font-semibold text-white border-b border-[#FFFFFF14]">
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {days.map((day, index) => {
                  const isCurrentMonth = day.getMonth() === currentMonth;
                  const dayLeaves = getLeavesForDay(day);
                  const dayHolidays = getHolidaysForDay(day);


                  return (
                    <div
                      key={index}
                      onClick={() => toggleLeaveRequestModal()}
                      className={`relative min-h-[80px] p-2 ${isCurrentMonth
                        ? 'bg-gray-800/30 hover:bg-gray-700/50'
                        : 'bg-gray-900/30 text-gray-600'
                        } transition-colors cursor-pointer`}
                    >
                      <div className="font-sukhumvit-bold text-right text-sm mb-1">
                        {day.getDate().toString().padStart(2, '0')}
                      </div>

                      {/* Leave Events */}
                      {dayLeaves.slice(0, 2).map((leaves) => (
                        <div
                          key={leaves.id}
                          className={`border-[1px] font-sukhumvit-semibold text-[14px] p-1 rounded mb-1 truncate`}
                          style={{
                            borderColor: leaves.userInfo?.color,
                            color: leaves.userInfo?.color,
                            backgroundColor: "#FFFFFF14",
                          }}

                        >
                          {leaves.title}
                        </div>
                      ))}

                      {/* แสดง "และอีก X คน" ถ้าเกิน 2 */}
                      {dayLeaves.length > 2 && (
                        <div className="font-sukhumvit text-xs text-white mt-1">
                          และอีก {dayLeaves.length - 2} คน
                        </div>
                      )}

                      {/* Holiday Events */}
                      {dayHolidays.slice(0, 2).map((holiday) => (
                        <div
                          key={holiday.id}
                          className={`border-[1px] font-sukhumvit-semibold text-[14px] p-1 rounded mb-1 truncate`}
                          style={{
                            borderColor: "#6FA5F7",
                            color: "#6FA5F7",
                            backgroundColor: "#6FA5F752",
                          }}
                        >
                          {holiday.title}
                        </div>
                      ))}

                      {/* แสดง "และอีก X คน" ถ้าเกิน 2 */}
                      {dayHolidays.length > 2 && (
                        <div className="font-sukhumvit text-xs text-white mt-1">
                          และอีก {dayHolidays.length - 2} คน
                        </div>
                      )}

                    </div>

                  );
                })}

              </div>
            </div>
          </div>




          {/* right */}
          <div className="flex flex-col">
            {/* leaves count */}
            <div className="w-full rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10 px-5 py-5">
              <div className="flex flex-wrap sm:flex-nowrap justify-between gap-x-6 gap-y-4 w-full">
                <div className="flex flex-col min-w-[120px] max-w-[144px] flex-1">
                  <p className="font-sukhumvit text-[20px] font-bold">ลาพักร้อน</p>
                  <div className="flex justify-end space-x-1">
                    <p className="text-[32px] font-sukhumvit font-bold text-primary">0</p>
                  </div>
                </div>

                <div className="hidden sm:flex w-px h-[72px] bg-white opacity-30 my-auto" />

                <div className="flex flex-col min-w-[120px] max-w-[144px] flex-1">
                  <p className="font-sukhumvit text-[20px] font-bold">ลาป่วย</p>
                  <div className="flex justify-end space-x-1">
                    <p className="text-[32px] font-sukhumvit font-bold text-primary">5</p>
                  </div>
                </div>

                <div className="hidden sm:flex w-px h-[72px] bg-white opacity-30 my-auto" />

                <div className="flex flex-col min-w-[120px] max-w-[144px] flex-1">
                  <p className="font-sukhumvit text-[20px] font-bold">ลากิจ</p>
                  <div className="flex justify-end space-x-1">
                    <p className="text-[32px] font-sukhumvit font-bold text-primary">3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* leaves history */}
            <div className="flex flex-col pt-5">
              <div className="flex flex-row w-full max-w-6xl rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
                <div className="flex flex-col w-full py-5 px-5">
                  <div className="flex flex-row justify-between">
                    <p className="font-sukhumvit text-[20px] font-bold ">ประวัติการลา</p>
                    <div className="flex flex-row items-center cursor-pointer group hover:text-white" onClick={toggleLeaveModal}>
                      <CalendarIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
                      <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">ดูทั้งหมด</p>
                    </div>
                  </div>

                  {leaves.map((leave, index) => (
                    <div key={index} className="flex flex-row border-b border-[#676767] pt-3 pb-1 justify-between">
                      <div className="w-[110px]">
                        <p className="font-sukhumvit text-[16px] text-white">{leave.type}</p>
                        <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{leave.title}</p>
                      </div>
                      <div className="fle flex-col">
                        <div className="flex flex-row items-center w-[168px]">
                          <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{leave.startDate}</p>
                          <ArrowIcon className="fill-white" />
                          <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{leave.endDate}</p>
                        </div>
                        <p className="font-sukhumvit text-[14px] text-[var(--color-font-gray)]">{leave.employee}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end right */}
      </div>
    </div>
  );
};

export default Calendar;