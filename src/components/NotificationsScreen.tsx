import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { formatTimeAgo, getNotificationIcon } from '../lib/utils';

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState([]);

  const handleClearAll = () => {
    // Implement the logic to clear all notifications
  };

  const handleDismiss = (id: string) => {
    // Implement the logic to dismiss a specific notification
  };

  const handleAction = (id: string, type: string) => {
    // Implement the logic to handle an action for a specific notification
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
        {notifications.length > 0 && (
          <button 
            onClick={handleClearAll}
            className="text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No notifications yet</p>
          <p className="text-sm text-gray-400">We'll notify you when something happens</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-sm border border-purple-100 transition-all hover:shadow-md"
            >
              {/* Notification Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* Icon based on type */}
                  <div className={cn(
                    "p-2 rounded-full",
                    {
                      'bg-blue-50 text-blue-600': notification.type === 'friend_request',
                      'bg-green-50 text-green-600': notification.type === 'payment_received',
                      'bg-purple-50 text-purple-600': notification.type === 'expense_added',
                      'bg-orange-50 text-orange-600': notification.type === 'reminder',
                    }
                  )}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  {/* Time */}
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(notification.timestamp)}
                  </span>
                </div>
                {/* Close Button */}
                <button 
                  onClick={() => handleDismiss(notification.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="mt-3">
                <p className="text-gray-900 font-medium">{notification.title}</p>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>

              {/* Action Buttons */}
              {notification.actions && (
                <div className="flex gap-2 mt-4">
                  {notification.actions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleAction(notification.id, action.type)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        action.primary 
                          ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsScreen; 