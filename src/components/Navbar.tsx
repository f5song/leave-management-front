import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "@/Hooks/UseToast"
import { Menu } from 'lucide-react';

interface NavbarProps {
    onClick: () => void;
}

const Navbar: React.FC<NavbarProps> = (props): JSX.Element => {
    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout();
        toast({
            title: "ออกจากระบบสำเร็จ",
            description: "ขอบคุณที่ใช้บริการ",
        });
    };

    const menuItems = [
        { label: 'แดชบอร์ด', icon: 'calendar.svg' },
        { label: 'อุปกรณ์', icon: 'computer.svg' },
        { label: 'ขอพร', icon: 'star.svg' },
        { label: 'โปรไฟล์', icon: 'star.svg' },
    ];

    return (
        <div className="flex justify-between items-start w-full">
            {/* Left: เมนู */}
            <div className="flex flex-row gap-4">
                {menuItems.map((item, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center justify-center w-[80px] h-[78px] bg-[#FFFFFF14] rounded-[8px] border border-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] cursor-pointer px-2 py-3 gap-1"
                    >
                        <img src={item.icon} alt={item.label} className="w-6 h-6" />
                        <div className="font-sukhumvit text-[12px] font-semibold text-[var(--color-font)] text-center">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>




            {/* Right: กรอบโปรไฟล์ */}
            <div className="flex-1 max-w-[300px] flex justify-end">
                <div className="flex flex-col w-full h-[78px] bg-[#FFFFFF14] rounded-[8px] border border-[#FFFFFF14] p-1 shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] cursor-pointer px-2 py-3 gap-1">
                    <div className="flex items-center justify-between">

                        <div className="flex flex-row items-center gap-2">
                            {/* name */}
                            <div className="flex flex-row items-center gap-2">
                                <div className="bg-[#FFFFFF14] p-2 w-[54px] h-[54px] rounded-[4px]"></div>
                                <div className="flex flex-col">
                                    <div className="font-sukhumvit text-white text-[18px] font-semibold">
                                        Songfolk
                                    </div>
                                    <div className="font-sukhumvit text-[14px] font-semibold text-[var(--color-font)]">ดูโปรไฟล์</div>
                                </div>
                            </div>
                        </div>

                        <div className="font-sukhumvit text-[14px] font-semibold text-[var(--color-font)]">ออก</div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Navbar