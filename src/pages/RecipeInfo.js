import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const RecipeInfo = () => {
	const { recipeId } = useParams();
	const [ingredients, setIngredients] = useState([]);

	// GET with fetch API
	useEffect(() => {
		const fetchPost = async () => {
			console.log(recipeId)
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
				<div>
					{history.state}
				</div>
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
			</div>
			<Link to='/recipes'>back to products</Link>
		</div>
	);
};


export default RecipeInfo;