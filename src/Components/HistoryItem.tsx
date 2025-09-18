import clsx from "clsx";

interface HistoryItemProps {
    className?: string;
    children: React.ReactNode;
    gridCols?: string; // เพื่อกำหนด grid template columns
}

const HistoryItem: React.FC<HistoryItemProps> = ({
    className,
    children,
    gridCols = "110px 178px 1fr"
}) => {
    return (
        <>
            {/* Mobile Layout */}
            <div className={clsx(
                "flex flex-col gap-2 border-b border-[#676767] pt-1 pb-2 sm:hidden",
                className
            )}>
                {children}
            </div>

            {/* Desktop/Tablet Layout */}
            <div
                className={clsx(
                    "hidden sm:grid gap-3 md:gap-4 border-b border-[#676767] pt-2 pb-2 items-center",
                    className
                )}
                style={{ gridTemplateColumns: gridCols }}
            >
                {children}
            </div>
        </>
    );
};
export default HistoryItem;
