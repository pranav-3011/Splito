import { useState } from 'react';
import { Home, Users, PieChart, Bell, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { ProfileScreen } from './ProfileScreen';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  if (showProfile) {
    return <ProfileScreen onBack={() => setShowProfile(false)} />;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 z-10">
      <div className="flex items-center justify-between px-6 py-3">
        <button
          onClick={() => onTabChange('home')}
          className={cn(
            "flex flex-col items-center gap-1",
            activeTab === 'home' ? "text-purple-600" : "text-gray-500"
          )}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs font-medium">Home</span>
        </button>
        
        <button
          onClick={() => onTabChange('groups')}
          className={cn(
            "flex flex-col items-center gap-1",
            activeTab === 'groups' ? "text-purple-600" : "text-gray-500"
          )}
        >
          <Users className="h-6 w-6" />
          <span className="text-xs font-medium">Groups</span>
        </button>
        
        <button
          onClick={() => onTabChange('activity')}
          className={cn(
            "flex flex-col items-center gap-1",
            activeTab === 'activity' ? "text-purple-600" : "text-gray-500"
          )}
        >
          <PieChart className="h-6 w-6" />
          <span className="text-xs font-medium">Activity</span>
        </button>
        
        <button
          onClick={() => setShowProfile(true)}
          className={cn(
            "flex flex-col items-center gap-1",
            activeTab === 'profile' ? "text-purple-600" : "text-gray-500"
          )}
        >
          <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-medium">
            J
          </div>
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
} 