import React from 'react';
import { Link, useParams } from 'react-router-dom';

const RecipeInfo = () => {
  const { recipeId } = useParams();
  return (
    <div className='recipeinfo'>
      <h2> Recipe #{ recipeId }</h2>
      {/* Display the rest of the recipe details here */}
      <div className='info'>
        Name / Ingredients / creator / Timestamp / etc
      </div>
      <Link to='/recipes'>back to products</Link>
    </div>
  );
}


export default RecipeInfo;