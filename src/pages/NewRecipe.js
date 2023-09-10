import React, { useState } from 'react';

function NewRecipe () {
    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
        ingredients: [],
    })

    // Handle input changes for recipe details
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value})
    }

    // Handle adding a new ingredient
    const addIngredient = () => {
        const newIngredients = [...recipe.ingredients, ''];
        setRecipe({ ...recipe, ingredients: newIngredients});
    };

    // Handle changing an ingredient's value
    const handleIngredientChange = (e, index) => {
        const newIngredients = [...recipe.ingredients];
        newIngredients[index] = e.target.value;
        setRecipe({ ...recipe, ingredients: newIngredients});
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`${recipe.name}\n${recipe.description}`)
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
                {/*Name, description and ingredients [{name, quantity, measurements}]*/}
                <label htmlFor='description'>
                    <textarea name="message" rows="10" cols="30" onChange={handleInputChange}/>
                </label>
                <div className='ingredientInput'>
                    <label> name
                        <input 
                            type='text'
                            onChange={handleIngredientChange}
                        />
                    </label>
                    <label> quantity
                        <input 
                            type='number'
                            onChange={handleIngredientChange}
                        />
                    </label>
                    <label> measurement
                        <input 
                            type='text'
                            onChange={handleIngredientChange}
                        />
                    </label>
                    <button type="button" onclick={addIngredient}>Add Ingredient +</button>
                </div>
                <input type="submit" value={'submit'}/>
            </form>
        </div>
    )
}

export default NewRecipe;

