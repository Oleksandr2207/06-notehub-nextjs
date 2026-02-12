import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;           
  onPageChange: (page: number) => void; 
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}       
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.prev}
      nextClassName={css.next}
      breakClassName={css.break}
      onPageChange={({ selected }) => onPageChange(selected + 1)} 
    />
  );
}