"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

export type NotificationType = "default" | "success" | "achievement" | "warning";

export interface AppNotification {
  id: string;
  title?: string;
  message: string;
  type: NotificationType;
  timestamp: number;
  isRead: boolean;
  actionUrl?: string;
}

interface NotificationContextType {
  toasts: AppNotification[];
  history: AppNotification[];
  addNotification: (message: string, options?: { title?: string; type?: NotificationType; actionUrl?: string }) => void;
  removeToast: (id: string) => void;
  markAllAsRead: () => void;
  clearHistory: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<AppNotification[]>([]);
  const [history, setHistory] = useState<AppNotification[]>([]);

  const addNotification = useCallback((
    message: string, 
    options?: { title?: string; type?: NotificationType; actionUrl?: string }
  ) => {
    const newNotif: AppNotification = {
      id: Math.random().toString(36).substring(2, 9) + Date.now(),
      message,
      title: options?.title,
      type: options?.type || "default",
      actionUrl: options?.actionUrl,
      timestamp: Date.now(),
      isRead: false,
    };

    setToasts(prev => [...prev, newNotif]);
    setHistory(prev => [newNotif, ...prev].slice(0, 50)); // Keep last 50 in history

    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newNotif.id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const markAllAsRead = useCallback(() => {
    setHistory(prev => prev.map(n => ({ ...n, isRead: true })));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const unreadCount = history.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider 
      value={{ 
        toasts, 
        history, 
        addNotification, 
        removeToast, 
        markAllAsRead, 
        clearHistory, 
        unreadCount 
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
