import { useState } from 'react';
import {  Search } from 'lucide-react';
import { HomeScreen } from './components/HomeScreen';
import { BottomNav } from './components/BottomNav';
import { ChatScreen } from './components/ChatScreen';
import { ActivityScreen } from './components/ActivityScreen';
import { AlertsScreen } from './components/AlertsScreen';
import { CreateGroupScreen } from './components/CreateGroupScreen';

interface Expense {
  id: number;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  date: Date;
}

interface Group {
  id: string;
  name: string;
  members: { id: string; name: string }[];
  color: string;
  unreadCount?: number;
}

type TabType = 'home' | 'activity' | 'notifications' | 'create-group';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Weekend Trip',
      members: [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
        { id: '3', name: 'Charlie' }
      ],
      color: 'purple',
      unreadCount: 2
    },
    {
      id: '2',
      name: 'Roommates',
      members: [
        { id: '4', name: 'David' },
        { id: '5', name: 'Eve' }
      ],
      color: 'blue',
      unreadCount: 1
    }
  ]);
  const [selectedChat, setSelectedChat] = useState<{ id: string; name: string; isGroup: boolean } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddExpense = (expenseData: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now(),
      date: new Date(),
    };
    setExpenses([newExpense, ...expenses]);
    setActiveTab('home');
  };

  const handleCreateGroup = (name: string, members: { id: string; name: string }[]) => {
    const newGroup: Group = {
      id: Date.now().toString(), // In a real app, use a proper ID generator
      name,
      members,
      color: getRandomColor(),
      unreadCount: 0
    };
    setGroups([...groups, newGroup]);
    setActiveTab('home');
  };

  const getRandomColor = () => {
    const colors = ['purple', 'blue', 'green', 'pink', 'orange', 'indigo'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const renderContent = () => {
    if (selectedChat) {
      return (
        <ChatScreen
          name={selectedChat.name}
          isGroup={selectedChat.isGroup}
          onBack={() => setSelectedChat(null)}
        />
      );
    }

    // Add search bar for home and activity screens
    const showSearch = activeTab === 'home' || activeTab === 'activity';

    return (
      <>
        {showSearch && (
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder={activeTab === 'activity' ? "Search activities..." : "Search groups or friends..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/80 backdrop-blur-md border border-purple-100 rounded-xl px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}

        {(() => {
          switch (activeTab) {
            case 'home':
              return (
                <HomeScreen 
                  groups={groups}
                  onChatSelect={setSelectedChat} 
                  onTabChange={setActiveTab} 
                />
              );
            case 'activity':
              return <ActivityScreen />;
            case 'notifications':
              return <AlertsScreen />;
            case 'create-group':
              return (
                <CreateGroupScreen 
                  onBack={() => setActiveTab('home')}
                  onCreateGroup={handleCreateGroup}
                />
              );
            default:
              return (
                <HomeScreen 
                  groups={groups}
                  onChatSelect={setSelectedChat} 
                  onTabChange={setActiveTab} 
                />
              );
          }
        })()}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-lg mx-auto p-4 pb-20">
        <div className="relative">
          <div className="absolute inset-0 bg-white/50 backdrop-blur-xl -z-10 rounded-2xl" />
          {renderContent()}
        </div>
      </div>

      {!selectedChat && activeTab !== 'create-group' && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}

export default App;