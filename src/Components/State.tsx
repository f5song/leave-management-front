import { ReactNode } from "react";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  height?: string;
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  retryText?: string;
  height?: string;
}

interface EmptyStateProps {
  message?: string;
  icon?: ReactNode;
  height?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "กำลังโหลดข้อมูล...",
  size = "md",
  height = "h-64"
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-16 w-16"
  };

  return (
    <div className={`flex items-center justify-center ${height}`}>
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-white mx-auto mb-4 ${sizeClasses[size]}`} />
        <p className="text-gray-400 font-sukhumvit">{message}</p>
      </div>
    </div>
  );
};

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "เกิดข้อผิดพลาดในการโหลดข้อมูล",
  onRetry,
  retryText = "ลองใหม่",
  height = "h-64"
}) => (
  <div className={`flex items-center justify-center ${height}`}>
    <div className="text-center">
      <p className="text-red-400 mb-4 font-sukhumvit">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-sukhumvit"
        >
          {retryText}
        </button>
      )}
    </div>
  </div>
);

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "ไม่พบข้อมูล",
  icon,
  height = "h-64"
}) => (
  <div className={`flex items-center justify-center ${height}`}>
    <div className="text-center">
      {icon && <div className="mb-4">{icon}</div>}
      <p className="text-gray-400 font-sukhumvit">{message}</p>
    </div>
  </div>
);