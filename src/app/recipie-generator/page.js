// import axios from "axios";
// "use client";
//       {/* Popup div */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-80">
//             <h2 className="text-2xl font-semibold mb-4">Generated Recipe</h2>
//             <p className="text-gray-700">
//               <strong>Ingredients:</strong> {ingredients || "None provided"}
//             </p>
//             <p className="text-gray-700">
//               <strong>Utensils:</strong> {utensils || "None provided"}
//             </p>
//             <button
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//               onClick={handleClosePopup}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
// //     </div>
// //   );
// // };

// // export default Page;

// "use client";

// import React, { useState } from "react";
// import { Play, ChefHat, UtensilsCrossed, BookOpen } from 'lucide-react';

// const Page = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [ingredients, setIngredients] = useState("");
//   const [utensils, setUtensils] = useState("");

//   const handleGenerateRecipe = () => {
//     setShowPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
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

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
//       {/* Hero Section */}
//       <div className="relative h-[300px] mb-8">
//         <img 
//           src="/api/placeholder/1200/300" 
//           alt="Cooking background" 
//           className="w-full h-full object-cover brightness-50"
//         />
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
//           <ChefHat size={60} className="mb-4" />
//           <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
//             Recipe Generator
//           </h1>
//           <p className="text-lg md:text-xl opacity-90">Create delicious recipes instantly</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           {/* Input Section */}
//           <div className="space-y-6">
//             <div className="relative">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Ingredients
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   className="w-full p-4 border border-gray-200 rounded-xl pl-12 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
//                   placeholder="Enter ingredients (comma separated)"
//                   value={ingredients}
//                   onChange={(e) => setIngredients(e.target.value)}
//                 />
//                 <ChefHat className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//               </div>
//             </div>

//             <div className="relative">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Utensils
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   className="w-full p-4 border border-gray-200 rounded-xl pl-12 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
//                   placeholder="Enter utensils (comma separated)"
//                   value={utensils}
//                   onChange={(e) => setUtensils(e.target.value)}
//                 />
//                 <UtensilsCrossed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//               </div>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4 mt-8">
//             <button
//               className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 text-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
//               onClick={handleGenerateRecipe}
//             >
//               <BookOpen size={20} />
//               Generate Recipe
//             </button>
//             <button
//               className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-purple-700 text-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
//             >
//               <Play size={20} />
//               Play
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Recipe Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
//             <div className="relative h-[200px] rounded-t-2xl overflow-hidden">
//               <img 
//                 src="/api/placeholder/800/200" 
//                 alt="Recipe header" 
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
//               <h2 className="absolute bottom-4 left-6 text-3xl font-bold text-white">
//                 Saffron Rice Pudding
//               </h2>
//             </div>

//             <div className="p-6">
//               <div className="grid md:grid-cols-2 gap-4 mb-6">
//                 <div className="bg-orange-50 p-4 rounded-xl">
//                   <h3 className="font-semibold text-lg mb-2 text-orange-800 flex items-center gap-2">
//                     <ChefHat size={20} />
//                     Ingredients
//                   </h3>
//                   <p className="text-gray-700">
//                     {ingredients ? ingredients.split(',').map(item => item.trim()).join(', ') : "No ingredients provided"}
//                   </p>
//                 </div>

//                 <div className="bg-purple-50 p-4 rounded-xl">
//                   <h3 className="font-semibold text-lg mb-2 text-purple-800 flex items-center gap-2">
//                     <UtensilsCrossed size={20} />
//                     Utensils
//                   </h3>
//                   <p className="text-gray-700">
//                     {utensils ? utensils.split(',').map(item => item.trim()).join(', ') : "No utensils provided"}
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-gray-50 p-6 rounded-xl">
//                 <h3 className="font-semibold text-xl mb-4 text-gray-800">
//                   Instructions
//                 </h3>
//                 <ol className="space-y-4">
//                   {recipeSteps.map((step, index) => (
//                     <li key={index} className="flex gap-4 text-gray-700">
//                       <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
//                         {index + 1}
//                       </span>
//                       <span className="mt-1">{step}</span>
//                     </li>
//                   ))}
//                 </ol>
//               </div>

