interface ContentCardProps {
    children: React.ReactNode;
  }
  
  const ContentCard = ({ children }: ContentCardProps) => {
    return (
      <div className="flex flex-col w-full rounded-[8px] border border-[#FFFFFF14] bg-[#FFFFFF14] shadow-[0_4px_43px_0_rgba(0,0,0,0.32)] z-10">
        <div className="flex flex-col w-full px-5 py-5"> 
          {children}
        </div>
      </div>
    );
  };
  
  export default ContentCard;
  