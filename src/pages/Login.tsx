
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Chrome } from 'lucide-react';
import { authService } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const googleLoginMutation = useMutation({
    mutationFn: authService.googleLogin,
    onSuccess: (data) => {
      if (data.isNewUser) {
        navigate('/register', { state: { googleData: data.googleData } });
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

  const handleGoogleLogin = () => {
    googleLoginMutation.mutate();
  };

  // Mock holidays data for this month
  const thisMonthHolidays = [
    { date: '2025-01-01', name: 'วันขึ้นปีใหม่' },
    { date: '2025-01-13', name: 'วันเด็กแห่งชาติ' },
    { date: '2025-01-28', name: 'วันตรุษจีน' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        {/* Login Form */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              เข้าสู่ระบบ
            </CardTitle>
            <CardDescription className="text-slate-300">
              ระบบลางานพนักงาน Funch.tech
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={handleGoogleLogin}
              className="w-full bg-white text-gray-900 hover:bg-gray-100 h-12 text-base font-medium"
              disabled={googleLoginMutation.isPending}
            >
              <Chrome className="mr-3 h-5 w-5" />
              {googleLoginMutation.isPending ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบด้วย Google'}
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-slate-400">
                ใช้บัญชี Google ของบริษัทในการเข้าสู่ระบบ
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Holidays Display */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-400" />
              วันหยุดเดือนนี้
            </CardTitle>
            <CardDescription className="text-slate-300">
              มกราคม 2025
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {thisMonthHolidays.map((holiday, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600">
                <div>
                  <h3 className="font-medium text-white">{holiday.name}</h3>
                  <p className="text-sm text-slate-400">
                    {new Date(holiday.date).toLocaleDateString('th-TH', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
