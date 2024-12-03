"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Frown, Zap, Coffee, Brain } from 'lucide-react';
import { Heart, UserCircle } from 'lucide-react';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { div } from 'framer-motion/client';


const MoodFood = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showRecipe, setShowRecipe] = useState(false);

  const emotions = [
    { id: 'happy', icon: <Smile className="w-6 h-6" />, label: 'Happy', color: 'bg-yellow-200 hover:bg-yellow-300' },
    { id: 'sad', icon: <Frown className="w-6 h-6" />, label: 'Sad', color: 'bg-blue-200 hover:bg-blue-300' },
    { id: 'excited', icon: <Zap className="w-6 h-6" />, label: 'Excited', color: 'bg-pink-200 hover:bg-pink-300' },
    { id: 'relaxed', icon: <Coffee className="w-6 h-6" />, label: 'Relaxed', color: 'bg-green-200 hover:bg-green-300' },
    { id: 'stressed', icon: <Brain className="w-6 h-6" />, label: 'Stressed', color: 'bg-purple-200 hover:bg-purple-300' }
  ];

  const handleSubmit = () => {
    if (selectedEmotion) {
      setShowRecipe(true);
    } else {
      alert('Please select how you\'re feeling first!');
    }
  };

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
    
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 p-4 pt-50 md:p-8">
      
      <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur mt-20">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-rose-500 ">
            How are you feeling today?
          </CardTitle>
          
          <div className="mt-6 italic text-2xl text-gray-700 border-l-4 border-rose-500 pl-4 py-2 bg-white">
            "Change your MOOD with simple FOOD"
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <img
              src="https://img1.10bestmedia.com/Images/Photos/384075/GettyImages-1221418765_55_660x440.jpg"
              alt="Decorative food"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {emotions.map((emotion) => (
              <Button
                key={emotion.id}
                onClick={() => setSelectedEmotion(emotion.id)}
                className={`${emotion.color} ${
                  selectedEmotion === emotion.id ? 'ring-4 ring-rose-500' : ''
                } flex flex-col items-center p-10 rounded-2xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                {emotion.icon}
                <span className="mt-2">{emotion.label}</span>
              </Button>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={handleSubmit}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Get Your Recipe!
            </Button>
          </div>

          {showRecipe && (
            <div className="mt-8 space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-800">Comfort Tiramisu Recipe</h2>
              
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <img
                  src="https://media.istockphoto.com/id/1398679790/photo/tiramisu-cake-on-white-ceramic-plate.jpg?s=612x612&w=0&k=20&c=2Xoc4JhqSh05A8bbUE1igFQDC-TF7vwT9_cQZWZyHCc="
                  alt="Tiramisu"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800">Ingredients</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>6 egg yolks</li>
                    <li>1 cup sugar</li>
                    <li>1¼ cup mascarpone cheese</li>
                    <li>1¾ cup heavy whipping cream</li>
                    <li>2 packages ladyfingers</li>
                    <li>1 cup cold espresso</li>
                    <li>½ cup coffee liqueur (optional)</li>
                    <li>Cocoa powder for dusting</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800">Instructions</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Whisk egg yolks and sugar until pale and creamy</li>
                    <li>Add mascarpone cheese and blend until smooth</li>
                    <li>In a separate bowl, whip the cream until stiff peaks form</li>
                    <li>Gently fold whipped cream into mascarpone mixture</li>
                    <li>Combine espresso and coffee liqueur</li>
                    <li>Quickly dip ladyfingers in coffee mixture and layer in dish</li>
                    <li>Spread half the mascarpone mixture over ladyfingers</li>
                    <li>Repeat layers and dust with cocoa powder</li>
                    <li>Refrigerate for at least 4 hours</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default MoodFood;