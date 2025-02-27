import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setPagination } from '../store/postsSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { pagination } = useSelector((state: RootState) => state.posts);

  const handlePageChange = (newPage: number) => {
    dispatch(setPagination({ page: newPage }));
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => handlePageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <span className="px-4 py-2">
        Page {pagination.page}
      </span>

      <button
        onClick={() => handlePageChange(pagination.page + 1)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;