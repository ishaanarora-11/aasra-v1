from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/save-ingredients', methods=['POST'])
def save_ingredients():
    data = request.json
    ingredients = data.get('ingredients', '')
    utensils = data.get('utensils', '')

    # Save the data to a text file
    with open('ingredients.txt', 'w') as file:
        file.write(f"Ingredients: {ingredients}\n")
        file.write(f"Utensils: {utensils}\n")

    return jsonify({'message': 'Ingredients saved successfully!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
