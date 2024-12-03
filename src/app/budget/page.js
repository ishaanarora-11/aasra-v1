"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

import { Heart, UserCircle } from 'lucide-react';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const BudgetGroceryList = () => {
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [showList, setShowList] = useState(false);

  // Basic grocery items with prices in rupees
  const groceryItems = {
    essentials: [
      { name: 'Bread', price: 45, qty: 2, category: 'Staples' },
      { name: 'Milk (1 liter)', price: 62, qty: 2, category: 'Dairy' },
      { name: 'Eggs (dozen)', price: 84, qty: 1, category: 'Dairy' },
      { name: 'Rice (1 kg)', price: 75, qty: 1, category: 'Staples' },
      { name: 'Atta (1 kg)', price: 65, qty: 2, category: 'Staples' },
      { name: 'Chicken (1 kg)', price: 220, qty: 1, category: 'Protein' },
      { name: 'Dal (1 kg)', price: 140, qty: 1, category: 'Protein' },
      { name: 'Bananas (dozen)', price: 60, qty: 1, category: 'Produce' },
      { name: 'Apples (1 kg)', price: 120, qty: 1, category: 'Produce' },
      { name: 'Potatoes (1 kg)', price: 40, qty: 1, category: 'Produce' },
      { name: 'Onions (1 kg)', price: 35, qty: 1, category: 'Produce' },
      { name: 'Tomatoes (1 kg)', price: 45, qty: 1, category: 'Produce' },
      { name: 'Cooking Oil (1 L)', price: 180, qty: 1, category: 'Staples' },
      { name: 'Tea Powder (250g)', price: 120, qty: 1, category: 'Beverages' },
      { name: 'Sugar (1 kg)', price: 55, qty: 1, category: 'Staples' }
    ]
  };

  // Category colors
  const categoryColors = {
    'Staples': 'bg-orange-100',
    'Dairy': 'bg-blue-100',
    'Protein': 'bg-red-100',
    'Produce': 'bg-green-100',
    'Beverages': 'bg-purple-100',
  };

  const categoryTextColors = {
    'Staples': 'text-orange-800',
    'Dairy': 'text-blue-800',
    'Protein': 'text-red-800',
    'Produce': 'text-green-800',
    'Beverages': 'text-purple-800',
  };

  const calculateGroceryList = () => {
    const multiplier = duration === 'week' ? 1 : duration === '2-weeks' ? 2 : 4;
    let list = groceryItems.essentials.map(item => ({
      ...item,
      qty: item.qty * multiplier,
      totalPrice: (item.price * item.qty * multiplier).toFixed(2)
    }));

    return Object.groupBy(list, item => item.category);
  };

  const getTotalAmount = (list) => {
    return Object.values(list)
      .flat()
      .reduce((sum, item) => sum + parseFloat(item.totalPrice), 0)
      .toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowList(true);
  };

  const groceryList = calculateGroceryList();
  const totalAmount = getTotalAmount(groceryList);

  return (
    <>
    <nav className="fixed w-full z-50">
      {/* Blur effect background */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-lg border-b border-gray-200" />

      {/* Navbar content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo as a button */}
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105"
          >
            <Heart className="w-8 h-8 text-rose-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Aasra
            </span>
          </button>

          {/* Dashboard and Profile */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="px-4 py-2 rounded-lg bg-rose-500 text-white font-medium hover:bg-rose-600 transition-all duration-200 hover:scale-105 shadow-sm"
            >
              Dashboard
            </button>
            
              <SignedIn>
            <UserButton />
          </SignedIn>
            
          </div>
        </div>
      </div>
    </nav>
    
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-50">
      
      <Card className="mb-6 border-t-4 border-t-blue-500 shadow-lg pt-20">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardTitle className="text-2xl text-blue-800">Budget Grocery List Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="budget" className="font-medium text-gray-700">Budget Amount (₹)</label>
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter your budget"
                className="max-w-xs border-2 border-blue-200 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label htmlFor="duration" className="font-medium text-gray-700">Duration</label>
              <Select value={duration} onValueChange={setDuration} required>
                <SelectTrigger className="max-w-xs border-2 border-blue-200">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">1 Week</SelectItem>
                  <SelectItem value="2-weeks">2 Weeks</SelectItem>
                  <SelectItem value="month">1 Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700">
              Generate List
            </Button>
          </form>
        </CardContent>
      </Card>

      {showList && (
        <div className="space-y-4">
          {budget && parseFloat(totalAmount) > parseFloat(budget) && (
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertTitle className="text-red-800">Budget Exceeded</AlertTitle>
              <AlertDescription className="text-red-700">
                The total cost (₹{totalAmount}) exceeds your budget (₹{budget}). Consider adjusting quantities or choosing fewer items.
              </AlertDescription>
            </Alert>
          )}

          {Object.entries(groceryList).map(([category, items]) => (
            <Card key={category} className={`shadow-md ${categoryColors[category]} border-none`}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-lg ${categoryTextColors[category]}`}>
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <div key={index} className="py-3 flex justify-between items-center">
                      <div>
                        <span className="font-medium text-gray-800">{item.name}</span>
                        <span className="text-gray-600 ml-2">x{item.qty}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">₹{item.price}/unit</div>
                        <div className="font-medium text-gray-800">₹{item.totalPrice}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="shadow-lg bg-gradient-to-r from-blue-500 to-blue-600">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center text-lg font-bold text-white">
                <span>Total Amount:</span>
                <span>₹{totalAmount}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
    </>
  );
};

export default BudgetGroceryList;