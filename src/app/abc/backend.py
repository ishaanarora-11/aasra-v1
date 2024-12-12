# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import requests
# import google.generativeai as genai
# import json

# app = Flask(__name__)
# # Enable CORS for all routes with more comprehensive options
# CORS(app, resources={
#     r"/*": {
#         "origins": ["http://localhost:3000"],  # Use * during development
#         "methods": ["GET", "POST", "OPTIONS"],
#         "allow_headers": ["Content-Type", "Authorization"],
#         "supports_credentials": True
#     }
# })

# # Handling OPTIONS preflight request
# @app.after_request
# def after_request(response):
#     response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')  # Use * during development
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#     response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#     response.headers.add('Access-Control-Allow-Credentials', 'true')
#     return response

# API_KEY = "AIzaSyD4j4LlRV6z0aayEbHXZuqN_uDaOHwIuq8"  # Replace with your actual API key
# genai.configure(api_key=API_KEY)
# model = genai.GenerativeModel("gemini-1.5-flash")

# def generate_recipe(ingredients):
#     try:
#         # Ensure ingredients is a list
#         if isinstance(ingredients, str):
#             ingredients = [ingredient.strip() for ingredient in ingredients.split(',')]
#             print(ingredients)
        
#         # Use the first ingredient for initial recipe search
#         ing = ingredients[0]
#         url = f"https://cosylab.iiitd.edu.in/recipe-search/ingredients?searchText={ing}&pageSize=1"

#         print(url)
#         payload = {}
#         headers = {}
        
#         response = requests.request("GET", url, headers=headers, data=payload)
#         #there is an error in the above line or the iiitd cosylab server is down
#         print(response)
#         dataset = json.loads(response.text)["payload"]["data"][1:]
#         print(dataset)
        
#         recipe_nos = []
#         for item in dataset:
#             recipe_nos.append(item['recipe_no'])
        
#         recipe_accuracy = []
#         for i in range(len(recipe_nos)):
#             id = recipe_nos[i]
#             current_ingredients = ingredients.copy()
            
#             url = f"https://cosylab.iiitd.edu.in/recipe/{id}"
#             response = requests.request("GET", url, headers=headers, data=payload)
            
#             ingred = json.loads(response.text)["payload"]["ingredients"]
#             ingred_list = [item['ingredient'] for item in ingred]
            
#             # Remove matched ingredients
#             for item in ingredients:
#                 if item in ingred_list:
#                     current_ingredients.remove(item)
            
#             recipe_accuracy.append(len(current_ingredients))
        
#         # Find the recipe with minimum unmatched ingredients
#         index = recipe_accuracy.index(min(recipe_accuracy))
#         id_final = recipe_nos[index]
        
#         url = f"https://cosylab.iiitd.edu.in/recipe/{id_final}"
#         response = requests.request("GET", url, headers=headers, data=payload)
        
#         dish = json.loads(response.text)["payload"]["Recipe_title"]
        
#         # Generate recipe using Gemini
#         response = model.generate_content(f"Give me a simple recipe for {dish} including the ingredients {' '.join(ingredients)}")
        
#         return response.text
    
#     except Exception as e:
#         return f"Error generating recipe: {str(e)}"

# @app.route('/generate-recipe', methods=['POST', 'OPTIONS'])
# def recipe_generation_endpoint():
#     # Handle preflight request
#     if request.method == 'OPTIONS':
#         return jsonify({"status": "OK"})
    
#     # Handle POST request
#     data = request.json
#     ingredients = data.get('ingredients', '')
    
#     recipe = generate_recipe(ingredients)
    
#     return jsonify({
#         'recipe': recipe
#     })

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5001)



from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import google.generativeai as genai
import json

app = Flask(__name__)
# Enable CORS for all routes
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Handling OPTIONS preflight request
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# API_KEY = "AIzaSyD4j4LlRV6z0aayEbHXZuqN_uDaOHwIuq8"  # Replace with your actual API key
# genai.configure(api_key=API_KEY)
# model = genai.GenerativeModel("gemini-1.5-flash")

def generate_recipe(ingredients):
    try:
        if isinstance(ingredients, str):
            ingredients = [ingredient.strip() for ingredient in ingredients.split(',')]

        if not ingredients:
            return "Error: No ingredients provided."

        # Fetch initial recipe data from Cosylab API
        ing = ingredients[0]
        url = f"https://cosylab.iiitd.edu.in/recipe-search/ingredients"
        params = {"searchText": ing, "pageSize": 10}
        response = requests.get(url, params=params)
        print(response)
        print(f"Cosylab API response: {response.status_code} - {response.text}")

        if response.status_code != 200:
            print("hello error")
            return f"Error: Cosylab API returned {response.status_code} with response {response.text}"

        data = json.loads(response.text)
        dataset = data.get("payload", {}).get("data", [])[1:]

        if not dataset:
            return "Error: No recipes found matching the ingredients."

        recipe_nos = [item['recipe_no'] for item in dataset]

        # Determine the best recipe based on ingredient match
        recipe_accuracy = []
        for id in recipe_nos:
            current_ingredients = ingredients.copy()
            url = f"https://cosylab.iiitd.edu.in/recipe/{id}"
            response = requests.get(url)

            if response.status_code != 200:
                return f"Error: Cosylab API failed for recipe ID {id} with response {response.text}"

            recipe_data = json.loads(response.text)
            ingred_list = [item['ingredient'] for item in recipe_data.get("payload", {}).get("ingredients", [])]

            for item in ingredients:
                if item in ingred_list:
                    current_ingredients.remove(item)

            recipe_accuracy.append(len(current_ingredients))

        # Find the recipe with the fewest unmatched ingredients
        index = recipe_accuracy.index(min(recipe_accuracy))
        id_final = recipe_nos[index]

        url = f"https://cosylab.iiitd.edu.in/recipe/{id_final}"
        response = requests.get(url)

        if response.status_code != 200:
            return f"Error: Cosylab API failed for final recipe ID {id_final} with response {response.text}"

        final_recipe_data = json.loads(response.text)
        dish = final_recipe_data.get("payload", {}).get("Recipe_title", "a dish")

        # Generate recipe details using Gemini
        gemini_prompt = f"Give me a simple recipe for {dish} including the ingredients {' '.join(ingredients)}."
        gemini_response = model.generate_content(gemini_prompt)

        return gemini_response.text

    except json.JSONDecodeError as e:
        return f"Error decoding JSON: {str(e)}"
    except requests.exceptions.RequestException as e:
        return f"Error connecting to API: {str(e)}"
    except Exception as e:
        return f"Error generating recipe: {str(e)}"

@app.route('/generate-recipe', methods=['POST', 'OPTIONS'])
def recipe_generation_endpoint():
    print(f"Received {request.method} request.")
    if request.method == 'OPTIONS':
        return jsonify({"status": "OK"})

    data = request.json
    ingredients = data.get('ingredients', '')

    recipe = generate_recipe(ingredients)

    return jsonify({
        'recipe': recipe
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
