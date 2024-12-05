// GroceryContext.js
"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';

const GroceryContext = createContext(null);

export const GroceryProvider = ({ children }) => {
  const [groceryList, setGroceryList] = useState(() => {
    // Initialize from localStorage if exists
    const savedList = localStorage.getItem('groceryList');
    return savedList ? JSON.parse(savedList) : [];
  });

  // Save to localStorage whenever groceryList changes
  useEffect(() => {
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
  }, [groceryList]);

  return (
    <GroceryContext.Provider value={{ groceryList, setGroceryList }}>
      {children}
    </GroceryContext.Provider>
  );
};

export const useGrocery = () => {
  const context = useContext(GroceryContext);
  if (!context) {
    throw new Error('useGrocery must be used within a GroceryProvider');
  }
  return context;
};