// import fs from 'fs/promises';
// import path from 'path';

// // POST Method to save ingredients and generate recipe
// export async function POST(req) {
//   try {
//     const { ingredients, utensils } = await req.json();

//     // Path to the recipie-generator folder for storing ingredients.txt and recipe.txt
//     const folderPath = path.join(process.cwd(), 'src/app/recipie-generator');
    
//     // Save the ingredients to a file
//     await fs.writeFile(path.join(folderPath, 'ingredients.txt'), ingredients);
    
//     // Generate a recipe
//     const recipeContent = `Your Recipe:\nIngredients:\n${ingredients}\n\nUtensils:\n${utensils}`;
//     await fs.writeFile(path.join(folderPath, 'recipe.txt'), recipeContent);

//     return new Response(JSON.stringify({ recipe: recipeContent }), { status: 200 });
//   } catch (error) {
//     console.error("Error generating recipe:", error);
//     return new Response("Error generating recipe", { status: 500 });
//   }
// }

// // DELETE Method to remove the ingredients and recipe files
// export async function DELETE() {
//   try {
//     const folderPath = path.join(process.cwd(), 'src/app/recipie-generator');

//     // Remove the ingredients and recipe files
//     await fs.rm(path.join(folderPath, 'ingredients.txt'), { force: true });
//     await fs.rm(path.join(folderPath, 'recipe.txt'), { force: true });

//     return new Response("Files deleted successfully", { status: 200 });
//   } catch (error) {
//     console.error("Error deleting files:", error);
//     return new Response("Error deleting files", { status: 500 });
//   }
// }


// In your API route file (e.g., pages/api/recipie-generator.js)

// import fs from 'fs/promises';
// import path from 'path';

// export async function handler(req, res) {
//   const folderPath = path.join(process.cwd(), 'src/app/recipie-generator');

//   if (req.method === 'POST') {
//     try {
//       const { ingredients, utensils } = req.body;
//       await fs.writeFile(path.join(folderPath, 'ingredients.txt'), ingredients);
//       const recipeContent = `Your Recipe:\nIngredients:\n${ingredients}\n\nUtensils:\n${utensils}`;
//       await fs.writeFile(path.join(folderPath, 'recipe.txt'), recipeContent);
//       return res.status(200).json({ recipe: recipeContent });
//     } catch (error) {
//       console.error("Error generating recipe:", error);
//       return res.status(500).json({ error: "Error generating recipe" });
//     }
//   }

//   if (req.method === 'DELETE') {
//     try {
//       await fs.rm(path.join(folderPath, 'ingredients.txt'), { force: true });
//       await fs.rm(path.join(folderPath, 'recipe.txt'), { force: true });
//       return res.status(200).send("Files deleted successfully");
//     } catch (error) {
//       console.error("Error deleting files:", error);
//       return res.status(500).json({ error: "Error deleting files" });
//     }
//   }

//   // If the method is neither POST nor DELETE
//   return res.status(405).json({ error: 'Method Not Allowed' });
// }

