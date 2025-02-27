import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Toast from './Toast';

const ToastContainer: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {notifications.map((notification) => (
        <Toast key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default ToastContainer;