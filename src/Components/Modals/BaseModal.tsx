import { CloseIcon } from "@/Shared/Asseet/Icons";
import { ReactNode } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode; // scrollable content (table)
  statusTab?: ReactNode; // tab ข้างบน
  footer?: ReactNode;  // ปุ่ม, pagination ฯลฯ
  width?: string;
  maxWidth?: string;
  height?: string; // ความสูง fixed ของ modal
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  statusTab,
  footer,
  width = "w-[75vw]",
  maxWidth = "max-w-[75vw]",
  height = "h-[80vh]", // กำหนดความสูง fixed
}) => {
  if (!isOpen) return null;

  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={`relative bg-[var(--color-bg)] rounded-[8px] ${width} ${maxWidth} ${height} flex flex-col`}>

        {/* Header */}
        <div className="flex justify-between items-center p-6 flex-shrink-0">
          <h2 className="font-sukhumvit text-[18px] sm:text-[20px] font-bold">{title}</h2>
          <button
            className="flex items-center justify-center p-1 hover:bg-white/10 rounded transition-colors group"
            onClick={onClose}
          >
            <CloseIcon className="w-[25px] h-[25px] fill-[var(--color-primary)] group-hover:fill-white transition-colors" />
          </button>
        </div>

        {/* Status Tab */}
        {statusTab && <div className="flex-shrink-0">{statusTab}</div>}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex-shrink-0 p-6 border-t border-[#676767]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseModal;
