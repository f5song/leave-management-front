import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Building2 } from "lucide-react"
import { Button } from "./button"
import { LogOut } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "@/hooks/use-toast"
import Sidebar from "./sidebar"
import { Menu } from 'lucide-react';

interface NavbarProps {
    onClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ( props ) : JSX.Element => {
    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout();
        toast({
            title: "ออกจากระบบสำเร็จ",
            description: "ขอบคุณที่ใช้บริการ",
        });
    };
    return (
        <div>
            {/* Header */}
            <header className="bg-white  border-b border-orange-500/20 shadow-lg">
            {/* <Sidebar /> */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/40">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <Menu onClick={props.onClick} className="h-6 w-6 text-orange-400" />
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
                                    <AvatarImage src={user?.avatarUrl} />
                                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                    <p className="text-white font-medium">{user?.firstName} {user?.lastName}</p>
                                    <p className="text-gray-400">{user?.jobTitleId}</p>
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
        </div>
    )
}

export default Navbar