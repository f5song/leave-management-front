const TableContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[1008px] w-full table-fixed border-separate border-spacing-y-3">
        {children}
      </table>
    </div>
  );
};

export default TableContainer;
