import { ArrowDownRight, ArrowUpRight, Receipt, Users, UserPlus } from 'lucide-react';
import { cn } from '../lib/utils';

interface Activity {
  id: string;
  type: 'payment_sent' | 'payment_received' | 'expense_added' | 'group_created' | 'friend_added';
  title: string;
  description: string;
  amount?: number;
  timestamp: Date;
  participants?: string[];
}

export function ActivityScreen() {
  // Example activities - in real app, this would come from props or a store
  const activities: Activity[] = [
    {
      id: '1',
      type: 'payment_sent',
      title: 'Sent to John',
      description: 'For lunch at Cafe',
      amount: 500,
      timestamp: new Date('2024-03-20T14:30:00'),
    },
    {
      id: '2',
      type: 'expense_added',
      title: 'Movie Night',
      description: 'Split with 4 friends',
      amount: 1000,
      timestamp: new Date('2024-03-20T12:00:00'),
      participants: ['John', 'Alice', 'Bob', 'You'],
    },
    {
      id: '3',
      type: 'group_created',
      title: 'Created new group',
      description: 'Weekend Trip',
      timestamp: new Date('2024-03-19T18:45:00'),
      participants: ['John', 'Alice', 'You'],
    },
    {
      id: '4',
      type: 'payment_received',
      title: 'Received from Alice',
      description: 'For dinner last night',
      amount: 750,
      timestamp: new Date('2024-03-19T10:15:00'),
    },
    {
      id: '5',
      type: 'friend_added',
      title: 'Added new friend',
      description: 'Connected with Bob',
      timestamp: new Date('2024-03-18T16:20:00'),
    },
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'payment_sent':
        return <ArrowUpRight className="h-5 w-5 text-red-500" />;
      case 'payment_received':
        return <ArrowDownRight className="h-5 w-5 text-green-500" />;
      case 'expense_added':
        return <Receipt className="h-5 w-5 text-purple-500" />;
      case 'group_created':
        return <Users className="h-5 w-5 text-blue-500" />;
      case 'friend_added':
        return <UserPlus className="h-5 w-5 text-blue-500" />;
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Group activities by date
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = formatDate(activity.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, Activity[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedActivities).map(([date, dateActivities]) => (
        <div key={date}>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-semibold text-gray-500">{date}</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-100 to-transparent" />
          </div>

          <div className="space-y-3">
            {dateActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-sm border border-purple-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-gray-50">
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{activity.title}</h3>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                      </div>
                      {activity.amount && (
                        <span className={cn(
                          "font-medium",
                          activity.type === 'payment_sent' ? 'text-red-600' : 'text-green-600'
                        )}>
                          ₹{activity.amount.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {activity.participants && (
                      <div className="mt-3 flex items-center gap-1">
                        <div className="flex -space-x-2">
                          {activity.participants.map((participant, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-medium ring-2 ring-white"
                            >
                              {participant[0]}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          with {activity.participants.length} people
                        </span>
                      </div>
                    )}

                    <span className="text-xs text-gray-400 mt-2 block">
                      {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 