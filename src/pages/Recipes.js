import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Recipes() {
    const [recipes, setRecipes] = useState([]);

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
                        <td>
                            <Link 
                                to={`/recipes/${recipe.id}`}
                                state={{
                                    name: recipe.name,
                                    description: recipe.description,
                                    instructions: recipe.instructions,
                                    created_at: recipe.created_at
                                }}>    
                                {recipe.name}
                            </Link>
                        </td>
                        <td>{recipe.created_at}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default Recipes;