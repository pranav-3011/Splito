import { useState } from 'react';
import { ArrowLeft, MoreVertical, UserPlus, LogOut, Trash2, X, Share2, QrCode } from 'lucide-react';
import { cn } from '../lib/utils';

interface GroupMember {
  id: string;
  name: string;
  color?: string;
  isAdmin?: boolean;
}

interface GroupDetailsScreenProps {
  groupId: string;
  groupName: string;
  members: GroupMember[];
  onBack: () => void;
}

export function GroupDetailsScreen({ groupId, groupName, members, onBack }: GroupDetailsScreenProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  
  const colors = {
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    pink: 'bg-pink-500',
    orange: 'bg-orange-500',
    indigo: 'bg-indigo-500',
  };

  // Default color if not specified
  const getColor = (member: GroupMember) => {
    return colors[member.color || 'purple'];
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 to-pink-50">
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
            <h1 className="text-lg font-semibold text-gray-900">Group Details</h1>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 hover:bg-purple-50 rounded-full transition-colors"
            >
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
            
            {showOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 border border-purple-100 z-10">
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-purple-50"
                  onClick={() => {
                    setShowQrCode(true);
                    setShowOptions(false);
                  }}
                >
                  <QrCode className="h-4 w-4 text-gray-500" />
                  Show QR Code
                </button>
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-purple-50"
                  onClick={() => {
                    console.log('Add members');
                    setShowOptions(false);
                  }}
                >
                  <UserPlus className="h-4 w-4 text-gray-500" />
                  Add Members
                </button>
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-purple-50"
                  onClick={() => {
                    console.log('Leave group');
                    setShowOptions(false);
                  }}
                >
                  <LogOut className="h-4 w-4 text-gray-500" />
                  Leave Group
                </button>
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  onClick={() => {
                    console.log('Delete group');
                    setShowOptions(false);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  Delete Group
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Group Info */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Group Avatar and Name */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-4xl font-medium mb-3">
            {groupName[0]}
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{groupName}</h2>
          <p className="text-sm text-gray-500 mt-1">{members.length} members</p>
          
          {/* Invite Button */}
          <button
            onClick={() => setShowQrCode(true)}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            <span className="text-sm font-medium">Invite to Group</span>
          </button>
        </div>

        {/* Group Members */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-purple-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium text-gray-900">Members</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${getColor(member)} flex items-center justify-center text-white font-medium`}>
                    {member.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    {member.isAdmin && (
                      <span className="text-xs text-purple-600">Admin</span>
                    )}
                  </div>
                </div>
                {member.id !== 'current-user-id' && (
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => console.log('Remove member', member.id)}
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Shared Expenses Summary */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-purple-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium text-gray-900">Shared Expenses</h3>
          </div>
          <div className="p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Total expenses</span>
              <span className="font-medium text-gray-900">₹4,500</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Your share</span>
              <span className="font-medium text-gray-900">₹1,125</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">You owe</span>
              <span className="font-medium text-red-600">₹500</span>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrCode && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={() => setShowQrCode(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-x-4 bottom-0 z-50 mb-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-md sm:w-full">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Join {groupName}</h3>
                <p className="text-sm text-gray-500 text-center mb-6">
                  Scan this QR code to join the group
                </p>
                
                {/* QR Code */}
                <div className="w-64 h-64 bg-white p-4 rounded-xl border border-purple-100 mb-6">
                  {/* This would be a real QR code in production */}
                  <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTcyIDcySDg4VjEwNEg3MlY3MloiIGZpbGw9ImJsYWNrIi8+PHBhdGggZD0iTTEwNCA3MkgxMjBWODhIMTA0VjcyWiIgZmlsbD0iYmxhY2siLz48cGF0aCBkPSJNMTM2IDcySDE1MlY4OEgxMzZWNzJaIiBmaWxsPSJibGFjayIvPjxwYXRoIGQ9Ik0xNjggNzJIMTg0VjEwNEgxNjhWNzJaIiBmaWxsPSJibGFjayIvPjxwYXRoIGQ9Ik03MiAxMDRIODhWMTIwSDcyVjEwNFoiIGZpbGw9ImJsYWNrIi8+PHBhdGggZD0iTTEwNCAxMDRIMTIwVjEyMEgxMDRWMTA0WiIgZmlsbD0iYmxhY2siLz48cGF0aCBkPSJNMTM2IDEwNEgxNTJWMTIwSDEzNlYxMDRaIiBmaWxsPSJibGFjayIvPjxwYXRoIGQ9Ik0xNjggMTA0SDE4NFYxMjBIMTY4VjEwNFoiIGZpbGw9ImJsYWNrIi8+PHBhdGggZD0iTTcyIDEzNkg4OFYxNTJINzJWMTM2WiIgZmlsbD0iYmxhY2siLz48cGF0aCBkPSJNMTA0IDEzNkgxMjBWMTUySDEwNFYxMzZaIiBmaWxsPSJibGFjayIvPjxwYXRoIGQ9Ik0xMzYgMTM2SDE1MlYxNTJIMTM2VjEzNloiIGZpbGw9ImJsYWNrIi8+PHBhdGggZD0iTTE2OCAxMzZIMTg0VjE1MkgxNjhWMTM2WiIgZmlsbD0iYmxhY2siLz48cGF0aCBkPSJNNzIgMTUySDg4VjE4NEg3MlYxNTJaIiBmaWxsPSJibGFjayIvPjxwYXRoIGQ9Ik0xMDQgMTUySDEyMFYxNjhIMTA0VjE1MloiIGZpbGw9ImJsYWNrIi8+PHBhdGggZD0iTTEzNiAxNTJIMTUyVjE2OEgxMzZWMTUyWiIgZmlsbD0iYmxhY2siLz48cGF0aCBkPSJNMTY4IDE1MkgxODRWMTg0SDE2OFYxNTJaIiBmaWxsPSJibGFjayIvPjwvc3ZnPg==')] bg-contain"></div>
                </div>
                
                {/* Share Options */}
                <div className="w-full space-y-3">
                  <button
                    onClick={() => {
                      console.log('Copy link');
                      // In a real app, copy the invite link to clipboard
                      // navigator.clipboard.writeText('https://splitwise.app/join/group/123456');
                    }}
                    className="w-full py-2.5 px-4 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors"
                  >
                    Copy Invite Link
                  </button>
                  
                  <button
                    onClick={() => setShowQrCode(false)}
                    className="w-full py-2.5 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 