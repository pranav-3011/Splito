import React from 'react';
import { Check, X, UserPlus, Receipt, DollarSign } from 'lucide-react';

interface Notification {
  id: number;
  type: 'expense' | 'friend' | 'payment';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function Notifications() {
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'expense',
      title: 'New Expense Added',
      message: 'Alice added an expense "Dinner" - ₹1,200',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'friend',
      title: 'Friend Request',
      message: 'Bob wants to connect with you',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Reminder',
      message: 'You need to pay Charlie ₹500',
      time: '1 day ago',
      read: false
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'expense':
        return Receipt;
      case 'friend':
        return UserPlus;
      case 'payment':
        return DollarSign;
      default:
        return Receipt;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
        <button className="text-sm text-purple-600 hover:text-purple-700">
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => {
          const Icon = getIcon(notification.type);
          return (
            <div
              key={notification.id}
              className={cn(
                "bg-white rounded-xl p-4 shadow-sm border",
                notification.read ? "border-gray-100" : "border-purple-100 bg-purple-50"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-2 rounded-full",
                  notification.read ? "bg-gray-100" : "bg-purple-100"
                )}>
                  <Icon className={cn(
                    "h-5 w-5",
                    notification.read ? "text-gray-600" : "text-purple-600"
                  )} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{notification.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <span className="text-xs text-gray-500 mt-2 block">{notification.time}</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <X className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}