
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Chrome, Building2 } from 'lucide-react';
import { authService } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const googleLoginMutation = useMutation({
    mutationFn: authService.googleLogin,
    onSuccess: (data) => {
      if (data.isNewUser) {
        navigate('/register', {
          state: {
            googleData: {
              ...data.user,
              email: data.email,
              // avatar: data.avatar,
            }
          }
        });
        console.log("data email login page", data.email);
      } else {
        login(data.user, data.token);
        navigate('/home');
        toast({
          title: "เข้าสู่ระบบสำเร็จ",
          description: "ยินดีต้อนรับสู่ระบบลางาน Funch.tech",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Google Login ไม่สำเร็จ",
        description: error.message,
        variant: "destructive",
      });
    }
  });


  const handleGoogleLogin = (credentialResponse: any) => {
    const idToken = credentialResponse.credential;
    if (idToken) {
      googleLoginMutation.mutate(idToken);
    } else {
      toast({
        title: 'Google Login ล้มเหลว',
        description: 'ไม่สามารถรับ idToken ได้',
        variant: 'destructive',
      });
    }
  };
  // Mock holidays data for this month
  const thisMonthHolidays = [
    { date: '2025-01-01', name: 'วันขึ้นปีใหม่' },
    { date: '2025-01-13', name: 'วันเด็กแห่งชาติ' },
    { date: '2025-01-28', name: 'วันตรุษจีน' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        {/* Left side - Branding & Login */}
        <div className="space-y-8">
          {/* Logo & Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Funch.tech
                </h1>
                <p className="text-gray-400 text-sm">Employee Leave System</p>
              </div>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              ระบบบริหารจัดการการลางานที่ทันสมัย<br />
              สำหรับทีมงาน Funch.tech
            </p>
          </div>

          {/* Login Card */}
          <Card className="bg-black/40 border-orange-500/20 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-white">
                เข้าสู่ระบบ
              </CardTitle>
              <CardDescription className="text-gray-400">
                ใช้บัญชี Google ของบริษัทในการเข้าสู่ระบบ
              </CardDescription>
            </CardHeader>
            {/* login google button */}
            <CardContent className="space-y-6">
              <CardContent className="space-y-6">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() =>
                    toast({
                      title: "Google Login ล้มเหลว",
                      description: "ไม่สามารถเข้าสู่ระบบได้",
                      variant: "destructive",
                    })
                  }
                  theme="filled_black"
                  shape="pill"
                  size="large"
                  width="100%"
                />
              </CardContent>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Holidays Display */}
        <Card className="bg-black/40 border-orange-500/20 backdrop-blur-xl shadow-2xl">
          <CardHeader className="border-b border-orange-500/20">
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Calendar className="mr-3 h-6 w-6 text-orange-400" />
              วันหยุดเดือนนี้
            </CardTitle>
            <CardDescription className="text-gray-400 text-lg">
              มกราคม 2025
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {thisMonthHolidays.map((holiday, index) => (
              <div key={index} className="group p-5 bg-gradient-to-r from-black/50 to-orange-900/20 rounded-xl border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-white text-lg group-hover:text-orange-100 transition-colors">
                      {holiday.name}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {new Date(holiday.date).toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg group-hover:shadow-orange-500/50 transition-all"></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
