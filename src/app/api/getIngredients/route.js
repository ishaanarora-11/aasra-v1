// src/app/api/getIngredients/route.js

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const emotion = searchParams.get("emotion");
  
    // Emotion to flavor profile mapping (adjust accordingly)
    const emotionMap = {
      happy: { category: "Fruits", flavorProfile: "Sweet" },
      sad: { category: "Chocolate", flavorProfile: "Bitter" },
      angry: { category: "Spices", flavorProfile: "Spicy" },
      disgusted: { category: "Fermented", flavorProfile: "Sour" },
      calm: { category: "Herbs", flavorProfile: "Earthy" },
    };
  
    const { category, flavorProfile } = emotionMap[emotion] || {};
  
    if (!category || !flavorProfile) {
      return new Response(JSON.stringify({ error: "Invalid emotion selected." }), {
        status: 400,
      });
    }
  
    try {
      // Replace with the actual FlavorDB 2 API URL
      const baseUrl = "https://flavordb2.com/api/v1/query";
      const response = await fetch(`${baseUrl}?category=${category}&flavor_profile=${flavorProfile}`);
      const data = await response.json();
  
      // Assuming the response contains ingredients or items related to the query
      const ingredients = data.ingredients.map((item) => item.name); // Adjust field name if needed
  
      return new Response(JSON.stringify({ ingredients }), {
        status: 200,
      });
    } catch (error) {
      console.error("Error fetching data from FlavorDB 2:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch ingredients." }), {
        status: 500,
      });
    }
  }
  