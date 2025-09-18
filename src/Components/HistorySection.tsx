import clsx from 'clsx';

interface HistorySectionProps {
    title: string;
    viewAllText?: string;
    icon: React.ReactNode;
    onViewAllClick?: () => void;
    children: React.ReactNode;
}

const HistorySection: React.FC<HistorySectionProps> = ({
    title,
    viewAllText = "ดูทั้งหมด",
    icon,
    onViewAllClick,
    children
}) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row w-full max-w-6xl rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
                <div className="flex flex-col w-full py-5 px-5">
                    <div className="flex flex-row justify-between">
                        <p className="font-sukhumvit text-[20px] font-bold text-white">{title}</p>
                        <div className="flex flex-row items-center cursor-pointer group hover:text-white" onClick={onViewAllClick}>
                            <div className="w-[15px] h-[15px] [&>*]:fill-[#DCDCDC] group-hover:[&>*]:fill-white [&>*]:transition-colors">
                                {icon}
                            </div>
                            <p className="font-sukhumvit text-[16px] text-[#DCDCDC] group-hover:text-white transition-colors ml-1">{viewAllText}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};
export default HistorySection;
