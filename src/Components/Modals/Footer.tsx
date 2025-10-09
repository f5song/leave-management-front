interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}
const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = ""
}) => {
  return (
    <div className={`flex justify-between items-center mt-4 pt-4 ${className}`}>
      <div className="flex items-center">
        {children}
      </div>

    </div>
  );
};

export default ModalFooter;