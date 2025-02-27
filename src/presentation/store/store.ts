import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import notificationsReducer from './notificationsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;