//               <button
//                 className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-xl hover:from-red-600 hover:to-red-700 font-semibold transition-all duration-200 mt-6 flex items-center justify-center gap-2"
//                 onClick={handleClosePopup}
//               >
//                 Close Recipe
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;

"use client";

import React, { useState } from "react";
import axios from "axios";
import { Play, ChefHat, UtensilsCrossed, BookOpen } from 'lucide-react';

const Page = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [utensils, setUtensils] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState({
    dishName: "",
    ingredients: [],
    instructions: []
  });

  const handleGenerateRecipe = async () => {
    try {
      // Assuming your Flask backend is running on localhost:5000
      const response = await axios.post('http://localhost:5000/generate-recipe', {
        ingredients: ingredients.split(',').map(ing => ing.trim())
      });

      // Assuming the response contains dish name, ingredients, and instructions
      setGeneratedRecipe({
        dishName: response.data.dish || "Generated Recipe",
        ingredients: response.data.ingredients || [],
        instructions: response.data.instructions || []
      });

      setShowPopup(true);
    } catch (error) {
      console.error("Error generating recipe:", error);
      alert("Failed to generate recipe. Please try again.");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      {/* Hero Section (unchanged) */}
      <div className="relative h-[300px] mb-8">
        <img 
          src="/api/placeholder/1200/300" 
          alt="Cooking background" 
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <ChefHat size={60} className="mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
            Recipe Generator
          </h1>
          <p className="text-lg md:text-xl opacity-90">Create delicious recipes instantly</p>
        </div>
      </div>

      {/* Main Content (unchanged) */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Input Section (unchanged) */}
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Ingredients
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-4 border border-gray-200 rounded-xl pl-12 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  placeholder="Enter ingredients (comma separated)"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
                <ChefHat className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Utensils
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-4 border border-gray-200 rounded-xl pl-12 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  placeholder="Enter utensils (comma separated)"
                  value={utensils}
                  onChange={(e) => setUtensils(e.target.value)}
                />
                <UtensilsCrossed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 text-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
              onClick={handleGenerateRecipe}
            >
              <BookOpen size={20} />
              Generate Recipe
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-purple-700 text-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Play size={20} />
              Play
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="relative h-[200px] rounded-t-2xl overflow-hidden">
              <img 
                src="/api/placeholder/800/200" 
                alt="Recipe header" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
              <h2 className="absolute bottom-4 left-6 text-3xl font-bold text-white">
                {generatedRecipe.dishName}
              </h2>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-orange-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-lg mb-2 text-orange-800 flex items-center gap-2">
                    <ChefHat size={20} />
                    Ingredients
                  </h3>
                  <p className="text-gray-700">
                    {generatedRecipe.ingredients.length > 0 
                      ? generatedRecipe.ingredients.join(', ') 
                      : "No ingredients found"}
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-lg mb-2 text-purple-800 flex items-center gap-2">
                    <UtensilsCrossed size={20} />
                    Utensils
                  </h3>
                  <p className="text-gray-700">
                    {utensils ? utensils.split(',').map(item => item.trim()).join(', ') : "No utensils provided"}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-xl mb-4 text-gray-800">
                  Instructions
                </h3>
                <ol className="space-y-4">
                  {generatedRecipe.instructions.length > 0 ? (
                    generatedRecipe.instructions.map((step, index) => (
                      <li key={index} className="flex gap-4 text-gray-700">
                        <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <span className="mt-1">{step}</span>
                      </li>
                    ))
                  ) : (
                    <p>No instructions available</p>
                  )}
                </ol>
              </div>

              <button
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-xl hover:from-red-600 hover:to-red-700 font-semibold transition-all duration-200 mt-6 flex items-center justify-center gap-2"
                onClick={handleClosePopup}
              >
                Close Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;