import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (pageNumber: number) => void;
}

export default function Pagination({ currentPage, totalPages, goToNextPage, goToPrevPage, goToPage }: PaginationProps) {
  const pageNumbers: (number | string)[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }

  return (
    <div className='Pagination'>
      <div className="circle" onClick={goToPrevPage}>
        <FontAwesomeIcon className='icon' icon={faChevronLeft} />
      </div>

      {pageNumbers.map((page, index) =>
        typeof page === 'number' ? (
          <div
            key={index}
            className={`circle ${page === currentPage ? 'active' : ''}`}
            onClick={() => goToPage(page)}
          >
            <span>{page}</span>
          </div>
        ) : (
          <div key={index} className="circle">
            <span>{page}</span>
          </div>
        )
      )}

      <div className="circle" onClick={goToNextPage}>
        <FontAwesomeIcon className='icon' icon={faChevronRight} />
      </div>
    </div>
  );
}
