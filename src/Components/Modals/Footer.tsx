import { ReactNode } from "react";

interface ModalFooterProps {
  children: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  closeButtonText?: string;
  className?: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  onClose,
  showCloseButton = true,
  className = ""
}) => {
  return (
    <div className={`flex justify-between items-center mt-4 pt-4 ${className}`}>
      <div className="flex items-center">
        {children}
      </div>
      
      {showCloseButton && onClose && (
        <button
          className="text-[var(--color-primary)] hover:opacity-80 font-bold font-sukhumvit transition-opacity"
          onClick={onClose}
        >
        </button>
      )}
    </div>
  );
};

export default ModalFooter;