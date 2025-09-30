import {
    ComputerIcon,
    StarIcon,
    CalendarIcon,
    ProfileSmallIcon,
    LogOutIcon,
} from '@/Shared/Asseet/Icons';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from '@/Context/AuthContext';
import { authService } from '@/Api/auth-service';

interface NavbarProps {
    onClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onClick }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate("/login");
        } catch (error) {
        }
    };

    const menuItems = [
        { label: 'แดชบอร์ด', icon: CalendarIcon, path: '/calendar' },
        { label: 'อุปกรณ์', icon: ComputerIcon, path: '/device' },
        { label: 'ขอพร', icon: StarIcon, path: '/pray' },
        { label: 'โปรไฟล์', icon: ProfileSmallIcon, path: '/profile' },
        { label: 'แอดมิน', icon: ProfileSmallIcon, path: '/admin' },
    ];

    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-4">
            {/* Left: เมนู */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4">
                {menuItems.map((item, i) => {
                    const isActive = location.pathname.startsWith(item.path);

                    return (
                        <div
                            key={i}
                            onClick={() => navigate(item.path)}
                            className={clsx(
                                'group flex flex-col items-center justify-center w-[90px] h-[90px] rounded-[8px] border cursor-pointer px-2 py-2 gap-1 transition-colors shadow-[0_4px_15px_0_rgba(0,0,0,0.2)]',
                                isActive
                                    ? 'border-yellow-400 bg-[#FFFFFF22]'
                                    : 'border-[#FFFFFF14] bg-[#FFFFFF14] hover:bg-[#FFFFFF22]'
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    'w-5 h-5 transition-colors',
                                    isActive
                                        ? 'fill-yellow-400'
                                        : 'fill-[#676767] group-hover:fill-white'
                                )}
                            />
                            <div
                                className={clsx(
                                    'font-sukhumvit text-[14px] font-semibold text-center transition-colors',
                                    isActive
                                        ? 'text-yellow-400'
                                        : 'text-[var(--color-font)] group-hover:text-white'
                                )}
                            >
                                {item.label}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Right: โปรไฟล์และออก */}
            <div className="flex justify-center md:justify-end items-center gap-3 flex-wrap">
                {/* Profile Box */}
                <div className="flex items-center gap-3 h-[90px] bg-[#FFFFFF14] rounded-[8px] border border-[#FFFFFF14] p-2 shadow-[0_4px_15px_0_rgba(0,0,0,0.2)] w-[320px] min-w-[200px]">
                    <div className="w-[48px] h-[48px] rounded-[4px] bg-[#FFFFFF14] overflow-hidden">
                        <img src={user?.avatarUrl} alt="profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <p className="font-sukhumvit text-white text-[14px] font-semibold leading-none pb-3">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="font-sukhumvit text-[12px] font-semibold text-[var(--color-font)] leading-none cursor-pointer hover:text-white" onClick={() => navigate('/profile')}>
                            ดูโปรไฟล์
                        </p>
                    </div>
                    {/* Divider */}
                    <div className="w-px h-[80%] bg-[#676767] mx-2 my-auto" />

                    {/* Logout */}
                    <div className="flex flex-col items-center justify-center w-[65px]">
                        <LogOutIcon className="w-6 h-6 fill-[#676767] hover:text-white" />
                        <div className="font-sukhumvit text-[14px] font-semibold text-[var(--color-font)] hover:text-white cursor-pointer" onClick={handleLogout}>ออก</div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Navbar;
