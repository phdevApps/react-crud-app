import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostFilters, PaginationParams } from '../../domain/entities/Post';
import { postsApi } from '../../data/api/posts';
import { parseISO, isWithinInterval } from 'date-fns';
import { addNotification } from './notificationsSlice';

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
  filters: PostFilters;
  pagination: PaginationParams;
  allItems: Post[];
}

const initialFilters: PostFilters = {
  search: '',
  dateRange: {
    start: null,
    end: null,
  },
  sortBy: 'date',
  sortOrder: 'desc',
};

const initialState: PostsState = {
  items: [],
  allItems: [],
  loading: false,
  error: null,
  filters: initialFilters,
  pagination: {
    page: 1,
    limit: 10,
  },
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { dispatch }) => {
    try {
      const response = await postsApi.getPosts({ page: 1, limit: 100 });
      dispatch(addNotification({ type: 'success', message: 'Posts loaded successfully' }));
      return response.map(post => ({
        ...post,
        createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
      }));
    } catch (error) {
      dispatch(addNotification({ type: 'error', message: 'Failed to load posts' }));
      throw error;
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (post: Omit<Post, 'id'>, { dispatch }) => {
    try {
      const response = await postsApi.createPost(post);
      dispatch(addNotification({ type: 'success', message: 'Post created successfully' }));
      return { ...response, createdAt: new Date().toISOString() };
    } catch (error) {
      dispatch(addNotification({ type: 'error', message: 'Failed to create post' }));
      throw error;
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (post: Post, { dispatch }) => {
    try {
      const response = await postsApi.updatePost(post);
      dispatch(addNotification({ type: 'success', message: 'Post updated successfully' }));
      return response;
    } catch (error) {
      dispatch(addNotification({ type: 'error', message: 'Failed to update post' }));
      throw error;
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number, { dispatch }) => {
    try {
      await postsApi.deletePost(id);
      dispatch(addNotification({ type: 'success', message: 'Post deleted successfully' }));
      return id;
    } catch (error) {
      dispatch(addNotification({ type: 'error', message: 'Failed to delete post' }));
      throw error;
    }
  }
);

const filterAndSortPosts = (state: PostsState) => {
  let filteredPosts = [...state.allItems];

  if (state.filters.search) {
    const searchTerm = state.filters.search.toLowerCase();
    filteredPosts = filteredPosts.filter(
      post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.body.toLowerCase().includes(searchTerm)
    );
  }

  if (state.filters.dateRange.start && state.filters.dateRange.end) {
    const start = parseISO(state.filters.dateRange.start);
    const end = parseISO(state.filters.dateRange.end);
    filteredPosts = filteredPosts.filter(post => {
      const postDate = parseISO(post.createdAt!);
      return isWithinInterval(postDate, { start, end });
    });
  }

  filteredPosts.sort((a, b) => {
    if (state.filters.sortBy === 'date') {
      const dateA = new Date(a.createdAt!).getTime();
      const dateB = new Date(b.createdAt!).getTime();
      return state.filters.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return state.filters.sortOrder === 'asc'
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    }
  });

  const startIndex = (state.pagination.page - 1) * state.pagination.limit;
  state.items = filteredPosts.slice(
    startIndex,
    startIndex + state.pagination.limit
  );
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<PostFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      filterAndSortPosts(state);
    },
    resetFilters: (state) => {
      state.filters = initialFilters;
      state.pagination.page = 1;
      filterAndSortPosts(state);
    },
    setPagination: (state, action: PayloadAction<Partial<PaginationParams>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
      filterAndSortPosts(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.allItems = action.payload;
        filterAndSortPosts(state);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.allItems.unshift(action.payload);
        filterAndSortPosts(state);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.allItems.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.allItems[index] = action.payload;
        }
        filterAndSortPosts(state);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.allItems = state.allItems.filter((post) => post.id !== action.payload);
        filterAndSortPosts(state);
      });
  },
});

export const { setFilters, setPagination, resetFilters } = postsSlice.actions;
export default postsSlice.reducer;