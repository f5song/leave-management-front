import clsx from "clsx";

interface HistoryItemColumnProps {
    children: React.ReactNode;
    className?: string;
    mobileLabel?: string; // Label สำหรับ mobile
}

const HistoryItemColumn: React.FC<HistoryItemColumnProps> = ({
    children,
    className,
    mobileLabel
}) => {
    return (
        <>
            {/* Mobile Column */}
            <div className={clsx("min-w-0 sm:hidden", className)}>
                {mobileLabel && (
                    <span className="font-sukhumvit text-[12px] text-[#9CA3AF] block mb-1">
                        {mobileLabel}:
                    </span>
                )}
                {children}
            </div>

            {/* Desktop/Tablet Column */}
            <div className={clsx("min-w-0 hidden sm:block", className)}>
                {children}
            </div>
        </>
    );
};
export default HistoryItemColumn;