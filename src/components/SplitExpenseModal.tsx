import { X, Receipt, Users, DollarSign, Percent, Check, EyeOff, Image, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

interface SplitExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  participants: string[];
  isGroup: boolean;
  onSubmit: (expenseData: any) => void;
}

type SplitType = 'amount' | 'shares' | 'percentage';

export function SplitExpenseModal({ isOpen, onClose, participants, isGroup, onSubmit }: SplitExpenseModalProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [splitType, setSplitType] = useState<SplitType>('amount');
  const [selectedParticipants, setSelectedParticipants] = useState<Record<string, boolean>>({});
  const [shares, setShares] = useState<Record<string, number>>({});
  const [isSecretSplit, setIsSecretSplit] = useState(false);
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize participants and shares when modal opens
  useEffect(() => {
    if (isOpen) {
      // Initialize all participants as selected by default
      const initialSelectedParticipants: Record<string, boolean> = {};
      participants.forEach(participant => {
        initialSelectedParticipants[participant] = true;
      });
      setSelectedParticipants(initialSelectedParticipants);
      
      // Initialize shares
      const initialShares: Record<string, number> = {};
      participants.forEach(participant => {
        initialShares[participant] = 0;
      });
      setShares(initialShares);
      
      // Reset secret split and receipt image
      setIsSecretSplit(false);
      setReceiptImage(null);
    }
  }, [isOpen, participants]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form
    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    if (!description.trim()) {
      alert('Please enter a description');
      return;
    }
    
    // Get only selected participants
    const activeParticipants = Object.keys(selectedParticipants)
      .filter(participant => selectedParticipants[participant]);
    
    if (activeParticipants.length === 0) {
      alert('Please select at least one participant');
      return;
    }
    
    // Filter shares to only include selected participants
    const filteredShares: Record<string, number> = {};
    activeParticipants.forEach(participant => {
      filteredShares[participant] = shares[participant] || 0;
    });
    
    // Submit the expense data
    onSubmit({
      amount: Number(amount),
      description,
      splitType,
      selectedParticipants: activeParticipants,
      shares: filteredShares,
      isSecretSplit,
      receiptImage,
    });
    
    // Reset form
    setAmount('');
    setDescription('');
    setSplitType('amount');
    setIsSecretSplit(false);
    setReceiptImage(null);
    onClose();
  };

  const toggleParticipant = (participant: string) => {
    setSelectedParticipants(prev => ({
      ...prev,
      [participant]: !prev[participant]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Only image files are allowed');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setReceiptImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setReceiptImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Calculate equal splits when participants change
  useEffect(() => {
    if (splitType === 'equal') {
      const selectedCount = Object.values(selectedParticipants).filter(Boolean).length;
      if (selectedCount > 0 && amount) {
        const equalShare = Number(amount) / selectedCount;
        const newShares = { ...shares };
        
        Object.keys(selectedParticipants).forEach(participant => {
          newShares[participant] = selectedParticipants[participant] ? equalShare : 0;
        });
        
        setShares(newShares);
      }
    }
  }, [selectedParticipants, amount, splitType]);

  const calculateShare = (participant: string) => {
    if (!amount || !shares[participant]) return '0.00';
    const totalAmount = Number(amount);

    switch (splitType) {
      case 'amount':
        return shares[participant]?.toFixed(2) || '0.00';
      case 'shares':
        const totalShares = Object.values(shares).reduce((sum, share) => sum + (share || 0), 0);
        return totalShares ? ((shares[participant] || 0) / totalShares * totalAmount).toFixed(2) : '0.00';
      case 'percentage':
        return ((shares[participant] || 0) / 100 * totalAmount).toFixed(2);
      default:
        return '0.00';
    }
  };

  const getInputPlaceholder = () => {
    switch (splitType) {
      case 'amount': return '0.00';
      case 'shares': return '1';
      case 'percentage': return '0%';
    }
  };

  const validateInput = (value: string, participant: string) => {
    const num = Number(value);
    switch (splitType) {
      case 'amount':
        return num >= 0;
      case 'shares':
        return num >= 0 && Number.isInteger(num);
      case 'percentage':
        return num >= 0 && num <= 100;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-x-4 bottom-0 z-50 mb-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-md sm:w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Split Expense</h3>
                <div className="flex items-center gap-4">
                  {/* Secret Split Checkbox */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSecretSplit(!isSecretSplit)}
                      className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                        isSecretSplit
                          ? "bg-purple-600 border-purple-600 text-white"
                          : "border-gray-300 bg-white"
                      )}
                    >
                      {isSecretSplit && <Check className="h-3 w-3" />}
                    </button>
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-1 cursor-pointer" onClick={() => setIsSecretSplit(!isSecretSplit)}>
                      <EyeOff className="h-3.5 w-3.5 text-gray-500" />
                      Secret Split
                    </label>
                  </div>
                  
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              {/* Amount Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Description Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this for?"
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
              </div>
              
              {/* Receipt Image Upload */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Receipt Image (Optional)
                  </label>
                </div>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                
                {receiptImage ? (
                  <div className="relative">
                    <img 
                      src={receiptImage} 
                      alt="Receipt" 
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-purple-300 transition-colors"
                  >
                    <Image className="h-6 w-6 text-gray-400" />
                    <span className="text-sm text-gray-500">Click to upload receipt image</span>
                  </button>
                )}
              </div>
              
              {/* Split Type Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Split Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSplitType('amount')}
                    className={cn(
                      "py-2 px-4 rounded-lg text-sm font-medium",
                      splitType === 'amount'
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-gray-100 text-gray-700 border border-gray-200"
                    )}
                  >
                    Amount
                  </button>
                  <button
                    type="button"
                    onClick={() => setSplitType('shares')}
                    className={cn(
                      "py-2 px-4 rounded-lg text-sm font-medium",
                      splitType === 'shares'
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-gray-100 text-gray-700 border border-gray-200"
                    )}
                  >
                    Shares
                  </button>
                  <button
                    type="button"
                    onClick={() => setSplitType('percentage')}
                    className={cn(
                      "py-2 px-4 rounded-lg text-sm font-medium",
                      splitType === 'percentage'
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-gray-100 text-gray-700 border border-gray-200"
                    )}
                  >
                    Percentage
                  </button>
                </div>
              </div>
              
              {/* Participants */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Participants
                  </label>
                </div>
                
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {participants.map((participant) => (
                    <div key={participant} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleParticipant(participant)}
                          className={cn(
                            "w-6 h-6 rounded border flex items-center justify-center transition-colors",
                            selectedParticipants[participant]
                              ? "bg-purple-600 border-purple-600 text-white"
                              : "border-gray-300 bg-white"
                          )}
                        >
                          {selectedParticipants[participant] && <Check className="h-4 w-4" />}
                        </button>
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                          {participant[0]}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{participant}</span>
                      </div>
                      {selectedParticipants[participant] && (
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            value={shares[participant] || ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              setShares({
                                ...shares,
                                [participant]: Number(value)
                              });
                            }}
                            placeholder="0.00"
                            className="w-24 px-3 py-1 border border-gray-200 rounded-lg text-right"
                          />
                          {splitType === 'percentage' && (
                            <span className="text-sm text-gray-500">%</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Secret Split Info */}
              {isSecretSplit && (
                <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <EyeOff className="h-4 w-4 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-purple-700 font-medium">Secret Split</p>
                      <p className="text-xs text-purple-600 mt-1">
                        Only you and the participants will see the details of this expense. 
                        Other group members will only see that an expense was added.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-xl hover:from-purple-700 hover:to-purple-800 transition-colors"
              >
                Split Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
} 