import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeNotification } from '../store/notificationsSlice';
import { Notification } from '../../domain/entities/Notification';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ToastProps {
  notification: Notification;
}

const Toast: React.FC<ToastProps> = ({ notification }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(notification.id));
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification.id, dispatch]);

  const handleClose = () => {
    dispatch(removeNotification(notification.id));
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-4 rounded-lg shadow-lg max-w-sm w-full transition-all duration-300 animate-slide-in',
        {
          'bg-green-50 text-green-800': notification.type === 'success',
          'bg-red-50 text-red-800': notification.type === 'error',
          'bg-blue-50 text-blue-800': notification.type === 'info',
        }
      )}
    >
      {icons[notification.type]}
      <p className="flex-1">{notification.message}</p>
      <button
        onClick={handleClose}
        className="p-1 hover:bg-black/5 rounded-full"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;