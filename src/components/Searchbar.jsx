import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchBar = (props) => {
    const [search, setSearch] = useState('');
    let recipes = props.data;

    const handleInputChange = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    };

    if (search.length > 0) {
        recipes.filter((recipe) => {
            console.log(recipe.name, search)
            return recipe.name.match(search);
        });
        console.log(recipes)
    }

    return (
        <div className='SearchBar'>
            <input type="text" value={search} onChange={handleInputChange} />
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
        </div>
    );
}

export default SearchBar;