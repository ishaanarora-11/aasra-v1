"use client"
import React from "react";
import { Heart, UserCircle } from 'lucide-react';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'


const page = () => {
  return (
    <>
    <nav className="fixed w-full z-50 ">
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
    

    <div className="container mx-auto px-4 py-8 bg-emerald-50 pt-20">
      
      <h1 className="text-3xl text-emerald-800 font-bold mb-8 text-center">Your Health Progress</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Health Meter Section */}
        <div className="bg-yellow-50 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Health Meter</h2>
          <div className="relative w-48 h-48 mx-auto">
            {/* Circular meter background */}
            <div className="absolute inset-0 rounded-full border-8 border-emerald-100"></div>
            {/* Rotating health indicator - 75% healthy in this example */}
            <div 
              className="absolute inset-0 rounded-full border-8 border-emerald-400"
              style={{
                clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)',
                transform: 'rotate(270deg)'
              }}
            ></div>
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-emerald-700">75%</span>
            </div>
          </div>
          <p className="text-center mt-4 text-emerald-700">Your Health Score</p>
        </div>

        {/* Calorie Counter Section */}
        <div className="bg-yellow-50 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Daily Calories</h2>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-emerald-700 mb-2">1,850</div>
            <p className="text-emerald-600 mb-4">calories consumed today</p>
            <div className="w-full bg-emerald-100 rounded-full h-4 mb-2">
              <div 
                className="bg-emerald-400 h-4 rounded-full"
                style={{ width: '75%' }}
              ></div>
            </div>
            <p className="text-sm text-emerald-600">Daily Goal: 2,500 calories</p>
          </div>
        </div>
      </div>

      {/* Community Rating Section */}
      <div className="mt-8 bg-yellow-50 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Your PG Community Rating</h2>
        <div className="flex items-center justify-center space-x-2">
          <div className="flex">
            {[1, 2, 3, 4].map((star) => (
              <span key={star} className="text-3xl text-yellow-400">★</span>
            ))}
            <span className="text-3xl text-yellow-200">★</span>
          </div>
          <span className="text-2xl font-bold text-emerald-700">4.0</span>
        </div>
        <p className="text-center mt-2 text-emerald-600">Based on your cooking and participation</p>
      </div>
    </div>
    </>

  )
};

export default page;
