// "use client";

// import React, { useState } from "react";
// import { Play, ChefHat, UtensilsCrossed, BookOpen, Star, Crown } from 'lucide-react';
// import { Heart, UserCircle } from 'lucide-react';
// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton
// } from '@clerk/nextjs'


// const Page = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [showSecret, setShowSecret] = useState(false);
//   const [ingredients, setIngredients] = useState("");
//   const [utensils, setUtensils] = useState("");

//   const handleGenerateRecipe = () => {
//     setShowPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const toggleSecret = () => {
//     setShowSecret(!showSecret);
//   };

//   const recipeSteps = [
//     "Rinse ¼ cup basmati rice a couple of times in fresh water and then soak in enough water for 15 to 20 minutes.",
//     "While the rice grains are soaking, take 1-litre full-fat milk in a heavy wide pan or saucepan or kadai.",
//     "Keep the pan on low to medium-low heat. Stir at intervals so that the milk does not burn at the bottom of the pan.",
//     "Let the milk come to a boil.",
//     "Take 1 tablespoon milk from the pan in a small bowl. Let the milk become warm. Then, add a few saffron strands to the milk. Keep aside.",
//     "After the milk begins to boil, drain all the water from the rice and add it to the boiling milk.",
//     "Mix very well with a spoon."
//   ];

//   // Check if both ingredients and utensils are filled out to enable the buttons
//   const isFormValid = ingredients.trim() !== "" && utensils.trim() !== "";

//   return (
//     <>
//     <nav className="fixed w-full z-50 ">
//       {/* Blur effect background */}
//       <div className="absolute inset-0 bg-white/70 backdrop-blur-lg border-b border-gray-200" />

//       {/* Navbar content */}
//       <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo as a button */}
//           <button 
//             onClick={() => window.location.href = '/'}
//             className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105"
//           >
//             <Heart className="w-8 h-8 text-rose-500" />
//             <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
//               Aasra
//             </span>
//           </button>

//           {/* Dashboard and Profile */}
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={() => window.location.href = '/dashboard'}
//               className="px-4 py-2 rounded-lg bg-rose-500 text-white font-medium hover:bg-rose-600 transition-all duration-200 hover:scale-105 shadow-sm"
//             >
//               Dashboard
//             </button>
            
//               <SignedIn>
//             <UserButton />
//           </SignedIn>
            
//           </div>
//         </div>
//       </div>
//     </nav>
//     <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
//       {/* Original Content */}
//       <div className="relative h-[300px] mb-8">
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
//           <ChefHat size={60} className="mb-4" />
//           <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
//             Recipe Generator
//           </h1>
//           <p className="text-lg md:text-xl opacity-90">Create delicious recipes instantly</p>
//         </div>
//       </div>

//       {/* Recipe Generator Inputs */}
//       <div className="px-4 py-6">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Ingredients and Utensils</h2>

//         {/* Ingredients Input */}
//         <div className="mb-4">
//           <label htmlFor="ingredients" className="block text-lg text-gray-700 mb-2">Ingredients</label>
//           <textarea
//             id="ingredients"
//             value={ingredients}
//             onChange={(e) => setIngredients(e.target.value)}
//             className="w-full h-24 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter ingredients here..."
//           />
//         </div>

//         {/* Utensils Input */}
//         <div className="mb-6">
//           <label htmlFor="utensils" className="block text-lg text-gray-700 mb-2">Utensils</label>
//           <textarea
//             id="utensils"
//             value={utensils}
//             onChange={(e) => setUtensils(e.target.value)}
//             className="w-full h-24 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter utensils here..."
//           />
//         </div>

//         {/* The "Generate Recipe" Button below the inputs */}
//         {isFormValid && (
//           <button
//             onClick={handleGenerateRecipe}
//             className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full hover:from-blue-500 hover:to-blue-700 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
//           >
//             <Play className="text-white mr-2" size={20} />
//             Generate Recipe
//           </button>
//         )}

//         {/* The Play Button, appears when the form is valid */}
//         {isFormValid && (
//           <button
//             onClick={() => alert("Play something related to the recipe!")} // Customize this
//             className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full hover:from-green-500 hover:to-green-700 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg mt-4"
//           >
//             <Play className="text-white mr-2" size={20} />
//             Play Recipe Video or Music
//           </button>
//         )}
//       </div>

//       {/* Show Recipe Popup after button is clicked */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
//             <div className="p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe Steps</h2>
//               <ul className="space-y-4">
//                 {recipeSteps.map((step, index) => (
//                   <li key={index} className="text-gray-700">{step}</li>
//                 ))}
//               </ul>
//               <button
//                 onClick={handleClosePopup}
//                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 font-semibold transition-all duration-200 mt-4"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mother's Secret Button - Fixed at bottom left */}
//       <div className="fixed bottom-8 left-8 z-40">
//         <button
//           onClick={toggleSecret}
//           className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-6 py-3 rounded-full hover:from-pink-500 hover:to-pink-700 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
//         >
//           <Heart className="text-white" size={20} />
//           Wanna Know Mother's Secret?
//         </button>
//       </div>

//       {/* Mother's Secret Popup */}
//       {showSecret && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
//           <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-pink-800 flex items-center gap-2">
//                   <Crown className="text-pink-600" />
//                   Mother's Special Tips
//                 </h2>
//                 <button
//                   onClick={toggleSecret}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 <div className="bg-white bg-opacity-60 p-4 rounded-xl">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Star className="text-yellow-500" size={20} />
//                     <h3 className="font-semibold text-lg text-pink-700">The Magic Pinch of Kesar</h3>
//                   </div>
//                   <p className="text-gray-700">Always add a pinch of Kesar to every dish. It's not just about the ingredients, it's about the extra mother's touch you put into cooking.</p>
//                 </div>

