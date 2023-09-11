import React, { useState } from 'react';

function NewRecipe () {
    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
        ingredients: [{ name: '', quanitty: '', measurement: ''}],
    });

    // Handle input changes for recipe details
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value})
    };

    // Handle adding a new ingredient
    const addIngredient = () => {
        const newIngredients = [...recipe.ingredients, { name: '', quanitty: '', measurement: ''}];
        setRecipe({ ...recipe, ingredients: newIngredients});
    };

    // Handle changing an ingredient's value
    const handleIngredientChange = (e, index) => {
        const { name, value } = e.target;
        const newIngredients = [...recipe.ingredients];
        newIngredients[index][name] = value;

        setRecipe({ ...recipe, ingredients: newIngredients});
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Call API
		fetchPost();
        
        // Reset Form
        setRecipe({
            name: '',
            description: '',
            ingredients: []
        })
    };

    // Fetch POST Request
    const fetchPost = async () => {
        const response = await fetch(`http://localhost:4000/recipes`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(recipe),
        });
        console.log(response.json());
    };

    return (
        <div className='newRecipe'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Enter your name: </label>
                <input 
                    type='text' 
                    id='name'
                    name='name'
                    value={recipe.name}
                    onChange={handleInputChange}
                    required
                />
                {/*Name, description and ingredients [{name, quantity, measurements}]*/}
                <label htmlFor='description'>Description:</label>
                <textarea 
                    id='description'
                    name="description" 
                    value = {recipe.description} 
                    onChange={handleInputChange}
                    required
                />
                <label>Ingredients:</label>
                {recipe.ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <input
                            type='text'
                            name='name'
                            value={ingredient.name}
                            onChange={(e) => handleIngredientChange(e, index)}
                            placeholder='Ingredient Name'
                            required
                        />
                        <input
                            type='text'
                            name='quantity'
                            value={ingredient.quantity}
                            onChange={(e) => handleIngredientChange(e, index)}
                            placeholder='Quantity'
                        />
                        <input
                            type='text'
                            name='measurement'
                            value={ingredient.measurement}
                            onChange={(e) => handleIngredientChange(e, index)}
                            placeholder='Measurement'
                        />
                    </div>
                ))}
                <button type='button' onClick={addIngredient}>
                    Add Ingredient
                </button>
                <input type="submit" value={'submit'}/>
            </form>
        </div>
    );
}

export default NewRecipe;

