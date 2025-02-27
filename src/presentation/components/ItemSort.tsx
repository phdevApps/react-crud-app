import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setFilters } from '../store/postsSlice';
import { ArrowUpDown } from 'lucide-react';

const ItemSort: React.FC = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.posts);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilters({ sortBy: e.target.value as 'title' | 'date' }));
  };

  const toggleSortOrder = () => {
    dispatch(
      setFilters({
        sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
      })
    );
  };

  return (
    <div className="flex gap-2">
      <select
        value={filters.sortBy}
        onChange={handleSortChange}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="date">Date</option>
        <option value="title">Title</option>
      </select>

      <button
        onClick={toggleSortOrder}
        className="px-3 py-2 border rounded-md hover:bg-gray-50"
      >
        <ArrowUpDown className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ItemSort;