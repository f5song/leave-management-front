import { useMutation } from '@tanstack/react-query';
import { authService } from '@/Api/auth-service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/Hooks/UseToast';
import { useState } from 'react';
import { LoginResponse } from '@/Api/auth-service/Interface/login.interface';
import { useGoogleLogin } from '@react-oauth/google';


const Login = () => {
  const [view, setView] = useState<"monthly" | "yearly">("monthly");

  const yearlyHolidays = [
    {
      month: "มกราคม",
      holidays: [
        { day: "จันทร์", date: "01", name: "วันขึ้นปีใหม่" },
      ],
    },
    {
      month: "กุมภาพันธ์",
      holidays: [
        { day: "พุธ", date: "14", name: "วันวาเลนไทน์" },
        { day: "พฤหัสบดี", date: "15", name: "วันวาเลนไทน์" },
        { day: "ศุกร์", date: "16", name: "วันวาเลนไทน์" },
      ],
    },
    {
      month: "มีนาคม",
      holidays: [
        { day: "จันทร์", date: "01", name: "วันขึ้นปีใหม่" },
      ],
    },
  ];


  const navigate = useNavigate();
  const { login } = useAuth();

  const googleLoginMutation = useMutation<LoginResponse, Error, string>({
    mutationFn: authService.googleLogin,
    onSuccess: (data) => {
      if (!data.user) {
        // ถ้าไม่มี user → ให้ไป register
        navigate('/register', {
          state: {
            googleData: { ...data },
          },
        });
      } else {
        // ถ้ามี user แล้ว → login และเข้า home
        login(data.user, data.access_token);
        navigate('/home');
        toast({
          title: 'เข้าสู่ระบบสำเร็จ',
          description: 'ยินดีต้อนรับสู่ระบบลางาน Funch.tech',
        });
      }

    },
    onError: (error: any) => {
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
    onError: (error) => {
      console.log("error google login ", error);
    },
  });

  return (
    <div className="relative min-h-screen flex lg:flex-row flex-col">
      {/* left */}
      <div className="flex relative z-10 flex-col flex-1 bg-quaternary text-white px-10 py-12 justify-center max-w-auto mx-auto">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#FFA100] via-[#FF400084] to-[rgba(157,74,44,0)] pointer-events-none" />
        <div className="w-[906px] mx-auto">

          {/* head */}
          <div className="flex justify-between items-center gap-4">

            <div className="flex flex-row gap-4 ">
              <img
                src="/fe_calendar.png"
                alt="calendar icon"
                className="w-[84px] h-[84px] gap-[10px]"
              />

              <div className="flex flex-col">
                <h1 className="font-prompt text-[36px] font-semibold leading-none py-3">ปฏิทินบริษัท</h1>
                <p className="font-prompt text-[24px] text-white leading-tight">
                  {view === "monthly" ? "วันหยุดประจำเดือน" : "วันหยุดประจำปี"}
                </p>
              </div>

            </div>
            <div className=" flex justify-end gap-4 relative z-10 rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] p-1 shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] ">
              <button
                className={`font-sukhumvit text-[20px] font-bold py-2 px-4 gap-3 rounded-[4px] w-[130px] h-[48px]  ${view === "monthly" ? "bg-primary text-[#191919]" : " text-primary"}`}
                onClick={() => setView("monthly")}
              >
                พฤศจิกายน
              </button>
              <button
                className={`font-sukhumvit text-[20px] font-bold py-2 px-4 rounded-[4px] w-[130px] h-[48px]  ${view === "yearly" ? "bg-primary text-[#191919]" : " text-primary"}`}
                onClick={() => setView("yearly")}
              >
                ปี 2025
              </button>
            </div>
          </div>
          {view === "monthly" ? (
            <>
              {/* วันหยุดประจำเดือน แก้เป็น object*/}
              <div className="mt-10 flex flex-wrap gap-3 justify-center">
                {["จันทร์ 11", "อังคาร 14", "พุธ 15", "พฤหัสบดี 16", "ศุกร์ 17", "จันทร์ 18"].map((item, index) => (
                  <div
                    key={index}
                    className="w-[141px] h-[102px] gap-[12px] rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] p-3 py-2 shadow-[0_4px_43px_0_rgba(0,0,0,0.32)]"
                    style={{ backdropFilter: 'blur(8px)' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="font-sukhumvit w-[69px] h-[30px] p-[4px] rounded-[4px] border-[1px] border-[#FDC911] text-[#FDC911] text-[16px] font-semibold flex items-center justify-center">
                        {item.split(" ")[0]}
                      </div>
                      <div className="font-sukhumvit text-primary text-[32px] font-bold padding-[4px]">
                        {item.split(" ")[1]}
                      </div>
                    </div>
                    <div className="h-[1px] bg-white/30 mb-2" />
                    <p className="font-sukhumvit text-white/70 text-[14px] truncate">หยุดชดเชยวันประ...</p>
                  </div>
                ))}
              </div>

              {/* วันเกิด */}
              <div className="mt-16 flex flex-col">
                <h3 className="font-prompt justify-start font-semibold mb-3 flex items-center gap-2 text-[20px]">
                  <img src="/mingcute_cake-fill.svg" alt="cake" className="w-8 h-8" />
                  วันเกิดพนักงานสุดน่ารัก
                </h3>
                <div className="flex gap-3 justify-start">
                  {"จันทร์ 11|ชาลี, อังคาร 14|ทะเล".split(", ").map((item, index) => {
                    const [dayDate, name] = item.split("|");
                    const [day, date] = dayDate.split(" ");
                    return (
                      <div
                        key={index}
                        className="w-[141px] h-[102px] gap-[12px] rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] p-3 py-2 shadow-[0_4px_43px_0_rgba(0,0,0,0.32)]"
                        style={{ backdropFilter: 'blur(8px)' }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="font-sukhumvit w-[69px] h-[30px] p-[4px] rounded-[4px] border-[1px] border-[#FDC911] text-[#FDC911] text-sm font-semibold flex items-center justify-center">
                            {day}
                          </div>
                          <div className="font-sukhumvit text-primary text-[32px] font-bold">
                            {date}
                          </div>
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
            <div className="flex justify-start items-center gap-4 mt-3">
              {yearlyHolidays.map((monthData, i) => (
                <div
                  key={i}
                  className="flex flex-col w-auto h-auto gap-[12px] rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] p-3 shadow-[0_4px_43px_0_rgba(0,0,0,0.32)]"
                  style={{ backdropFilter: 'blur(8px)' }}
                >
                  <div className="flex items-center">
                    <h3 className="font-sukhumvit text-white text-[16px] font-bold">
                      {monthData.month}
                    </h3>
                  </div>

                  <div>
                    <ul className="flex flex-row">
                      {monthData.holidays.map((h, idx) => (
                        <li
                          key={idx}
                          className="text-white/80 text-sm flex flex-col gap-3 mr-[18px] pr-4 border-r border-white/30 last:mr-0 last:pr-0 last:border-none"
                        >
                          <div className="flex items-center gap-2">
                            <div className="font-sukhumvit w-[69px] h-[30px] p-[4px] rounded-[4px] border-[1px] border-[#FDC911] text-[#FDC911] text-[16px] font-semibold flex items-center justify-center">
                              {h.day}
                            </div>
                            <div className="font-sukhumvit text-primary text-[32px] font-bold">{h.date}</div>
                          </div>
                          <span className="font-sukhumvit text-white font-semibold">{h.name}</span>
                        </li>
                      ))}
                    </ul>

                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>



      {/* login */}
      <div className="bg-tertiary w-full lg:w-[409px] flex flex-col justify-center items-center p-12 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <img src="/LOGO_2.svg" alt="Funch Logo" className="w-192 h-327 gap-23 mb-4" />
        <button className="font-sukhumvit font-bold px-6 py-3 bg-primary hover:brightness-110 text-blackpx-6 rounded flex items-center gap-2" onClick={() => googleLogin()}>
          <img src="/formkit_google.svg" alt="Google icon" className="w-5 h-5" />
          เข้าสู่ระบบด้วยบัญชี Google
        </button>
      </div>

      {/* <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() =>
            toast({
              title: "Google Login ล้มเหลว",
              description: "ไม่สามารถเข้าสู่ระบบได้",
              variant: "destructive",
            })
          }
          shape="pill"
          theme="filled_black"
          width="100%"
        /> */}
    </div>
  );
};

export default Login;
