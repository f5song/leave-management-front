
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, LogIn, Chrome } from 'lucide-react';
import { authService } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data.user, data.token);
      navigate('/home');
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: "ยินดีต้อนรับสู่ระบบลางาน Funch.tech",
      });
    },
    onError: (error: any) => {
      toast({
        title: "เข้าสู่ระบบไม่สำเร็จ",
        description: error.message || "กรุณาตรวจสอบอีเมลและรหัสผ่าน",
        variant: "destructive",
      });
    }
  });

  const googleLoginMutation = useMutation({
    mutationFn: authService.googleLogin,
    onSuccess: (data) => {
      if (data.isNewUser) {
        navigate('/register', { state: { googleData: data.googleData } });
      } else {
        login(data.user, data.token);
        navigate('/home');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

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
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">อีเมล</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="your.email@funch.tech"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">รหัสผ่าน</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loginMutation.isPending}
              >
                <LogIn className="mr-2 h-4 w-4" />
                {loginMutation.isPending ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-800 px-2 text-slate-400">หรือ</span>
              </div>
            </div>

            <Button 
              onClick={handleGoogleLogin}
              variant="outline" 
              className="w-full border-slate-600 bg-slate-700/50 text-white hover:bg-slate-600"
              disabled={googleLoginMutation.isPending}
            >
              <Chrome className="mr-2 h-4 w-4" />
              {googleLoginMutation.isPending ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบด้วย Google'}
            </Button>
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
