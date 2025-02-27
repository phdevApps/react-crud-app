import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Post } from '../../domain/entities/Post';
import { createPost, updatePost } from '../store/postsSlice';
import { X } from 'lucide-react';

interface ItemFormProps {
  post?: Post;
  onClose?: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ post, onClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Post, 'id'>>({
    defaultValues: post || {
      title: '',
      body: '',
      userId: 1,
    },
  });

  const onSubmit = async (data: Omit<Post, 'id'>) => {
    if (post) {
      await dispatch(updatePost({ ...data, id: post.id }));
    } else {
      await dispatch(createPost(data));
    }
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">
          {post ? 'Edit Post' : 'Create New Post'}
        </h3>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          {...register('title', {
            required: 'Title is required',
            maxLength: {
              value: 100,
              message: 'Title must be less than 100 characters',
            },
          })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register('body', {
            required: 'Description is required',
            maxLength: {
              value: 500,
              message: 'Description must be less than 500 characters',
            },
          })}
          rows={4}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.body && (
          <p className="mt-1 text-sm text-red-600">{errors.body.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {post ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;