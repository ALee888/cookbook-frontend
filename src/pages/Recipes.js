import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();
        
    // GET with fetch API
    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(
                'http://localhost:4000/recipes'
            );
            const data = await response.json();
            console.log(data);
            setRecipes(data.result);
        };
        fetchPost();
    }, []);

    const openRecipe = (recipeId, description, instructions) => {
        navigate(
            `/recipes/${recipeId}`,
            {
                state: { recipeId: recipeId, description: description, instructions: instructions }
            }
        )
    };
    return (
        <div className='recipes'>
            <table>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>date</th>
                </tr>
                {recipes.map((recipe, index) => (
                    <tr key={index} className='recipe'>    
                        <td className='id'>{recipe.id}</td>
                        <td>{recipe.name}</td>
                        <td>{recipe.created_at}</td>
                        <td>
                            <button onClick={() => {openRecipe(recipe.id, recipe.description, recipe.instructions)}}>
                                View
                            </button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default Recipes;