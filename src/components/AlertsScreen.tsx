import { Bell, Receipt, UserPlus, Users, DollarSign, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface Alert {
  id: string;
  type: 'expense' | 'payment' | 'friend_request' | 'group_invite' | 'reminder';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actions?: {
    label: string;
    type: 'accept' | 'decline' | 'pay' | 'view';
    primary?: boolean;
  }[];
}

export function AlertsScreen() {
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'expense',
      title: 'New expense added',
      message: 'John added "Dinner" expense of ₹1,200 in Weekend Trip',
      timestamp: new Date('2024-03-20T18:30:00'),
      isRead: false,
      actions: [
        { label: 'View', type: 'view', primary: true },
      ],
    },
    {
      id: '2',
      type: 'friend_request',
      title: 'Friend Request',
      message: 'Sarah wants to connect with you',
      timestamp: new Date('2024-03-20T15:45:00'),
      isRead: false,
      actions: [
        { label: 'Accept', type: 'accept', primary: true },
        { label: 'Decline', type: 'decline' },
      ],
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Reminder',
      message: 'You have a pending payment of ₹500 to Alice',
      timestamp: new Date('2024-03-20T12:15:00'),
      isRead: false,
      actions: [
        { label: 'Pay Now', type: 'pay', primary: true },
      ],
    },
    {
      id: '4',
      type: 'group_invite',
      title: 'Group Invitation',
      message: 'Bob invited you to join "Beach Trip" group',
      timestamp: new Date('2024-03-19T20:00:00'),
      isRead: true,
      actions: [
        { label: 'Join', type: 'accept', primary: true },
        { label: 'Decline', type: 'decline' },
      ],
    },
    {
      id: '5',
      type: 'reminder',
      title: 'Settlement Reminder',
      message: 'You need to settle up with 3 friends',
      timestamp: new Date('2024-03-19T14:20:00'),
      isRead: true,
      actions: [
        { label: 'View Details', type: 'view', primary: true },
      ],
    },
  ];

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'expense':
        return <Receipt className="h-5 w-5 text-purple-500" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'friend_request':
        return <UserPlus className="h-5 w-5 text-blue-500" />;
      case 'group_invite':
        return <Users className="h-5 w-5 text-blue-500" />;
      case 'reminder':
        return <Bell className="h-5 w-5 text-orange-500" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const handleAction = (alertId: string, actionType: string) => {
    // Handle different actions here
    console.log(`Alert ${alertId}: ${actionType}`);
  };

  const handleDismiss = (alertId: string) => {
    // Handle alert dismissal here
    console.log(`Dismiss alert ${alertId}`);
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={cn(
            "bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-sm border transition-all",
            alert.isRead ? "border-purple-50" : "border-purple-200",
            !alert.isRead && "bg-purple-50/50"
          )}
        >
          <div className="flex items-start gap-3">
            <div className={cn(
              "p-2 rounded-full",
              alert.isRead ? "bg-gray-50" : "bg-white"
            )}>
              {getAlertIcon(alert.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className={cn(
                    "font-medium",
                    alert.isRead ? "text-gray-700" : "text-gray-900"
                  )}>
                    {alert.title}
                  </h3>
                  <p className={cn(
                    "text-sm mt-0.5",
                    alert.isRead ? "text-gray-500" : "text-gray-600"
                  )}>
                    {alert.message}
                  </p>
                </div>
                <button 
                  onClick={() => handleDismiss(alert.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {alert.actions && (
                <div className="flex gap-2 mt-3">
                  {alert.actions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleAction(alert.id, action.type)}
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

              <span className="text-xs text-gray-400 mt-2 block">
                {formatTimeAgo(alert.timestamp)}
              </span>
            </div>
          </div>
        </div>
      ))}

      {alerts.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No new alerts</p>
          <p className="text-sm text-gray-400">We'll notify you when something happens</p>
        </div>
      )}
    </div>
  );
} 