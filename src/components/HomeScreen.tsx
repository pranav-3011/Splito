import React from 'react';
import { Plus, TrendingDown, TrendingUp } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  members: { id: string; name: string }[];
  color: string;
  unreadCount?: number;
}

interface Friend {
  id: string;
  name: string;
  color: string;
}

interface HomeScreenProps {
  groups: Group[];
  onChatSelect: (chat: { id: string; name: string; isGroup: boolean }) => void;
  onTabChange: (tab: string) => void;
}

export function HomeScreen({ groups, onChatSelect, onTabChange }: HomeScreenProps) {
  const colors = {
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    pink: 'bg-pink-500',
    orange: 'bg-orange-500',
    indigo: 'bg-indigo-500',
  };

  // Example friends data with consistent colors
  const friends: Friend[] = [
    { id: '1', name: 'Alice', color: 'purple' },
    { id: '2', name: 'Bob', color: 'blue' },
    { id: '3', name: 'Charlie', color: 'green' },
    { id: '4', name: 'David', color: 'pink' },
    { id: '5', name: 'Eve', color: 'orange' },
    { id: '6', name: 'Frank', color: 'indigo' },
    { id: '7', name: 'Grace', color: 'purple' },
    { id: '8', name: 'Henry', color: 'blue' },
  ];

  // Mock data for balance summary
  const totalOwed = 2500;
  const totalToReceive = 1800;

  return (
    <div className="space-y-6">
      {/* Balance Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-red-100">
          <div className="flex items-center justify-between mb-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            <span className="text-xs font-medium text-gray-500">you owe</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              ₹{totalOwed.toLocaleString()}
            </span>
          </div>
          <div className="mt-2">
            <button className="w-full text-xs text-red-600 bg-gradient-to-r from-red-50 to-pink-50 py-2 rounded-lg hover:from-red-100 hover:to-pink-100 transition-colors font-medium">
              Pay now
            </button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-green-100">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span className="text-xs font-medium text-gray-500">to receive</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">₹{totalToReceive.toLocaleString()}</span>
          </div>
          <div className="mt-2">
            <button className="w-full text-xs text-green-600 bg-green-50 py-1.5 rounded-lg hover:bg-green-100">
              Remind all
            </button>
          </div>
        </div>
      </div>

      {/* Groups Section */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Groups</h2>
          <button 
            onClick={() => onTabChange('create-group')}
            className="w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-colors"
          >
            <Plus className="h-5 w-5 text-purple-600" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => onChatSelect({ id: group.id, name: group.name, isGroup: true })}
              className="flex flex-col items-center p-4 hover:bg-purple-50 rounded-xl transition-colors border border-purple-100 bg-white/50"
            >
              <div className={`w-14 h-14 rounded-full ${colors[group.color]} flex items-center justify-center text-white font-medium text-xl mb-2`}>
                {group.name[0]}
              </div>
              <span className="text-sm font-medium text-gray-900 text-center">{group.name}</span>
              <span className="text-xs text-gray-500 mt-1">{group.members.length} members</span>
              {group.unreadCount > 0 && (
                <span className="mt-2 px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                  {group.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Friends Section */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Friends</h2>
          <button 
            onClick={() => onTabChange('add-friend')}
            className="w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-colors"
          >
            <Plus className="h-5 w-5 text-purple-600" />
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {friends.map((friend) => (
            <button
              key={friend.id}
              onClick={() => onChatSelect({ id: friend.id, name: friend.name, isGroup: false })}
              className="flex flex-col items-center p-3 hover:bg-purple-50 rounded-xl transition-colors border border-purple-100 bg-white/50"
            >
              <div className={`w-12 h-12 rounded-full ${colors[friend.color]} flex items-center justify-center text-white font-medium text-lg mb-2`}>
                {friend.name[0]}
              </div>
              <span className="text-sm font-medium text-gray-900 text-center line-clamp-1">
                {friend.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}