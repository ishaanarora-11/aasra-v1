
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
// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";
// import axios from 'axios';
// import { useGrocery } from '../../context/GroceryContext';

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// const Page = () => {

//   const { groceryList } = useGrocery();

//   const [showPopup, setShowPopup] = useState(false);
//   const [showSecret, setShowSecret] = useState(false);
//   const [ingredients, setIngredients] = useState("");
//   const [utensils, setUtensils] = useState("");
//   const [generatedRecipe, setGeneratedRecipe] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const[loadingLightMeal,setLoadingLightMeal] = useState(false);
//   const[loadingLunch,setLoadingLunch] = useState(false);
//   const[loadingDinner,setLoadingDinner] = useState(false);
//   const[aiIngredientsList,setAiIngredientsList] = useState("");

//   const handleGenerateRecipe = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5001/generate-recipe', 
//         { ingredients: ingredients },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true  // Change this to true
//         }
//       );
  
//       setGeneratedRecipe(response.data.recipe);
//       setShowPopup(true);
//     } catch (error) {
//       console.error("Error generating recipe:", error.response ? error.response.data : error.message);
//       alert("Failed to generate recipe. Please check the console for details.");
//     } finally {
//       setIsLoading(false);
//       console.log(isLoading)
//     }
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const toggleSecret = () => {
//     setShowSecret(!showSecret);
//   };

//   const runAiGenerationLightMeal = async () => {
//     if (!apiKey) {
//       console.error("API key is not set");
//       return "";
//     }

//     setLoadingLightMeal(true);
//     try {
//       const chatSession = model.startChat({
//         generationConfig,
//         history: [],
//       });

//       const response = await chatSession.sendMessage(
//         `based on the grocery list ${JSON.stringify(groceryList)},
//         shortlist some fruits and light ingredients that will make a healthy diet,
//         and can result in a simple dish that a PG student can make.
//         Ensure that the output contains only a list of ingredients seperated by a comma and no other text `
//       );

//       setLoadingLightMeal(false);
//       return response.response.text();
//     }catch (error) {
//       console.error("Error generating grocery list:", error);
//       setLoadingLightMeal(false);
//       return "[]"; // Return an empty array if there's an error
//     }
//   };
//   const runAiGenerationLunch = async () => {
//     if (!apiKey) {
//       console.error("API key is not set");
//       return "";
//     }

//     setLoadingLunch(true);
//     try {
//       const chatSession = model.startChat({
//         generationConfig,
//         history: [],
//       });

//       const response = await chatSession.sendMessage(
//         `based on the grocery list ${JSON.stringify(groceryList)},
//         shortlist some ingredients that will make a vegetable rich,
//         and can result in a simple dish that a PG student can make.
//         Ensure that the output contains only a list of ingredients seperated by a comma and no other text `
//       );

//       setLoadingLunch(false);
//       return response.response.text();
//     }catch (error) {
//       console.error("Error generating grocery list:", error);
//       setLoadingLunch(false);
//       return "[]"; // Return an empty array if there's an error
//     }
//   };
//   const runAiGenerationDinner = async () => {
//     if (!apiKey) {
//       console.error("API key is not set");
//       return "";
//     }

//     setLoadingDinner(true);
//     try {
//       const chatSession = model.startChat({
//         generationConfig,
//         history: [],
//       });

//       const response = await chatSession.sendMessage(
//         `based on the grocery list ${JSON.stringify(groceryList)},
//         shortlist some ingredients that will make a protien rich,
//         and can result in a simple dish that a PG student can make.
//         Ensure that the output contains only a list of ingredients seperated by a comma and no other text `
//       );

//       setLoadingDinner(false);
//       return response.response.text();
//     }catch (error) {
//       console.error("Error generating grocery list:", error);
//       setLoadingDinner(false);
//       return "[]"; // Return an empty array if there's an error
//     }
//   };

//   const handleSubmitLightMeal = async (e) => {
//     e.preventDefault();
//     const aiIngredients = await runAiGenerationLightMeal();
//     // const parsedList = typeof aiList === 'string' ? JSON.parse(aiList) : aiList;
//     setAiIngredientsList(aiIngredients);
//     // setShowList(true);
//     console.log(aiIngredients)
//   };
//   const handleSubmitLunch = async (e) => {
//     e.preventDefault();
//     const aiIngredients = await runAiGenerationLunch();
//     // const parsedList = typeof aiList === 'string' ? JSON.parse(aiList) : aiList;
//     setAiIngredientsList(aiIngredients);
//     // setShowList(true);
//     console.log(aiIngredients)
//   };
//   const handleSubmitDinner = async (e) => {
//     e.preventDefault();
//     const aiIngredients = await runAiGenerationDinner();
//     // const parsedList = typeof aiList === 'string' ? JSON.parse(aiList) : aiList;
//     setAiIngredientsList(aiIngredients);
//     // setShowList(true);
//     console.log(aiIngredients)
//   };

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
            
//             <SignedIn>
//               <UserButton />
//             </SignedIn>
//           </div>
//         </div>
//       </div>
//     </nav>
//     <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 p-20">
//       {/* Original Content */}
//       <div className="relative h-[300px] mb-8">
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
//           <ChefHat size={60} className="mb-4" />
//           <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
//             Recipe Generator
//           </h1>
//           <p className="text-lg md:text-xl opacity-90 mb-10">Create delicious recipes instantly</p>
//           <div className="flex gap-10">

//           <button 
//           onClick={handleSubmitLightMeal}
//           disabled={loadingLightMeal}
//           className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 font-semibold transition-all duration-200 flex items-center justify-center gap-2 mb-5">
//           {loadingLightMeal ? "Generating..." : "Generate A Light Meal"}
//           </button>
//           <button 
//           onClick={handleSubmitLunch}
//           disabled={loadingLunch}
//           className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 font-semibold transition-all duration-200 flex items-center justify-center gap-2 mb-5">
//           {loadingLunch ? "Generating..." : "Generate Lunch Recipe"}
//           </button>
//           <button 
//           onClick={handleSubmitDinner}
//           disabled={loadingDinner}
//           className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 font-semibold transition-all duration-200 flex items-center justify-center gap-2 mb-5">
//           {loadingDinner ? "Generating..." : "Generate Dinner Recipe"}
//           </button>
//           </div>
//           <p className=" md:text-sm opacity-90 mb-5">[Generates a healthy recipe based on ingredients bought]</p>

//         </div>
//       </div>

//       {/* Recipe Generator Inputs */}
//       <div className="px-4 py-6">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dont wanna have what is suggested? Enter Ingredients to generate another one!</h2>

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
//             disabled={isLoading}
//             className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full hover:from-blue-500 hover:to-blue-700 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
//           >
//             <Play className="text-white mr-2" size={20} />
//             {isLoading ? 'Generating...' : 'Generate Recipe'}
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
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">Generated Recipe</h2>
//               <div className="text-gray-700 whitespace-pre-wrap">
//                 {generatedRecipe}
//               </div>
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
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import axios from 'axios';
import { useGrocery } from '../../context/GroceryContext';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const Page = () => {

  const { groceryList } = useGrocery();

  const [showPopup, setShowPopup] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [utensils, setUtensils] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [LoadingSecret, setLoadingSecret] = useState(false);
  const [loadingLightMeal, setLoadingLightMeal] = useState(false);
  const [loadingLunch, setLoadingLunch] = useState(false);
  const [loadingDinner, setLoadingDinner] = useState(false);
  const [secret, setSecret] = useState("");

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


  const generateSecret = async (recipe) => {
    if (!apiKey) {
      console.error("API key is not set");
      return "";
    }
  
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
  
      const response = await chatSession.sendMessage(
        `Based on the following recipe: ${recipe},
        generate three unique cooking tips from a "Mother's perspective" for her son or daughter. for example:"Beta, eat this with some aachaar, it will taste just like home" 
        The tips should be formatted as:
        1. Title (short, catchy, and unique)
        2. Description (1-2 sentences explaining the tip).
  
        Each tip should be concise, focused, and follow this format:
  
        Tip 1: Title
        Description.
  
        Tip 2: Title
        Description.
  
        Tip 3: Title
        Description.
        `
      );
  
      const tips = response.response.text();
      console.log("Generated Tips: ", tips); // Log to see what the response looks like
      return tips;
    } catch (error) {
      console.error("Error generating tips:", error);
      setLoadingSecret(false);
      return ""; // Return an empty string if there's an error
    }
  };

  const toggleSecret = async () => {
    setLoadingSecret(true);
    try {
      const recipe = generatedRecipe;
  
      // Check if recipe exists before making the call
      if (!recipe) {
        console.error("Recipe is not available yet.");
        alert("Recipe is missing, please generate one first.");
        setLoadingSecret(false);
        return;
      }
  
      // Generate tips using AI
      const secretTips = await generateSecret(recipe);
  
      // Process the AI response (if needed) to structure tips
      const formattedTips = secretTips.split("\n\n").map((tip) => {
        const [title, description] = tip.split("\n").map((line) => line.trim());
        return { title, description };
      });
  
      setSecret(formattedTips); // Save formatted tips in state
    } catch (error) {
      console.error("Error generating Mother's tips:", error.message);
      alert("Failed to generate Mother's tips. Check the console for details.");
    } finally {
      setLoadingSecret(false);
      setShowSecret(!showSecret); // Toggle popup
    }
  };
  


  const runAiGenerationLightMeal = async () => {
    if (!apiKey) {
      console.error("API key is not set");
      return "";
    }

    setLoadingLightMeal(true);
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const response = await chatSession.sendMessage(
        `based on the grocery list ${JSON.stringify(groceryList)},
        shortlist some fruits and light ingredients that will make a healthy diet,
        and can result in a simple dish that a PG student can make.
        Ensure that the output contains only a list of ingredients seperated by a comma and no other text `
      );


      return response.response.text();
    } catch (error) {
      console.error("Error generating grocery list:", error);
      setLoadingLightMeal(false);
      return "[]"; // Return an empty array if there's an error
    }
  };

  const runAiGenerationLunch = async () => {
    if (!apiKey) {
      console.error("API key is not set");
      return "";
    }

    setLoadingLunch(true);
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const response = await chatSession.sendMessage(
        `based on the grocery list ${JSON.stringify(groceryList)},
        shortlist some ingredients that will make a protien rich,
        and can result in a simple dish that a PG student can make.
        Ensure that the output contains only a list of ingredients seperated by a comma and no other text `
      );


      return response.response.text();
    } catch (error) {
      console.error("Error generating grocery list:", error);
      setLoadingLunch(false);
      return "[]"; // Return an empty array if there's an error
    }
  };

  const runAiGenerationDinner = async () => {
    if (!apiKey) {
      console.error("API key is not set");
      return "";
    }

    setLoadingDinner(true);
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const response = await chatSession.sendMessage(
        `based on the grocery list ${JSON.stringify(groceryList)},
        shortlist some ingredients that will make a vegetable rich,
        and can result in a simple dish that a PG student can make.
        Ensure that the output contains only a list of ingredients seperated by a comma and no other text `
      );


      return response.response.text();
    } catch (error) {
      console.error("Error generating grocery list:", error);
      setLoadingDinner(false);
      return "[]"; // Return an empty array if there's an error
    }
  };

  const handleSubmitLightMeal = async (e) => {
    setLoadingLightMeal(true);
    try {
      const aiIngredients = await runAiGenerationLightMeal();

      const response = await axios.post('http://localhost:5001/generate-recipe',
        { ingredients: aiIngredients },
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
      setLoadingLightMeal(false);
      console.log("done generating light meal")
    }
    // e.preventDefault();

    // const parsedList = typeof aiList === 'string' ? JSON.parse(aiList) : aiList;


    // setShowList(true);
  };
  const handleSubmitLunch = async (e) => {
    setLoadingLunch(true);
    try {
      const aiIngredients = await runAiGenerationLunch();

      const response = await axios.post('http://localhost:5001/generate-recipe',
        { ingredients: aiIngredients },
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
      setLoadingLunch(false);
      console.log("done generating lunch")
    }
  };
  const handleSubmitDinner = async (e) => {
    setLoadingDinner(true);
    try {
      const aiIngredients = await runAiGenerationDinner();

      const response = await axios.post('http://localhost:5001/generate-recipe',
        { ingredients: aiIngredients },
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
      setLoadingDinner(false);
      console.log("done generating dinner")
    }
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
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 p-20">
        {/* Original Content */}
        <div className="relative h-[300px] mb-8">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
            <ChefHat size={60} className="mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
              Recipe Generator
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-10">Create delicious recipes instantly</p>
            <div className="flex gap-10">

              <button
                onClick={handleSubmitLightMeal}
                disabled={loadingLightMeal}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 font-semibold transition-all duration-200 flex items-center justify-center gap-2 mb-5">
                {loadingLightMeal ? "Generating..." : "Generate A Light Meal"}
              </button>
              <button
                onClick={handleSubmitLunch}
                disabled={loadingLunch}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 font-semibold transition-all duration-200 flex items-center justify-center gap-2 mb-5">
                {loadingLunch ? "Generating..." : "Generate Lunch Recipe"}
              </button>
              <button
                onClick={handleSubmitDinner}
                disabled={loadingDinner}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 font-semibold transition-all duration-200 flex items-center justify-center gap-2 mb-5">
                {loadingDinner ? "Generating..." : "Generate Dinner Recipe"}
              </button>
            </div>
            <p className=" md:text-sm opacity-90 mb-5">[Generates a healthy recipe based on ingredients bought]</p>

          </div>
        </div>

        {/* Recipe Generator Inputs */}
        <div className="px-4 py-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dont wanna have what is suggested? Enter Ingredients to generate another one!</h2>

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
            disabled={LoadingSecret}
            onClick={toggleSecret}
            className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-6 py-3 rounded-full hover:from-pink-500 hover:to-pink-700 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <Heart className="text-white" size={20} />
            {LoadingSecret ? "Generating Mother's Secret..." : "Wanna Know Mother's Secret?"}
          </button>
        </div>

        {/* Mother's Secret Popup */}
        

        {showSecret && secret && (
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
                  {secret.map((tip, index) => (
                    <div key={index} className="bg-white bg-opacity-60 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="text-yellow-500" size={20} />
                        <h3 className="font-semibold text-lg text-pink-700">
                          {tip.title}
                        </h3>
                      </div>
                      <p className="text-gray-700">{tip.description}</p>
                    </div>
                  ))}
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