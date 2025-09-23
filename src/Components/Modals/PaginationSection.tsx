import { ArrowLeftIcon, ArrowRightIcon } from "@/Shared/Asseet/Icons";

type PaginationSectionProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemPerPage?: number;
};

export const PaginationSection: React.FC<PaginationSectionProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemPerPage = 9,
}) => {
  const startPage = Math.max(1, Math.min(currentPage - Math.floor(itemPerPage / 2), totalPages - itemPerPage + 1));
  const endPage = Math.min(totalPages, startPage + itemPerPage - 1);
  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="text-white disabled:opacity-30"
      >
        <ArrowLeftIcon className="w-[24px] h-[24px] fill-white" />
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-[4px] text-[16px] font-sukhumvit font-semibold ${
            currentPage === page ? "border border-white text-white" : "text-[var(--color-gray)]"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="text-white disabled:opacity-30"
      >
        <ArrowRightIcon className="w-[24px] h-[24px] fill-white" />
      </button>
    </div>
  );
};
