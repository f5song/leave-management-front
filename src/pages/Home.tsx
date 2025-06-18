
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
  AlertCircle
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
      default: return 'bg-yellow-500';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-white">ระบบลางาน Funch.tech</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="text-white font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="text-slate-400">{user?.position}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-slate-400 hover:text-white"
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
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">ลาป่วย</p>
                  <p className="text-2xl font-bold text-white">{leaveBalance?.sick || 0}</p>
                  <p className="text-slate-400 text-xs">วันคงเหลือ</p>
                </div>
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">ลากิจ</p>
                  <p className="text-2xl font-bold text-white">{leaveBalance?.personal || 0}</p>
                  <p className="text-slate-400 text-xs">วันคงเหลือ</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">ลาพักร้อน</p>
                  <p className="text-2xl font-bold text-white">{leaveBalance?.vacation || 0}</p>
                  <p className="text-slate-400 text-xs">วันคงเหลือ</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Card */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">ข้อมูลส่วนตัว</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-blue-600 text-white text-lg">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-slate-400">{user?.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-300">{user?.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-300">{user?.position}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leave Requests */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">คำขอลาล่าสุด</CardTitle>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                ขอลาใหม่
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {leaveRequests && leaveRequests.length > 0 ? (
                leaveRequests.map((request) => (
                  <div key={request.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-white border-slate-500">
                          {request.type}
                        </Badge>
                        <span className="text-sm text-slate-400">{request.days} วัน</span>
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs text-white ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span>{request.status}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 mb-1">
                      {new Date(request.startDate).toLocaleDateString('th-TH')} - {new Date(request.endDate).toLocaleDateString('th-TH')}
                    </p>
                    <p className="text-sm text-slate-400">{request.reason}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-center py-4">ยังไม่มีคำขอลา</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
