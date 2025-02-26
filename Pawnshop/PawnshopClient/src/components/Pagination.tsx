import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalCustomers: number;
  customersPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalCustomers,
  customersPerPage,
  onPageChange,
}: PaginationProps) {
  const { t } = useTranslation();
  const totalPages = Math.ceil(totalCustomers / customersPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-6">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200
                  ${currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-50'}`}
      >
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>{t('pagination.previous')}</span>
        </div>
      </button>

      <div className="flex items-center space-x-2 text-sm">
        <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-medium">
          {t('pagination.page')} {currentPage}
        </span>
        <span className="text-gray-500">{t('pagination.of')}</span>
        <span className="px-3 py-1 rounded-lg bg-gray-50 text-gray-700 font-medium">
          {totalPages}
        </span>
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200
                  ${currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-50'}`}
      >
        <div className="flex items-center space-x-2">
          <span>{t('pagination.next')}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  );
}
