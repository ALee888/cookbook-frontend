import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();
    const [recipeInfo, setRecipeInfo] = useState({
        name: '',
        description: '',
        instructions: '',
        created_at: ''
    });    
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

    const setRecipeData = (name, description, instructions, created_at) => {
        console.log("Setting Recipe Data: ", name, description, instructions, created_at)
        setRecipeInfo(
            {
                name: name,
                description: description,
                instructions: instructions,
                created_at: created_at
            }
        );
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
                            <Link 
                                to={`/recipes/${recipe.id}`}
                                
                                onClick={() => {setRecipeData(recipe.name, recipe.description, recipe.instructions, recipe.created_at)}}
                                state={{
                                    name: recipe.name,
                                    description: recipe.description,
                                    instructions: recipe.instructions,
                                    created_at: recipe.created_at
                                }}>    
                                Lol
                            </Link>
                            
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default Recipes;