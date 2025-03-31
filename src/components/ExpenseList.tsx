import React from 'react';
import { Receipt } from 'lucide-react';

interface Expense {
  id: number;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  date: Date;
}

interface ExpenseListProps {
  expenses: Expense[];
}

export function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="bg-white rounded-lg shadow p-4 flex items-start space-x-4"
        >
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Receipt className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{expense.description}</p>
            <p className="text-sm text-gray-500">
              Paid by {expense.paidBy} • {expense.date.toLocaleDateString()}
            </p>
            <div className="mt-2">
              <p className="text-xs text-gray-500">Split between:</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {expense.splitBetween.map((person) => (
                  <span
                    key={person}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {person}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="text-sm font-medium text-gray-900">₹{expense.amount}</span>
          </div>
        </div>
      ))}
    </div>
  );
}