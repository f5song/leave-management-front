import { useMutation, useQuery } from '@tanstack/react-query';
import { authService } from '@/Api/auth-service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/Contexts/AuthContext';
import { toast } from '@/Hooks/UseToast';
import { useState } from 'react';
import { ILoginResponse } from '@/Api/auth-service/Interface/login.interface';
import { useGoogleLogin } from '@react-oauth/google';
import { CakeIcon, CalendarIcon, FunchLogo, GoogleIcon } from '@/Shared/Asseet/Icons';

import { getHolidays } from '@/Api/holidays-service';
import { groupHolidaysByMonth } from '@/Api/holidays-service/utils/groupHolidays';
import { IHoliday } from '@/Api/holidays-service/interfaces/holidays.interface';
import { expandHolidayDates } from '@/Api/holidays-service/utils/expandHolidayDates';

const monthNames = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const Login = () => {
  const [view, setView] = useState<'monthly' | 'yearly'>('monthly');
  const navigate = useNavigate();
  const { login } = useAuth();

  // ดึงข้อมูลวันหยุดจาก API
  const { data: holidays = [], isLoading, error } = useQuery<IHoliday[]>({
    queryKey: ['holidays'],
    queryFn: getHolidays,
  });

  // เดือนปัจจุบัน (0-11)
  const currentMonth = new Date().getMonth();

  const expandedHolidays = expandHolidayDates(holidays);

  // กรองวันหยุดเฉพาะเดือนปัจจุบัน (รายเดือน)
  const filteredHolidays = expandedHolidays.filter(h => new Date(h.startDate).getMonth() === currentMonth);
  console.log(filteredHolidays)

  console.log(holidays);

  // จัดกลุ่มวันหยุดตามเดือน (รายปี)
  const holidaysGroupedByMonth = groupHolidaysByMonth(expandedHolidays);

  const googleLoginMutation = useMutation<ILoginResponse, Error, string>({
    mutationFn: authService.googleLogin,
    onSuccess: (data) => {
      if (!data.user) {
        navigate('/register', { state: { googleData: { ...data } } });
      } else {
        login(data.user, data.access_token);
        navigate('/home');
        toast({ title: 'เข้าสู่ระบบสำเร็จ', description: 'ยินดีต้อนรับสู่ระบบลางาน Funch.tech' });
      }
    },
    onError: (error) => {
      toast({
        title: 'Google Login ล้มเหลว',
        description: error.message || 'ไม่สามารถเข้าสู่ระบบได้',
        variant: 'destructive',
      });
    },
  });

  const googleLogin = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      await googleLoginMutation.mutateAsync(codeResponse.code);
    },
    onError: (error) => console.log('error google login ', error),
  });

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="relative flex flex-col flex-1 bg-quaternary text-white px-4 lg:px-10 py-8 overflow-y-auto">
        <div className="max-w-6xl w-full mx-auto">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#FFA100] via-[#FF400084] to-[rgba(157,74,44,0)] pointer-events-none" />
          {/* Sticky Header */}
          <div className="sticky top-0 bg-quaternary z-20 pb-4 pt-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-[125px]">
              <div className="flex flex-row gap-4 items-center">
                <CalendarIcon className="w-[64px] h-[64px] md:w-[84px] md:h-[84px]" />
                <div>
                  <h1 className="font-prompt text-[28px] md:text-[36px] font-semibold leading-none py-2">ปฏิทินบริษัท</h1>
                  <p className="font-prompt text-[18px] md:text-[24px]">
                    {view === 'monthly' ? 'วันหยุดประจำเดือน' : 'วันหยุดประจำปี'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 md:gap-4 rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] p-1 shadow-lg">
                <button
                  className={`font-sukhumvit text-[16px] md:text-[20px] font-semibold py-2 px-4 w-[110px] md:w-[130px] rounded-[8px] ${view === 'monthly' ? 'bg-primary text-[#191919]' : 'text-primary'}`}
                  onClick={() => setView('monthly')}
                >
                  {monthNames[currentMonth]}
                </button>
                <button
                  className={`font-sukhumvit text-[16px] md:text-[20px] font-semibold py-2 px-4 w-[110px] md:w-[130px] rounded-[8px] ${view === 'yearly' ? 'bg-primary text-[#191919]' : 'text-primary'}`}
                  onClick={() => setView('yearly')}
                >
                  ปี {new Date().getFullYear()}
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          {view === 'monthly' ? (
            <>
              <div className="mt-10 flex flex-wrap gap-3">
                {filteredHolidays.map((item) => {
                  const dateObj = new Date(item.startDate);
                  const dayName = dateObj.toLocaleDateString('th-TH', { weekday: 'long' }).replace(/^วัน/, ''); // เช่น "พุธ"
                  const dayNumber = dateObj.toLocaleDateString('th-TH', { day: '2-digit' }); // เช่น "01"
                  return (
                    <div key={item.id} className="w-[141px] h-[102px] rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] p-3 py-2 shadow-md backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="font-sukhumvit-bold w-[69px] h-[30px] p-1 rounded-[4px] border border-[#FDC911] text-[#FDC911] text-[16px] font-semibold flex items-center justify-center">
                          {dayName}
                        </div>
                        <div className="font-sukhumvit-bold text-primary text-[32px] font-bold">
                          {dayNumber}
                        </div>
                      </div>
                      <div className="h-[1px] bg-white/30 mb-2" />
                      <p className="font-sukhumvit text-white/70 text-[14px] truncate">{item.title}</p>
                    </div>
                  );
                })}
              </div>

              {/* ตัวอย่างวันเกิด */}
              <div className="mt-12">
                <h3 className="font-prompt font-semibold mb-3 flex items-center gap-2 text-[18px] md:text-[20px]">
                  <CakeIcon className="w-6 h-6 md:w-8 md:h-8" /> วันเกิดพนักงานสุดน่ารัก
                </h3>
                <div className="flex flex-wrap gap-3">
                  {"จันทร์ 11|ชาลี, อังคาร 14|ทะเล".split(", ").map((item, index) => {
                    const [dayDate, name] = item.split('|');
                    const [day, date] = dayDate.split(' ');
                    return (
                      <div key={index} className="w-[141px] h-[102px] rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] p-3 py-2 shadow-md backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="font-sukhumvit w-[69px] h-[30px] rounded-[4px] border border-[#FDC911] text-[#FDC911] text-sm font-semibold flex items-center justify-center">
                            {day}
                          </div>
                          <div className="font-sukhumvit text-primary text-[32px] font-bold">{date}</div>
                        </div>
                        <div className="h-[1px] bg-white/30 mb-2" />
                        <p className="font-sukhumvit text-white/70 text-sm truncate">วันเกิด{name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-row gap-4 mt-6 flex-wrap">
              {Object.entries(holidaysGroupedByMonth).map(([month, holidaysInMonth]) => (
                <div key={month} className="rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] p-4 shadow-md backdrop-blur-sm">
                  <h3 className="font-sukhumvit text-white text-[16px] font-bold mb-2">{month}</h3>
                  <ul className="flex flex-wrap gap-6">
                    {holidaysInMonth.map((h) => {
                      const dateObj = new Date(h.startDate);
                      const dayName = dateObj.toLocaleDateString('th-TH', { weekday: 'long' }).replace(/^วัน/, '');
                      const dayNumber = dateObj.toLocaleDateString('th-TH', { day: '2-digit' });
                      return (
                        <li key={h.id} className="text-white/80 text-sm flex flex-col gap-2 pr-4 border-r border-white/30 last:border-none">
                          <div className="flex items-center gap-2">
                            <div className="font-sukhumvit w-[69px] h-[30px] rounded-[4px] border border-[#FDC911] text-[#FDC911] text-[16px] font-semibold flex items-center justify-center">
                              {dayName}
                            </div>
                            <div className="font-sukhumvit text-primary text-[32px] font-bold">
                              {dayNumber}
                            </div>
                          </div>
                          <span className="font-sukhumvit text-[var(--color-font)]">{h.title}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div
        className="w-full lg:w-[409px] flex flex-col justify-center items-center p-12 shadow-xl bg-[#292929]"
        style={{ boxShadow: '-8px 0px 15px 0px #00000033' }}
      >
        <FunchLogo className="w-[192px] h-[327px] mb-4" />
        <button
          className="font-sukhumvit font-bold px-6 py-3 bg-primary hover:brightness-110 text-black rounded flex items-center gap-2"
          onClick={() => googleLogin()}
        >
          <GoogleIcon className="w-5 h-5" /> เข้าสู่ระบบด้วยบัญชี Google
        </button>
      </div>
    </div>
  );
};

export default Login;
