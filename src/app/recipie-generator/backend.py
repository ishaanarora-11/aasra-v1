import requests
import google.generativeai as genai
from gtts import gTTS
from playsound import playsound

API_KEY = "AIzaSyBWt67JBAUkITIUHHGh0i9nNyMs8SqMZoM"
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

with open("temp-ingredients.txt", "r") as f:
    content = f.read()

ingredients = content.split(",")

ing = ingredients[0]
url = f"https://cosylab.iiitd.edu.in/recipe-search/ingredients?searchText={ing}&pageSize=1"

payload={}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

dataset = eval(response.text)["payload"]["data"][1:]
recipe_nos = []
for item in dataset:
    recipe_nos.append(item['recipe_no'])

recipe_accuracy = []

for i in range(len(recipe_nos)):
    id = recipe_nos[i]
    ingredients = ingredients.copy()
    url = f"https://cosylab.iiitd.edu.in/recipe/{id}"

    payload={}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    ingred= eval(response.text)["payload"]["ingredients"]
    ingred_list = []
    for item in ingred:
        ingred_list.append(item['ingredient'])
    for item in ingredients:
        if item in ingred_list:
            ingredients.remove(item)
    recipe_accuracy.append(len(ingredients))

index = recipe_accuracy.index(min(recipe_accuracy))
id_final = recipe_nos[index]

url = f"https://cosylab.iiitd.edu.in/recipe/{id_final}"

payload={}
headers = {}

ingredients = ingredients

response = requests.request("GET", url, headers=headers, data=payload)
dish = eval(response.text)["payload"]["Recipe_title"]
dish = "kheer"
response = model.generate_content(f"Give me a simple recipe for {dish} including the ingredients {' '.join(ingredients)}")


with open("recipe.txt", "r") as f:
    content = f.read()

speech = gTTS(content)
speech.save('recipe.mp3')
