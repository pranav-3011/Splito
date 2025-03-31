import { useState } from 'react';
import { ArrowLeft, Send, MoreVertical, Receipt, DollarSign, Users, Check, Clock, EyeOff } from 'lucide-react';
import { SplitExpenseModal } from './SplitExpenseModal';
import { GroupDetailsScreen } from './GroupDetailsScreen';
import { cn } from '../lib/utils';

interface ExpenseParticipant {
  name: string;
  amount: number;
  isPaid: boolean;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isExpense?: boolean;
  isSecretSplit?: boolean;
  expenseDetails?: {
    title: string;
    amount: number;
    splitType: 'equal' | 'amount' | 'percentage' | 'shares';
    participants: ExpenseParticipant[];
    receiptImage?: string;
  };
}

interface ChatScreenProps {
  name: string;
  avatar?: string;
  isGroup: boolean;
  onBack: () => void;
}

export function ChatScreen({ name, avatar, isGroup, onBack }: ChatScreenProps) {
  const [message, setMessage] = useState('');
  const [showSplitExpense, setShowSplitExpense] = useState(false);
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'John',
      content: 'Added an expense',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isExpense: true,
      expenseDetails: {
        title: 'Lunch at Cafe',
        amount: 1200,
        splitType: 'equal',
        participants: [
          { name: 'John', amount: 400, isPaid: true },
          { name: 'Alice', amount: 400, isPaid: false },
          { name: 'You', amount: 400, isPaid: false }
        ]
      }
    },
    {
      id: '2',
      sender: 'You',
      content: "I'll pay my share soon!",
      timestamp: new Date(Date.now() - 3000000) // 50 minutes ago
    },
    {
      id: '3',
      sender: 'Alice',
      content: 'Added an expense',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      isExpense: true,
      expenseDetails: {
        title: 'Movie tickets',
        amount: 900,
        splitType: 'amount',
        participants: [
          { name: 'Alice', amount: 450, isPaid: true },
          { name: 'You', amount: 300, isPaid: false },
          { name: 'Bob', amount: 150, isPaid: false }
        ]
      }
    },
    {
      id: '4',
      sender: 'Bob',
      content: 'Thanks for organizing!',
      timestamp: new Date(Date.now() - 900000) // 15 minutes ago
    }
  ]);

  // Example participants - in real app, this would come from props
  const participants = isGroup 
    ? ['John', 'Alice', 'Bob', 'You']
    : [name, 'You'];

  // Example group members for details screen
  const groupMembers = [
    { id: '1', name: 'John', color: 'blue', isAdmin: true },
    { id: '2', name: 'Alice', color: 'pink' },
    { id: '3', name: 'Bob', color: 'green' },
    { id: 'current-user-id', name: 'You', color: 'purple' }
  ];

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: message.trim(),
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleAddExpense = (expenseData: any) => {
    console.log("Expense data received:", expenseData);
    
    // Calculate participant amounts based on split type
    const totalAmount = Number(expenseData.amount);
    let participantAmounts: ExpenseParticipant[] = [];
    
    // Get the selected participants
    const selectedParticipants = expenseData.selectedParticipants;
    
    if (expenseData.splitType === 'equal') {
      const perPersonAmount = totalAmount / selectedParticipants.length;
      participantAmounts = selectedParticipants.map(name => ({
        name,
        amount: perPersonAmount,
        isPaid: name === 'You'
      }));
    } else {
      participantAmounts = selectedParticipants.map(name => {
        let amount = 0;
        
        if (expenseData.splitType === 'amount') {
          amount = expenseData.shares[name] || 0;
        } else if (expenseData.splitType === 'percentage') {
          amount = (expenseData.shares[name] || 0) / 100 * totalAmount;
        } else if (expenseData.splitType === 'shares') {
          const totalShares = Object.values(expenseData.shares).reduce((sum: number, share: any) => sum + (Number(share) || 0), 0);
          amount = totalShares > 0 ? (expenseData.shares[name] || 0) / totalShares * totalAmount : 0;
        }
        
        return {
          name,
          amount,
          isPaid: name === 'You'
        };
      });
    }
    
    // Create a new expense message
    const newExpenseMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: 'Added an expense',
      timestamp: new Date(),
      isExpense: true,
      isSecretSplit: expenseData.isSecretSplit,
      expenseDetails: {
        title: expenseData.description,
        amount: totalAmount,
        splitType: expenseData.splitType,
        participants: participantAmounts,
        receiptImage: expenseData.receiptImage
      }
    };
    
    // Add the new message to the chat
    setMessages([...messages, newExpenseMessage]);
    
    // Close the modal
    setShowSplitExpense(false);
  };

  if (showGroupDetails && isGroup) {
    return (
      <GroupDetailsScreen
        groupId="group-id" // In a real app, pass the actual group ID
        groupName={name}
        members={groupMembers}
        onBack={() => setShowGroupDetails(false)}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header - Fixed at top */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-100 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-purple-50 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              onClick={() => isGroup && setShowGroupDetails(true)}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-medium">
                {name[0]}
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">{name}</h1>
                {isGroup && <p className="text-xs text-gray-500">{participants.length} members</p>}
              </div>
            </button>
          </div>
          <button className="p-2 hover:bg-purple-50 rounded-full transition-colors">
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-4 mt-12 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={cn(
              "max-w-[85%] p-4 shadow-sm",
              msg.sender === 'You' 
                ? "bg-purple-600 text-white rounded-t-2xl rounded-l-2xl" 
                : "bg-white/80 backdrop-blur-md text-gray-900 rounded-t-2xl rounded-r-2xl"
            )}>
              {isGroup && msg.sender !== 'You' && (
                <p className={cn(
                  "text-xs font-medium mb-1",
                  msg.sender === 'You' ? "text-purple-200" : "text-purple-600"
                )}>
                  {msg.sender}
                </p>
              )}
              
              {msg.isExpense && msg.expenseDetails ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Receipt className={cn(
                      "h-5 w-5",
                      msg.sender === 'You' ? "text-purple-200" : "text-purple-600"
                    )} />
                    <span className="font-semibold">{msg.expenseDetails.title}</span>
                    {msg.isSecretSplit && (
                      <div className="bg-purple-200/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <EyeOff className="h-3 w-3 text-purple-300" />
                        <span className="text-xs text-purple-300">Secret</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 opacity-70" />
                    <span className="font-bold text-lg">₹{msg.expenseDetails.amount.toLocaleString()}</span>
                  </div>
                  
                  {/* Receipt Image */}
                  {msg.expenseDetails.receiptImage && (
                    <div className="mt-2">
                      <img 
                        src={msg.expenseDetails.receiptImage} 
                        alt="Receipt" 
                        className="w-full max-h-48 object-cover rounded-lg border border-gray-200 cursor-pointer"
                        onClick={() => window.open(msg.expenseDetails.receiptImage, '_blank')}
                      />
                    </div>
                  )}
                  
                  <div className={cn(
                    "text-xs rounded-lg p-3",
                    msg.sender === 'You' 
                      ? "bg-purple-700/50" 
                      : "bg-purple-50"
                  )}>
                    <div className="flex items-center gap-1 mb-2">
                      <Users className="h-3.5 w-3.5" />
                      <span className="font-medium">Split details</span>
                    </div>
                    
                    <div className="space-y-2">
                      {msg.expenseDetails.participants.map((participant, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span>{participant.name}</span>
                          <div className="flex items-center gap-1.5">
                            <span>₹{Math.round(participant.amount).toLocaleString()}</span>
                            {participant.isPaid ? (
                              <Check className="h-3.5 w-3.5 text-green-500" />
                            ) : (
                              <Clock className="h-3.5 w-3.5 text-amber-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {msg.sender !== 'You' && (
                    <div className="flex gap-2 mt-2">
                      <button className="px-3 py-1.5 bg-purple-600 text-white text-xs font-medium rounded-full">
                        Pay Now
                      </button>
                      <button className="px-3 py-1.5 bg-white/50 text-purple-700 text-xs font-medium rounded-full border border-purple-200">
                        Remind
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p>{msg.content}</p>
              )}
              
              <p className={cn(
                "text-xs mt-2",
                msg.sender === 'You' ? "text-purple-200/70" : "text-gray-500/70"
              )}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {/* Add an invisible element to help with scrolling to bottom */}
        <div id="message-end" className="h-4" />
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="p-4 bg-white/80 backdrop-blur-md border-t border-purple-100 fixed bottom-0 left-0 right-0 z-10">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors"
            onClick={() => setShowSplitExpense(true)}
          >
            <Receipt className="h-5 w-5 text-purple-600" />
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white/50 backdrop-blur-md border border-purple-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          />
          
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Split Expense Modal */}
      <SplitExpenseModal
        isOpen={showSplitExpense}
        onClose={() => setShowSplitExpense(false)}
        participants={participants}
        isGroup={isGroup}
        onSubmit={handleAddExpense}
      />
    </div>
  );
} 
