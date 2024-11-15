"use client";  // Add this line to enable client-side features

import React, { useState } from "react";

const Page = () => {
  const [ingredients, setIngredients] = useState("");
  const [utensils, setUtensils] = useState("");
  const [recipe, setRecipe] = useState("");

  const handleGenerateRecipe = () => {
    const newRecipe = `Here's a delicious recipe using your ingredients and utensils:\n\n${ingredients} + ${utensils}`;
    setRecipe(newRecipe);
  };

  return (
    <div className = "bg-white">
    <div className="container mx-auto px-4 py-8 bg-green-50">
      <h1 className="text-3xl text-green-700 font-bold mb-8 text-center">Student's Recipe Generator</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-yellow-50/70 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Available Ingredients</h2>
          <textarea
            className="w-full p-3 border border-green-200 rounded-lg mb-4 bg-white/80"
            rows="4"
            placeholder="Enter your ingredients (one per line)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
        </div>

        <div className="bg-yellow-50/70 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Available Utensils</h2>
          <textarea
            className="w-full p-3 border border-green-200 rounded-lg mb-4 bg-white/80"
            rows="4"
            placeholder="Enter your utensils (one per line)"
            value={utensils}
            onChange={(e) => setUtensils(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="text-center mb-8">
        <button
          className="bg-green-400 text-white px-8 py-3 rounded-lg hover:bg-green-500 text-lg font-semibold transition-colors"
          onClick={handleGenerateRecipe}
        >
          Generate Recipe
        </button>
      </div>

      <div className="bg-yellow-50/70 rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-green-600">Generated Recipe</h2>
          <button className="flex items-center bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors">
            <span className="mr-2">🔊</span>
            Listen in Mom's Voice
          </button>
        </div>
        <div className="bg-white/80 rounded-lg p-4">
          <p className="text-gray-700">{recipe || "Your recipe will appear here..."}</p>
        </div>
      </div>

      {/* Mom's Corner */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="group relative">
          <button 
            className="w-16 h-16 rounded-full bg-green-400 text-white shadow-lg hover:bg-green-500 transition-all duration-300 flex items-center justify-center"
            onClick={() => document.getElementById('momsTips').classList.toggle('scale-0')}
          >
            <span className="text-2xl">👩‍👦</span>
          </button>

          <div 
            id="momsTips"
            className="absolute bottom-20 left-0 w-72 bg-yellow-50/95 rounded-lg shadow-xl p-4 border-2 border-green-200 transform scale-0 transition-transform duration-300 origin-bottom-left"
          >
            <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center">
              <span className="mr-2">💝</span>
              Mom's Corner
            </h3>
            <div className="bg-white/80 rounded p-3">
              <p className="text-gray-700 text-sm italic mb-3">
                "Beta, remember to add a pinch of love to everything you cook! Here are some tips..."
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-green-500 mr-2">🌿</span>
                  <p>Always taste while cooking</p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-green-500 mr-2">🌿</span>
                  <p>Keep your cooking space clean</p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-green-500 mr-2">🌿</span>
                  <p>Don't forget to garnish your dish</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Page;
