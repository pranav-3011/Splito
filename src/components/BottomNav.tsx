import React, { useState } from 'react';
import { Home, Plus, Activity, UserPlus, Receipt, Bell, Users, UserPlus2, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { LogOut, Settings, HelpCircle } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface Alert {
  id: string;
  type: 'expense' | 'payment' | 'friend_request' | 'group_invite' | 'reminder';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Get unread alerts count
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'expense',
      title: 'New expense added',
      message: 'John added "Dinner" expense of ₹1,200 in Weekend Trip',
      timestamp: new Date('2024-03-20T18:30:00'),
      isRead: false,
    },
    {
      id: '2',
      type: 'friend_request',
      title: 'Friend Request',
      message: 'Sarah wants to connect with you',
      timestamp: new Date('2024-03-20T15:45:00'),
      isRead: false,
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Reminder',
      message: 'You have a pending payment of ₹500 to Alice',
      timestamp: new Date('2024-03-20T12:15:00'),
      isRead: false,
    },
  ];

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'activity', icon: Activity, label: 'Activity' },
    null, // Placeholder for the center button
    { id: 'notifications', icon: Bell, label: 'Alerts', badge: unreadCount },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0">
      {/* Popup Menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setShowMenu(false)}
          />
          
          {/* Menu */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl w-48 overflow-hidden z-50 border border-purple-100">
            <button 
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors"
              onClick={() => {
                setShowMenu(false);
                onTabChange('add-expense');
              }}
            >
              <Receipt className="h-5 w-5" />
              <span className="font-medium">Add Expense</span>
            </button>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-100 to-transparent" />
            <button 
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors"
              onClick={() => {
                setShowMenu(false);
                onTabChange('add-friend');
              }}
            >
              <UserPlus className="h-5 w-5" />
              <span className="font-medium">Add Friend</span>
            </button>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-100 to-transparent" />
            <button 
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors"
              onClick={() => {
                setShowMenu(false);
                onTabChange('create-group');
              }}
            >
              <Users className="h-5 w-5" />
              <span className="font-medium">Create Group</span>
            </button>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-100 to-transparent" />
            <button 
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors"
              onClick={() => {
                setShowMenu(false);
                onTabChange('join-group');
              }}
            >
              <UserPlus2 className="h-5 w-5" />
              <span className="font-medium">Join Group</span>
            </button>
          </div>
        </>
      )}

      {/* Profile Menu */}
      {showProfileMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setShowProfileMenu(false)}
          />
          
          {/* Menu */}
          <div className="absolute bottom-20 right-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl w-56 overflow-hidden z-50 border border-purple-100">
            {/* Profile Header */}
            <div className="p-4 border-b border-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium text-lg">
                  JD
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">John Doe</h3>
                  <p className="text-sm text-gray-500">john@example.com</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <button 
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span className="font-medium">Settings</span>
            </button>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-100 to-transparent" />
            <button 
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              <span className="font-medium">Help & Support</span>
            </button>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-100 to-transparent" />
            <button 
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-purple-50 text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </>
      )}

      {/* Bottom Navigation */}
      <nav className="flex justify-around items-center bg-white/80 backdrop-blur-md border-t border-purple-100 relative shadow-lg">
        {navItems.map((item, index) => {
          if (item === null) {
            return (
              <button
                key="plus"
                onClick={() => setShowMenu(!showMenu)}
                className="relative -top-5 p-4 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:shadow-purple-200 transition-all duration-200 hover:-translate-y-1"
              >
                <Plus className="h-6 w-6" />
              </button>
            );
          }

          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'profile') {
                  setShowProfileMenu(!showProfileMenu);
                } else {
                  onTabChange(item.id);
                }
              }}
              className={cn(
                "flex flex-col items-center py-3 px-5 flex-1 relative transition-colors duration-200",
                activeTab === item.id ? "text-purple-600" : "text-gray-500 hover:text-purple-600"
              )}
            >
              <Icon className="h-6 w-6" />
              {item.badge && (
                <span className="absolute top-2 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {item.badge}
                </span>
              )}
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}