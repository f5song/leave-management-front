import clsx from 'clsx';

interface PrimaryButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    children,
    onClick,
    type = "button",
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                "h-[49px] p-[12px] rounded-[4px] font-sukhumvit text-[16px] font-bold z-10",
                "bg-[var(--color-primary)] text-[var(--color-secondary)]",
                "shadow-[4px_6px_15px_0px_#00000085]",
                "hover:shadow-[4px_6px_15px_0px_#00000085]",
                "hover:bg-[#F3A600] hover:text-[#191919]",
                "active:bg-[#F3A600] active:text-[#191919]",
                "active:shadow-[4px_6px_15px_0px_#00000085]",
                "transition duration-200",
                disabled && "bg-gray-400 text-white cursor-not-allowed"
            )}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
