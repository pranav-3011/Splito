import React, { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { cn } from '../lib/utils';

interface ExpenseFormProps {
  onAddExpense: (expense: {
    description: string;
    amount: number;
    paidBy: string;
    splitBetween: string[];
  }) => void;
}

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [splitBetween, setSplitBetween] = useState<string[]>([]);
  const [newFriend, setNewFriend] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !paidBy || splitBetween.length === 0) return;

    onAddExpense({
      description,
      amount: parseFloat(amount),
      paidBy,
      splitBetween,
    });

    setDescription('');
    setAmount('');
    setPaidBy('');
    setSplitBetween([]);
  };

  const addFriend = () => {
    if (newFriend && !splitBetween.includes(newFriend)) {
      setSplitBetween([...splitBetween, newFriend]);
      setNewFriend('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          placeholder="Dinner, Movie tickets, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">₹</span>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Paid by</label>
        <input
          type="text"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          placeholder="Enter name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Split between</label>
        <div className="mt-1 flex gap-2">
          <input
            type="text"
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="Add friend"
          />
          <button
            type="button"
            onClick={addFriend}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {splitBetween.map((friend) => (
            <span
              key={friend}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
            >
              {friend}
              <button
                type="button"
                onClick={() => setSplitBetween(splitBetween.filter((f) => f !== friend))}
                className="ml-1 inline-flex items-center p-0.5 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-500 focus:outline-none"
              >
                <span className="sr-only">Remove</span>
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className={cn(
          "w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        disabled={!description || !amount || !paidBy || splitBetween.length === 0}
      >
        Add Expense
      </button>
    </form>
  );
}