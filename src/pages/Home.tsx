
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, LogOut, User, Clock, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { leaveService } from '@/services/leaveService';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { data: leaveBalance } = useQuery({
    queryKey: ['leaveBalance'],
    queryFn: leaveService.getLeaveBalance
  });

  const { data: recentLeaves } = useQuery({
    queryKey: ['recentLeaves'],
    queryFn: leaveService.getRecentLeaves
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Funch.tech</h1>
              <span className="text-slate-400">ระบบลางานพนักงาน</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <User className="h-5 w-5" />
                <span>{user?.firstName} {user?.lastName}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Leave Balance Cards */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-green-400" />
                ลาป่วย
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">
                {leaveBalance?.sick || 10}
              </div>
              <p className="text-slate-400 text-sm">วันที่เหลือ</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-400" />
                ลากิจ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">
                {leaveBalance?.personal || 6}
              </div>
              <p className="text-slate-400 text-sm">วันที่เหลือ</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-purple-400" />
                ลาพักผ่อน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">
                {leaveBalance?.vacation || 15}
              </div>
              <p className="text-slate-400 text-sm">วันที่เหลือ</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">การดำเนินการ</CardTitle>
              <CardDescription className="text-slate-300">
                จัดการคำขอลาและตรวจสอบสถานะ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                <FileText className="mr-2 h-4 w-4" />
                ขอลางาน
              </Button>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start">
                <Clock className="mr-2 h-4 w-4" />
                ประวัติการลา
              </Button>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                ปฏิทินวันหยุด
              </Button>
            </CardContent>
          </Card>

          {/* Recent Leave Requests */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">คำขอลาล่าสุด</CardTitle>
              <CardDescription className="text-slate-300">
                ประวัติการขอลา 5 รายการล่าสุด
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentLeaves?.length ? (
                recentLeaves.map((leave: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div>
                      <h4 className="font-medium text-white">{leave.type}</h4>
                      <p className="text-sm text-slate-400">{leave.date}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      leave.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      leave.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {leave.status === 'approved' ? 'อนุมัติ' :
                       leave.status === 'pending' ? 'รอพิจารณา' : 'ไม่อนุมัติ'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  ยังไม่มีประวัติการลา
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
