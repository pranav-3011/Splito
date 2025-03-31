import { useState } from 'react';
import { ArrowLeft, Camera, LogOut, Moon, Bell, Shield, CreditCard, HelpCircle, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProfileScreenProps {
  onBack: () => void;
}

export function ProfileScreen({ onBack }: ProfileScreenProps) {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-purple-50 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="font-semibold text-gray-900">Profile</h1>
          </div>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="p-6 space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl font-medium">
              J
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white shadow-md">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">John Doe</h2>
          <p className="text-gray-500">john.doe@example.com</p>
          <p className="text-gray-500">+1 234 567 8900</p>
        </div>
        
        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Account Settings */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Account</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">Personal Information</span>
                </div>
                <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180" />
              </button>
              
              <div className="h-px bg-gray-100" />
              
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">Payment Methods</span>
                </div>
                <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180" />
              </button>
            </div>
          </div>
          
          {/* Preferences */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Preferences</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">Notifications</span>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="notifications"
                    className="sr-only"
                    defaultChecked
                  />
                  <label
                    htmlFor="notifications"
                    className="block w-12 h-6 rounded-full bg-purple-600"
                  >
                    <span className="block w-4 h-4 mt-1 ml-1 bg-white rounded-full transition-transform duration-300 transform translate-x-6"></span>
                  </label>
                </div>
              </div>
              
              <div className="h-px bg-gray-100" />
              
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">Dark Mode</span>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="darkMode"
                    className="sr-only"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <label
                    htmlFor="darkMode"
                    className={cn(
                      "block w-12 h-6 rounded-full transition-colors",
                      darkMode ? "bg-purple-600" : "bg-gray-300"
                    )}
                  >
                    <span 
                      className={cn(
                        "block w-4 h-4 mt-1 ml-1 bg-white rounded-full transition-transform duration-300 transform",
                        darkMode ? "translate-x-6" : "translate-x-0"
                      )}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Security */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Security</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">Privacy & Security</span>
                </div>
                <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180" />
              </button>
            </div>
          </div>
          
          {/* Support */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Support</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">Help & Support</span>
                </div>
                <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Logout Button */}
        <button className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
} 