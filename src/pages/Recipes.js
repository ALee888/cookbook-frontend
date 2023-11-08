import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);

    const handleInputChange = (event) => {
        event.preventDefault();
        setSearchInput(event.target.value);
        if (searchInput.length > 0) {
            const filteredRecipes = recipes.filter((recipe) => {
                return recipe.name.match(searchInput);
            });
            setFilteredRecipes(filteredRecipes);
        }
    };

    
    // GET with fetch API
    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(
                'http://localhost:4000/recipes'
            );
            const data = await response.json();
            setRecipes(data.result);
        };
        fetchPost();
    }, []);

    return (
        <div className='recipes'>
            <h1>Recipes</h1>
            <input type="text" value={searchInput} onChange={handleInputChange} />
            {searchInput === '' ? (
                <table>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>date</th>
                    </tr>
                    {recipes.map((recipe, index) => (
                        <tr key={index} className='recipe'>    
                            <td>{recipe.id}</td>
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
            ) : (
                <table>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>date</th>
                    </tr>
                    {filteredRecipes.map((recipe, index) => (
                        <tr key={index} className='recipe'>    
                            <td>{recipe.id}</td>
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
            )}
            
        </div>
    );
}

export default Recipes;