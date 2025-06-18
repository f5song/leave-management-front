
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { 
  Calendar, 
  Clock, 
  User, 
  Building, 
  LogOut,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building2
} from 'lucide-react';
import { leaveService } from '@/services/leaveService';
import { toast } from '@/hooks/use-toast';

interface LeaveBalance {
  sick: number;
  personal: number;
  vacation: number;
}

interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

const Home = () => {
  const { user, logout } = useAuth();

  const { data: leaveBalance } = useQuery<LeaveBalance>({
    queryKey: ['leaveBalance'],
    queryFn: leaveService.getLeaveBalance,
  });

  const { data: leaveRequests } = useQuery<LeaveRequest[]>({
    queryKey: ['leaveRequests'],
    queryFn: leaveService.getLeaveRequests,
  });

  const handleLogout = () => {
    logout();
    toast({
      title: "ออกจากระบบสำเร็จ",
      description: "ขอบคุณที่ใช้บริการ",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-orange-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-xl border-b border-orange-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Funch.tech - ระบบลางาน
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar className="ring-2 ring-orange-500/30">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="text-white font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="text-gray-400">{user?.position}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-gray-400 hover:text-orange-400 hover:bg-orange-500/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Leave Balance Cards */}
          <Card className="bg-black/40 border-orange-500/20 backdrop-blur-xl shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">ลาป่วย</p>
                  <p className="text-3xl font-bold text-white">{leaveBalance?.sick || 0}</p>
                  <p className="text-gray-400 text-xs">วันคงเหลือ</p>
                </div>
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-500/30">
                  <Clock className="h-6 w-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-orange-500/20 backdrop-blur-xl shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">ลากิจ</p>
                  <p className="text-3xl font-bold text-white">{leaveBalance?.personal || 0}</p>
                  <p className="text-gray-400 text-xs">วันคงเหลือ</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                  <User className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-orange-500/20 backdrop-blur-xl shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">ลาพักร้อน</p>
                  <p className="text-3xl font-bold text-white">{leaveBalance?.vacation || 0}</p>
                  <p className="text-gray-400 text-xs">วันคงเหลือ</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                  <Calendar className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Card */}
          <Card className="bg-black/40 border-orange-500/20 backdrop-blur-xl shadow-lg">
            <CardHeader className="border-b border-orange-500/20">
              <CardTitle className="text-white">ข้อมูลส่วนตัว</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20 ring-2 ring-orange-500/30">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white text-xl">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-gray-400">{user?.email}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <Building className="h-5 w-5 text-orange-400" />
                  <span className="text-gray-300">{user?.department}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <User className="h-5 w-5 text-orange-400" />
                  <span className="text-gray-300">{user?.position}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leave Requests */}
          <Card className="bg-black/40 border-orange-500/20 backdrop-blur-xl shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between border-b border-orange-500/20">
              <CardTitle className="text-white">คำขอลาล่าสุด</CardTitle>
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-orange-500/25">
                <Plus className="h-4 w-4 mr-2" />
                ขอลาใหม่
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {leaveRequests && leaveRequests.length > 0 ? (
                leaveRequests.map((request) => (
                  <div key={request.id} className="p-4 bg-gradient-to-r from-black/50 to-orange-900/20 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-orange-300 border-orange-500/50 bg-orange-500/10">
                          {request.type}
                        </Badge>
                        <span className="text-sm text-gray-400">{request.days} วัน</span>
                      </div>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs text-white ${getStatusColor(request.status)} shadow-lg`}>
                        {getStatusIcon(request.status)}
                        <span className="capitalize">{request.status}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      {new Date(request.startDate).toLocaleDateString('th-TH')} - {new Date(request.endDate).toLocaleDateString('th-TH')}
                    </p>
                    <p className="text-sm text-gray-400">{request.reason}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">ยังไม่มีคำขอลา</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
