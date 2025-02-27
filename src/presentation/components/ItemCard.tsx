import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Post } from '../../domain/entities/Post';
import { deletePost } from '../store/postsSlice';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import ItemForm from './ItemForm';
import { format } from 'date-fns';

interface ItemCardProps {
  post: Post;
}

const ItemCard: React.FC<ItemCardProps> = ({ post }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    dispatch(deletePost(post.id));
    setShowDeleteConfirm(false);
  };

  if (isEditing) {
    return <ItemForm post={post} onClose={() => setIsEditing(false)} />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
      <h3 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
      
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{format(new Date(post.createdAt!), 'MMM d, yyyy')}</span>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
        >
          <Edit2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
            <h4 className="text-lg font-semibold mb-4">Confirm Delete</h4>
            <p className="mb-6">Are you sure you want to delete this post?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCard;