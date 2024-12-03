import React from 'react';
import { Heart, UserCircle } from 'lucide-react';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const Navbar = () => {
  return (
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
  );
};

export default Navbar;