import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/Context/AuthContext"
import { useLoginData } from "@/Hooks/useLoginData"
import { useMutation } from "@tanstack/react-query"
import { authService } from "@/Api/auth-service"
import { useGoogleLogin } from "@react-oauth/google"
import { CalendarIcon, FunchLogo, GoogleIcon } from "@/Shared/Asseet/Icons"
import { MonthlyView } from "@/Components/Login/MonthlyView"
import { YearlyView } from "@/Components/Login/YearlyView"
import { ViewToggle } from "@/Components/Login/ViewToggle"

const Login = () => {
  const [view, setView] = useState('monthly')
  const navigate = useNavigate()
  const { login } = useAuth()

  const { filteredHolidays, holidaysGroupedByMonth, filteredBirthdays, currentMonth } = useLoginData()

  const googleLoginMutation = useMutation({
    mutationFn: authService.googleLogin,
    onSuccess: (data) => {
      if (!data.user) {
        navigate('/register', { state: { googleData: { ...data } } })
      } else {
        login(data.user)
        navigate('/profile')
      }
    },
    onError: () => {
      console.log('error');
    },
  })

  const googleLoginButton = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      await googleLoginMutation.mutateAsync(codeResponse.code)
    },
    onError: () => {
      console.log('error');
    },
  })

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="relative flex flex-col flex-1 bg-quaternary text-white px-4 lg:px-10 py-8 overflow-y-auto">
        <div className="max-w-6xl w-full mx-auto">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#FFA100] via-[#FF400084] to-[rgba(157,74,44,0)] pointer-events-none" />
          
          {/* Header */}
          <div className="sticky top-0 bg-quaternary z-20 pb-4 pt-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-[125px]">
              <div className="flex flex-row gap-4 items-center">
                <CalendarIcon className="w-[64px] h-[64px] md:w-[84px] md:h-[84px] fill-white" />
                <div>
                  <h1 className="font-prompt text-[28px] md:text-[36px] font-semibold leading-none py-2">
                    ปฏิทินบริษัท
                  </h1>
                  <p className="font-prompt text-[18px] md:text-[24px]">
                    {view === 'monthly' ? 'วันหยุดประจำเดือน' : 'วันหยุดประจำปี'}
                  </p>
                </div>
              </div>
              <ViewToggle view={view} onViewChange={setView} currentMonth={currentMonth} />
            </div>
          </div>

          {/* Content */}
          {view === 'monthly' ? (
            <MonthlyView 
              filteredHolidays={filteredHolidays} 
              filteredBirthdays={filteredBirthdays} 
            />
          ) : (
            <YearlyView holidaysGroupedByMonth={holidaysGroupedByMonth} />
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
          onClick={() => googleLoginButton()}
        >
          <GoogleIcon className="w-5 h-5" /> เข้าสู่ระบบด้วยบัญชี Google
        </button>
      </div>
    </div>
  )
}

export default Login