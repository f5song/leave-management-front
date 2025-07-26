const TableContainer = ({ children }: { children: React.ReactNode }) => {
    return (
      <table className="min-w-[1008px] w-full table-fixed border-separate border-spacing-y-3">
        {children}
      </table>
    );
  };
  
  export default TableContainer;
  