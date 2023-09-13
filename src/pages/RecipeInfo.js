import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

const RecipeInfo = () => {
	const { recipeId } = useParams();
	const location = useLocation();
	const [ingredients, setIngredients] = useState([]);

	//console.log(location, " useLocation Hook");

	const info = location.state;

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
	return (
		<div className='recipeinfo'>
			<h2> Recipe Id:#{ recipeId }</h2>
			<div className='info'>
				<p>{info ? info.name : "Name not found"}</p>
				<p>{info ? info.description : "Description Not found"}</p>
				<p>{info ? info.instructions : "Instructions not found"}</p>	
				
				<table>
					<tr>
						<th>name</th>
						<th>quantity</th>
						<th>measurement</th>
					</tr>
					{ingredients.map((ingredient, index) => (
						<tr key={index} className='ingredient'>    
							<td>{ingredient.name}</td>
							<td>{ingredient.quantity}</td>
							<td>{ingredient.measurement}</td>
						</tr>
					))}
				</table>
				<p>Created: {info.created_at}</p>
			</div>
			<Link to='/recipes'>back to products</Link>
		</div>
	);
};


export default RecipeInfo;