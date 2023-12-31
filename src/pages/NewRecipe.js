import React, { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';

function NewRecipe () {
    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
        instructions: '',
        ingredients: [],
        created_by: 0
    });
    const authUser = useAuthUser();
    
    useEffect(() => {
        // Verify Login
        if (authUser()) {
            //Update userId
            setRecipe({ ...recipe, created_by: authUser().id});
        } else {
            console.error('ERROR: User not authenticated');
            // TODO: PopUp redirect to login
        }
    }, []);

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
        
        // Call APIs
        fetchPost();
        
        // Reset Form
        setRecipe({
            name: '',
            description: '',
            instructions: '',
            ingredients: [],
            created_by: 0
        })
    };

    // Fetch POST Request
    const fetchPost = async () => {
        console.log(recipe);
        const response = await fetch(`http://localhost:4000/recipes`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(recipe),
        });
        const res = await response.json();
        console.log(res)
        if (res.recipeId) {
            saveRecipe(res.recipeId)
        }
        // TODO: Error handling on this before saveRecipe
        return res.insertId;

    };
    const saveRecipe = async (recipeId) => {
        console.log('in this bitch')
        // POST users-recipes
        let userId = authUser().id
        const response = await fetch (`http://localhost:4000/users-recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId, recipeId: recipeId })
        });
        console.log(response.json());
	}

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
                <label htmlFor='description'>Description:</label>
                <textarea 
                    id='description'
                    name="description" 
                    value = {recipe.description} 
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor='instructions'>Instructions:</label>
                <textarea 
                    id='instructions'
                    name="instructions" 
                    value = {recipe.instructions} 
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
                            type='number'
                            name='quantity'
                            min='0'
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

