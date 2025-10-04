import clsx from 'clsx';

interface PrimaryButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    children,
    onClick,
    type = "button",
    disabled = false,
    className,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                "p-[12px] rounded-[4px] font-sukhumvit text-[16px] font-bold z-10 py-3 px-4 h-[45px]",
                "bg-[var(--color-primary)] text-[var(--color-secondary)]",
                "shadow-[4px_6px_15px_0px_#00000085]",
                "hover:shadow-[4px_6px_15px_0px_#00000085]",
                "hover:bg-[#F3A600] hover:text-[#191919]",
                "active:bg-[#F3A600] active:text-[#191919]",
                "active:shadow-[4px_6px_15px_0px_#00000085]",
                "transition duration-200",
                "min-w-[50px]",
                disabled && "bg-[var(--color-gray)] text-[var(--color-white)] cursor-not-allowed hover:bg-[var(--color-gray)] hover:text-[var(--color-white)] active:bg-[var(--color-gray)] active:text-[var(--color-white)]",
                className
            )}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
