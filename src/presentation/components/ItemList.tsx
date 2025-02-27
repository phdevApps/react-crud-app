import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchPosts, resetFilters } from '../store/postsSlice';
import ItemCard from './ItemCard';
import ItemFilter from './ItemFilter';
import ItemSort from './ItemSort';
import Pagination from './Pagination';
import ItemForm from './ItemForm';
import { Loader2, RefreshCw, Plus } from 'lucide-react';

const ItemList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, pagination, filters } = useSelector((state: RootState) => state.posts);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts(pagination));
  }, [dispatch, pagination]);

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const hasActiveFilters = 
    filters.search !== '' || 
    filters.dateRange.start !== null || 
    filters.dateRange.end !== null || 
    filters.sortBy !== 'date' || 
    filters.sortOrder !== 'desc';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Posts</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create Post</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <ItemFilter />
          </div>
          <div className="flex gap-2">
            <ItemSort />
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-2 transition-colors"
                title="Reset all filters"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((post) => (
          <ItemCard key={post.id} post={post} />
        ))}
      </div>

      <Pagination />

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <ItemForm onClose={() => setShowCreateForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;