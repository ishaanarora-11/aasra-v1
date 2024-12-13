"use client"
import axios from "axios";
import React, { use, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Frown, Zap, Coffee, Brain } from 'lucide-react';
import { Heart, UserCircle } from 'lucide-react';
import { useGrocery } from '../../context/GroceryContext';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { div } from 'framer-motion/client';


const MoodFood = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showRecipe, setShowRecipe] = useState(false);
  const [ishaan,ishaanchanger] = useState("");
  const [emo,setemo] = useState("")
  const { groceryList } = useGrocery();
  const [loggedData, setLoggedData] = useState([]);

  async function generateIshaan(){
    const ish = await axios({
      url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCJf9a0AQ8v7TBrYpGjXBJEJauBMZO3ga4",
      method:"post",
      data:{"contents":[{"parts":[{"text":ishaan}]}]}
    })
    console.log(ish['data']['candidates'][0]['content']['parts'][0]['text'])
    console.log(groceryList)
  }
  async function genrecipe(e){
    const res = await axios({
      url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCJf9a0AQ8v7TBrYpGjXBJEJauBMZO3ga4",
      method:"post",
      data:{"contents":[{"parts":[{"text":`This is a list of specific emotions mapped to specific ingredients:

Happy: Category: Fruits  
Flavor Profile: Sweet  
Example Foods: Mango, Strawberry, Apple, Banana, Pineapple, Pear, Orange, Peach, Blueberry, Watermelon.

These fruits are typically associated with sweet, fresh flavors, promoting happiness due to their pleasant and refreshing tastes. 

Use this list to think about a food item and its recipe, like a fruit salad or a mocha. Generate a recipe based on the emotional category of ${emo}, considering the grocery list ${JSON.stringify(groceryList)}.

Be confident in the way you present the recipe, and encourage the user on how different ingredients will help them.

Please format the recipe with clear line breaks and avoid using Markdown or special characters like **bold**, and make sure the instructions are less than 1000 characters, rest you choice. Thank you!`}]}]}
    })
    console.log(res['data']['candidates'][0]['content']['parts'][0]['text'])
    setLoggedData((prevData) => [...prevData, res['data']['candidates'][0]['content']['parts'][0]['text']]);
    setShowRecipe(true);
  }
  const formatRecipeText = (text) => {
    // Split the text by new lines and map each one into a <p> tag
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="mb-4">{line}</p>;
    });
  };


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
                onClick={() => {setSelectedEmotion(emotion.id); setemo(emotion.id);genrecipe}}
                className={`${emotion.color} ${
                  selectedEmotion === emotion.id ? 'ring-4 ring-rose-500' : ''
                } flex flex-col items-center p-10 rounded-2xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                {emotion.icon}
                <span className="mt-2">{emotion.label}</span>
              </Button>
            ))}
          </div>
          <div className="max-w-md mx-auto p-4">
          <div className="relative">
          <div className="text-gray-500 text-sm text-center mb-4">or</div>
          <div className="relative">
            <textarea  value = {emo} onChange={(e)=>{
          setemo(e.target.value)
        }}
              className="w-full p-3 border-2 border-gray-300 rounded-lg 
                        transition-all duration-300 ease-in-out 
                        focus:outline-none focus:border-blue-500 
                        hover:border-blue-300 
                        resize-y min-h-[120px] pr-10"
              placeholder="tell us how you feel"
            />
            <button onClick={genrecipe}
              className="absolute bottom-5 right-3 bg-green-500 text-white 
                        py-2 px-4 rounded-full 
                        hover:bg-green-600 transition-colors duration-300 
                        text-sm"
            >
              Get Your Recipe
            </button>
          </div>
        </div>
    </div>

          {/* <div className="text-center">
            <Button
              onClick={handleSubmit}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Get Your Recipe!
            </Button>
          </div> */}

          {showRecipe && loggedData.length > 0 && (
            <div className="mt-8 space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-800">Your Personalised Recipe</h2>

              <div className="w-4/5 mx-auto">
                <div className="space-y-4">
                  {loggedData.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                    >
                      {formatRecipeText(item)} {/* Render the formatted recipe */}
                    </div>
                  ))}
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