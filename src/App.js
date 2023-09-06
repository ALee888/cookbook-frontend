import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import RecipeInfo from './RecipeInfo';

function App() {
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
        
        <Router>
            <div className='app'>
                <header>
                    <h1 id='title'>Our Cookbook</h1>
                </header>
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
                                    <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                                </td>
                                <td>{recipe.created_at}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <Routes>
                    <Route path='/' element={<div>Recipes</div>} />
                    <Route path="/recipe/:recipeId" element={<RecipeInfo />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;