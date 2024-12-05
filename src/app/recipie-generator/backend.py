# import requests
# import google.generativeai as genai
# from flask import Flask, request, jsonify
# from gtts import gTTS
# # from playsound import playsound
# app = Flask(__name__)
# API_KEY = "AIzaSyBWt67JBAUkITIUHHGh0i9nNyMs8SqMZoM"
# genai.configure(api_key=API_KEY)
# model = genai.GenerativeModel("gemini-1.5-flash")

# with open("temp-ingredients.txt", "r") as f:
#     content = f.read()

# ingredients = content.split(",")

# def generate_recipe(ingredients):

#     ing = ingredients[0]
#     url = f"https://cosylab.iiitd.edu.in/recipe-search/ingredients?searchText={ing}&pageSize=1"

#     payload={}
#     headers = {}

#     response = requests.request("GET", url, headers=headers, data=payload)

#     dataset = eval(response.text)["payload"]["data"][1:]
#     recipe_nos = []
#     for item in dataset:
#         recipe_nos.append(item['recipe_no'])
  
#     recipe_accuracy = []

#     for i in range(len(recipe_nos)):
#         id = recipe_nos[i]
#         ingredients = ingredients.copy()
#         url = f"https://cosylab.iiitd.edu.in/recipe/{id}"

#         payload={}
#         headers = {}

#         response = requests.request("GET", url, headers=headers, data=payload)

#         ingred= eval(response.text)["payload"]["ingredients"]
#         ingred_list = []
#         for item in ingred:
#             ingred_list.append(item['ingredient'])
#             for item in ingredients:
#                 if item in ingred_list:
#                     ingredients.remove(item)
#         recipe_accuracy.append(len(ingredients))

#     index = recipe_accuracy.index(min(recipe_accuracy))
#     id_final = recipe_nos[index]

#     url = f"https://cosylab.iiitd.edu.in/recipe/{id_final}"

#     payload={}
#     headers = {}

#     ingredients = ingredients
#     response = requests.request("GET", url, headers=headers, data=payload)
#     dish = eval(response.text)["payload"]["Recipe_title"]
#     dish = "kheer"
#     response = model.generate_content(f"Give me a simple recipe for {dish} including the ingredients {' '.join(ingredients)}")
#     recipe = response

#     return recipe


# with open("recipe.txt", "r") as f:
#     content = f.read()

# speech = gTTS(content)
# speech.save('recipe.mp3')


import requests
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS  # Comprehensive CORS handling
import ast
import os

app = Flask(__name__)

# Configure CORS with more explicit settings
CORS(app, resources={
    r"/generate-recipe": {
        "origins": [
            "http://localhost:3000",  # React default port
            "http://127.0.0.1:3000",
            "http://localhost:3001",  # Alternative port
            "http://127.0.0.1:3001"
        ],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Ensure OPTIONS method is handled
@app.route('/generate-recipe', methods=['OPTIONS'])
def handle_options():
    response = jsonify()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    return response

API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")  # Use environment variable
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

def generate_recipe(ingredients):
    try:
        # Similar implementation to previous version
        ing = ingredients[0]
        url = f"https://cosylab.iiitd.edu.in/recipe-search/ingredients?searchText={ing}&pageSize=1"
        
        payload = {}
        headers = {}
        
        response = requests.request("GET", url, headers=headers, data=payload)
        
        # Safely evaluate the response
        dataset = ast.literal_eval(response.text)["payload"]["data"][1:]
        
        recipe_nos = []
        for item in dataset:
            recipe_nos.append(item['recipe_no'])
        
        recipe_accuracy = []
        for i in range(len(recipe_nos)):
            id = recipe_nos[i]
            remaining_ingredients = ingredients.copy()
            
            url = f"https://cosylab.iiitd.edu.in/recipe/{id}"
            response = requests.request("GET", url, headers=headers, data=payload)
            
            ingred = ast.literal_eval(response.text)["payload"]["ingredients"]
            ingred_list = [item['ingredient'] for item in ingred]
            
            # Remove matched ingredients
            for item in ingredients:
                if item in ingred_list:
                    remaining_ingredients.remove(item)
            
            recipe_accuracy.append(len(remaining_ingredients))
        
        # Find the recipe with the least unmatched ingredients
        index = recipe_accuracy.index(min(recipe_accuracy))
        id_final = recipe_nos[index]
        
        # Get final recipe details
        url = f"https://cosylab.iiitd.edu.in/recipe/{id_final}"
        response = requests.request("GET", url, headers=headers, data=payload)
        
        dish = ast.literal_eval(response.text)["payload"]["Recipe_title"]
        
        # Use Gemini to generate recipe instructions
        prompt = f"Give me a simple recipe for {dish} including the ingredients {' '.join(ingredients)}. Provide the response as a JSON with keys 'ingredients' and 'instructions'."
        
        response = model.generate_content(prompt)
        
        # Parse the response 
        try:
            recipe_details = ast.literal_eval(response.text)
        except:
            recipe_details = {
                "ingredients": ingredients,
                "instructions": ["Could not parse detailed recipe instructions."]
            }
        
        return {
            "dish": dish,
            "ingredients": recipe_details.get('ingredients', ingredients),
            "instructions": recipe_details.get('instructions', [])
        }
    
    except Exception as e:
        print(f"Error generating recipe: {e}")
        return {
            "dish": "Error",
            "ingredients": ingredients,
            "instructions": ["Could not generate recipe. Please try again."]
        }

@app.route('/generate-recipe', methods=['POST'])
def recipe_generation_endpoint():
    # Add CORS headers manually
    response = jsonify({})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')

    data = request.json
    ingredients = data.get('ingredients', [])
    
    if not ingredients:
        return jsonify({
            "error": "No ingredients provided"
        }), 400
    
    recipe = generate_recipe(ingredients)
    return jsonify(recipe)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)