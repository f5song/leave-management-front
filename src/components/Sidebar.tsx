import { X } from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}
const Sidebar: React.FC<SidebarProps> = (props): JSX.Element => {
    return (
        <div
            className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-40 ${props.isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            {/* ปุ่ม X ปิด */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <span className="text-lg font-semibold">เมนู</span>
                <button onClick={() => props.onClose()} className="text-white">
                    <X size={24} />
                </button>
            </div>

            <ul className="p-4 space-y-4">
                <li className="hover:text-orange-400 cursor-pointer">🏠 หน้าแรก</li>
                <li className="hover:text-orange-400 cursor-pointer">📅 ปฏิทิน</li>
                <li className="hover:text-orange-400 cursor-pointer">📋 รายการลา</li>
                <li className="hover:text-orange-400 cursor-pointer">⚙️ การตั้งค่า</li>
            </ul>
        </div>

    );
};

export default Sidebar;
