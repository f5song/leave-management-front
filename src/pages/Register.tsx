
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, ArrowLeft, Building2 } from 'lucide-react';
import { authService } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    position: ''
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const googleData = location.state?.googleData;

  // Set initial data from Google if available
  useState(() => {
    if (googleData) {
      const nameParts = googleData.name?.split(' ') || [];
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || ''
      }));
    }
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      login(data.user, data.token);
      navigate('/home');
      toast({
        title: "สมัครสมาชิกสำเร็จ",
        description: "ยินดีต้อนรับสู่ระบบลางาน Funch.tech",
      });
    },
    onError: (error: any) => {
      toast({
        title: "สมัครสมาชิกไม่สำเร็จ",
        description: error.message || "กรุณาตรวจสอบข้อมูลและลองใหม่",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock successful registration
    const mockUser = {
      id: '1',
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: googleData?.email || 'user@funch.tech',
      department: formData.department,
      position: formData.position,
      avatar: googleData?.picture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    };

    login(mockUser, 'mock-token');
    navigate('/home');
    toast({
      title: "สมัครสมาชิกสำเร็จ",
      description: "ยินดีต้อนรับสู่ระบบลางาน Funch.tech",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-2xl">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Funch.tech
              </h1>
            </div>
          </div>
        </div>

        <Card className="bg-black/40 border-orange-500/20 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/login')}
              className="absolute left-4 top-4 text-gray-400 hover:text-orange-400 hover:bg-orange-500/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl font-bold text-white pt-4">
              สมัครสมาชิก
            </CardTitle>
            <CardDescription className="text-gray-400">
              กรอกข้อมูลเพิ่มเติมสำหรับระบบลางาน
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-200">ชื่อ</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="bg-black/50 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400/20"
                    placeholder="ชื่อ"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-200">นามสกุล</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="bg-black/50 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400/20"
                    placeholder="นามสกุล"
                    required
                  />
                </div>
              </div>

              {googleData && (
                <div className="space-y-2">
                  <Label className="text-gray-200">อีเมล</Label>
                  <div className="bg-black/30 border border-orange-500/20 rounded-md px-3 py-2">
                    <span className="text-gray-300">{googleData.email}</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="department" className="text-gray-200">แผนก</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="bg-black/50 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400/20"
                  placeholder="เช่น IT, HR, Marketing"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="text-gray-200">ตำแหน่ง</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="bg-black/50 border-orange-500/30 text-white placeholder:text-gray-500 focus:border-orange-400 focus:ring-orange-400/20"
                  placeholder="เช่น Developer, Manager"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-12 text-lg font-medium shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                disabled={registerMutation.isPending}
              >
                <UserPlus className="mr-2 h-5 w-5" />
                {registerMutation.isPending ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
