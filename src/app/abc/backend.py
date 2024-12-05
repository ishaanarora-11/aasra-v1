from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import google.generativeai as genai
import json

app = Flask(__name__)
# Enable CORS for all routes with more comprehensive options
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],  # Use * during development
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Handling OPTIONS preflight request
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')  # Use * during development
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

API_KEY = "AIzaSyBWt67JBAUkITIUHHGh0i9nNyMs8SqMZoM"  # Replace with your actual API key
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

def generate_recipe(ingredients):
    try:
        # Ensure ingredients is a list
        if isinstance(ingredients, str):
            ingredients = [ingredient.strip() for ingredient in ingredients.split(',')]
            print(ingredients)
        
        # Use the first ingredient for initial recipe search
        ing = ingredients[0]
        url = f"https://cosylab.iiitd.edu.in/recipe-search/ingredients?searchText={ing}&pageSize=1"

        print(url)
        payload = {}
        headers = {}
        
        response = requests.request("GET", url, headers=headers, data=payload)
        #there is an error in the above line or the iiitd cosylab server is down
        print(response)
        dataset = json.loads(response.text)["payload"]["data"][1:]
        print(dataset)
        
        recipe_nos = []
        for item in dataset:
            recipe_nos.append(item['recipe_no'])
        
        recipe_accuracy = []
        for i in range(len(recipe_nos)):
            id = recipe_nos[i]
            current_ingredients = ingredients.copy()
            
            url = f"https://cosylab.iiitd.edu.in/recipe/{id}"
            response = requests.request("GET", url, headers=headers, data=payload)
            
            ingred = json.loads(response.text)["payload"]["ingredients"]
            ingred_list = [item['ingredient'] for item in ingred]
            
            # Remove matched ingredients
            for item in ingredients:
                if item in ingred_list:
                    current_ingredients.remove(item)
            
            recipe_accuracy.append(len(current_ingredients))
        
        # Find the recipe with minimum unmatched ingredients
        index = recipe_accuracy.index(min(recipe_accuracy))
        id_final = recipe_nos[index]
        
        url = f"https://cosylab.iiitd.edu.in/recipe/{id_final}"
        response = requests.request("GET", url, headers=headers, data=payload)
        
        dish = json.loads(response.text)["payload"]["Recipe_title"]
        
        # Generate recipe using Gemini
        response = model.generate_content(f"Give me a simple recipe for {dish} including the ingredients {' '.join(ingredients)}")
        
        return response.text
    
    except Exception as e:
        return f"Error generating recipe: {str(e)}"

@app.route('/generate-recipe', methods=['POST', 'OPTIONS'])
def recipe_generation_endpoint():
    # Handle preflight request
    if request.method == 'OPTIONS':
        return jsonify({"status": "OK"})
    
    # Handle POST request
    data = request.json
    ingredients = data.get('ingredients', '')
    
    recipe = generate_recipe(ingredients)
    
    return jsonify({
        'recipe': recipe
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)