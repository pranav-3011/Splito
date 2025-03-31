import { useState } from 'react';
import { ArrowLeft, Search, Plus, X, Check, Users } from 'lucide-react';
import { cn } from '../lib/utils';

interface Friend {
  id: string;
  name: string;
  avatar?: string;
}

interface CreateGroupScreenProps {
  onBack: () => void;
  onCreateGroup: (name: string, members: { id: string; name: string }[]) => void;
}

export function CreateGroupScreen({ onBack, onCreateGroup }: CreateGroupScreenProps) {
  const [groupName, setGroupName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);

  // Example friends data - in real app, this would come from props or a store
  const friends: Friend[] = [
    { id: '1', name: 'Alice Johnson' },
    { id: '2', name: 'Bob Smith' },
    { id: '3', name: 'Charlie Brown' },
    { id: '4', name: 'David Wilson' },
    { id: '5', name: 'Eve Anderson' },
    { id: '6', name: 'Frank Thomas' },
    { id: '7', name: 'Grace Lee' },
    { id: '8', name: 'Henry Martin' },
  ];

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedFriends.find(selected => selected.id === friend.id)
  );

  const handleSelectFriend = (friend: Friend) => {
    setSelectedFriends([...selectedFriends, friend]);
    setSearchQuery('');
  };

  const handleRemoveFriend = (friendId: string) => {
    setSelectedFriends(selectedFriends.filter(friend => friend.id !== friendId));
  };

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedFriends.length > 0) {
      onCreateGroup(groupName.trim(), selectedFriends.map(friend => ({ id: friend.id, name: friend.name })));
    }
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
            <h1 className="text-lg font-semibold text-gray-900">Create New Group</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Group Name Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Group Name
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-md border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Selected Friends */}
        {selectedFriends.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Selected Members ({selectedFriends.length})
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                    {friend.name[0]}
                  </div>
                  <span className="text-sm font-medium text-purple-900">
                    {friend.name}
                  </span>
                  <button
                    onClick={() => handleRemoveFriend(friend.id)}
                    className="p-1 hover:bg-purple-100 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4 text-purple-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Friend Search */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Add Members
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search friends"
              className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-md border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Friends List */}
        <div className="space-y-2">
          {filteredFriends.map((friend) => (
            <button
              key={friend.id}
              onClick={() => handleSelectFriend(friend)}
              className="w-full flex items-center justify-between p-3 bg-white/80 backdrop-blur-md border border-purple-100 rounded-xl hover:bg-purple-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium">
                  {friend.name[0]}
                </div>
                <span className="font-medium text-gray-900">{friend.name}</span>
              </div>
              <Plus className="h-5 w-5 text-purple-600" />
            </button>
          ))}
        </div>
      </div>

      {/* Create Button */}
      <div className="p-4 bg-white/80 backdrop-blur-md border-t border-purple-100">
        <button
          onClick={handleCreateGroup}
          disabled={!groupName.trim() || selectedFriends.length === 0}
          className={cn(
            "w-full py-3 px-4 rounded-xl font-medium transition-colors",
            groupName.trim() && selectedFriends.length > 0
              ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
        >
          Create Group
        </button>
      </div>
    </div>
  );
} 