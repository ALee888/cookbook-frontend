import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

const RecipeInfo = () => {
	const { recipeId } = useParams();
	const location = useLocation();
	const [ingredients, setIngredients] = useState([]);
	const info = location.state;
	const userId = 2; // TODO: Grab from login system

	// GET with fetch API
	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch(
				`http://localhost:4000/ingredients/?id=${recipeId}`
			);
			const data = await response.json();
			setIngredients(data.result);
		};
		fetchPost();
	}, [recipeId]);

	const deleteRecipe = async () => {
		// TODO: Check User authorizatoin
		await fetch(`http://localhost:4000/recipes/?id=${recipeId}`, { method: 'DELETE' });
    };

	const saveRecipe = async () => {
		
		// POST users-recipes
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
		<div className='recipeinfo'>
			<div className='recipeHeader'>
				<h1> {info ? info.name : "Name not found"} </h1>
				<p> {info ? info.created_by : "Creator N/A"} </p>			
				<p> Created: {info.created_at}</p>
				<p>{info ? info.description : "Description Not found"}</p>
			</div>
			<div className='ingredients'>
				<h3>Ingredients</h3>
				<table>
					{ingredients.map((ingredient, index) => (
						<tr key={index} className='ingredient'>
							<td>{ingredient.quantity}</td>
							<td>{ingredient.measurement}</td>    
							<td>{ingredient.name}</td>
						</tr>
					))}
				</table>
			</div>
			<div className='instructions'>
				<h3>Instructions</h3>
				<p>{info ? info.instructions : "Instructions not found"}</p>	
			</div>
			<div>
				<Link to='/recipes'><button>back to products</button></Link>
				<Link to='/recipes' onClick={deleteRecipe}><button>DELETE RECIPE</button></Link>
				<Link to='/recipes' onClick={saveRecipe}><button>Save Recipe</button></Link>
			</div>
		</div>
	);
};


export default RecipeInfo;