//                 <div className="bg-white bg-opacity-60 p-4 rounded-xl">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Star className="text-yellow-500" size={20} />
//                     <h3 className="font-semibold text-lg text-pink-700">The Patience Rule</h3>
//                   </div>
//                   <p className="text-gray-700">Never rush the cooking process. Let flavors develop naturally and ingredients blend perfectly.</p>
//                 </div>

//                 <div className="bg-white bg-opacity-60 p-4 rounded-xl">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Star className="text-yellow-500" size={20} />
//                     <h3 className="font-semibold text-lg text-pink-700">The Magic Touch</h3>
//                   </div>
//                   <p className="text-gray-700">Trust your instincts. Sometimes the best recipes come from spontaneous adjustments and creative experiments.</p>
//                 </div>

//                 <button
//                   onClick={toggleSecret}
//                   className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 font-semibold transition-all duration-200 flex items-center justify-center gap-2"
//                 >
//                   <Heart className="text-white" size={20} />
//                   Keep The Secret
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default Page;

"use client";

import React, { useState } from "react";
import { Play, ChefHat, UtensilsCrossed, BookOpen, Star, Crown } from 'lucide-react';
import { Heart, UserCircle } from 'lucide-react';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import axios from 'axios';

const Page = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [utensils, setUtensils] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateRecipe = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/generate-recipe', 
        { ingredients: ingredients },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true  // Change this to true
        }
      );
  
      setGeneratedRecipe(response.data.recipe);
      setShowPopup(true);
    } catch (error) {
      console.error("Error generating recipe:", error.response ? error.response.data : error.message);
      alert("Failed to generate recipe. Please check the console for details.");
    } finally {
      setIsLoading(false);
      console.log(isLoading)
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const toggleSecret = () => {
    setShowSecret(!showSecret);
  };

  // Check if both ingredients and utensils are filled out to enable the buttons
  const isFormValid = ingredients.trim() !== "" && utensils.trim() !== "";

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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      {/* Original Content */}
      <div className="relative h-[300px] mb-8">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
          <ChefHat size={60} className="mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
            Recipe Generator
          </h1>
          <p className="text-lg md:text-xl opacity-90">Create delicious recipes instantly</p>
        </div>
      </div>

      {/* Recipe Generator Inputs */}
      <div className="px-4 py-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Ingredients and Utensils</h2>

        {/* Ingredients Input */}
        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-lg text-gray-700 mb-2">Ingredients</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full h-24 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter ingredients here..."
          />
        </div>

        {/* Utensils Input */}
        <div className="mb-6">
          <label htmlFor="utensils" className="block text-lg text-gray-700 mb-2">Utensils</label>
          <textarea
            id="utensils"
            value={utensils}
            onChange={(e) => setUtensils(e.target.value)}
            className="w-full h-24 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter utensils here..."
          />
        </div>

        {/* The "Generate Recipe" Button below the inputs */}
        {isFormValid && (
          <button
            onClick={handleGenerateRecipe}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full hover:from-blue-500 hover:to-blue-700 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Play className="text-white mr-2" size={20} />
            {isLoading ? 'Generating...' : 'Generate Recipe'}
          </button>
        )}

        {/* The Play Button, appears when the form is valid */}
        {isFormValid && (
          <button
            onClick={() => alert("Play something related to the recipe!")} // Customize this
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full hover:from-green-500 hover:to-green-700 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg mt-4"
          >
            <Play className="text-white mr-2" size={20} />
            Play Recipe Video or Music
          </button>
        )}
      </div>

      {/* Show Recipe Popup after button is clicked */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Generated Recipe</h2>
              <div className="text-gray-700 whitespace-pre-wrap">
                {generatedRecipe}
              </div>
              <button
                onClick={handleClosePopup}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 font-semibold transition-all duration-200 mt-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mother's Secret Button - Fixed at bottom left */}
      <div className="fixed bottom-8 left-8 z-40">
        <button
          onClick={toggleSecret}
          className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-6 py-3 rounded-full hover:from-pink-500 hover:to-pink-700 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
        >
          <Heart className="text-white" size={20} />
          Wanna Know Mother's Secret?
        </button>
      </div>

      {/* Mother's Secret Popup */}
      {showSecret && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-pink-800 flex items-center gap-2">
                  <Crown className="text-pink-600" />
                  Mother's Special Tips
                </h2>
                <button
                  onClick={toggleSecret}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-white bg-opacity-60 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="text-yellow-500" size={20} />
                    <h3 className="font-semibold text-lg text-pink-700">The Magic Pinch of Kesar</h3>
                  </div>
                  <p className="text-gray-700">Always add a pinch of Kesar to every dish. It's not just about the ingredients, it's about the extra mother's touch you put into cooking.</p>
                </div>

                <div className="bg-white bg-opacity-60 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="text-yellow-500" size={20} />
                    <h3 className="font-semibold text-lg text-pink-700">The Patience Rule</h3>
                  </div>
                  <p className="text-gray-700">Never rush the cooking process. Let flavors develop naturally and ingredients blend perfectly.</p>
                </div>

                <div className="bg-white bg-opacity-60 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="text-yellow-500" size={20} />
                    <h3 className="font-semibold text-lg text-pink-700">The Magic Touch</h3>
                  </div>
                  <p className="text-gray-700">Trust your instincts. Sometimes the best recipes come from spontaneous adjustments and creative experiments.</p>
                </div>

                <button
                  onClick={toggleSecret}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Heart className="text-white" size={20} />
                  Keep The Secret
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Page;