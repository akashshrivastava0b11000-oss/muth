import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppNotification } from '../types';
import { storage } from '../services/storageService';

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (title: string, message: string, link?: string, type?: AppNotification['type']) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => storage.getNotifications());

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    storage.markNotificationAsRead(id);
    setNotifications(storage.getNotifications());
  };

  const markAllAsRead = () => {
    storage.markAllNotificationsAsRead();
    setNotifications(storage.getNotifications());
  };

  const addNotification = (
    title: string,
    message: string,
    link: string = '/dashboard',
    type: AppNotification['type'] = 'recommendation'
  ) => {
    storage.addNotification({
      userId: 'user-demo-founder',
      title,
      message,
      link,
      type
    });
    setNotifications(storage.getNotifications());
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
