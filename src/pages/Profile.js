import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthUser, useSignOut } from 'react-auth-kit';

const Profile = () => {
    const navigate = useNavigate();
    const signOut = useSignOut();
    const authUser = useAuthUser();
    const userId = authUser().id;

    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState({});
    
    
    // GET user_recipes with fetch API
    useEffect(() => {
        const fetchUser = async() => {
            const response = await fetch(
                `http://localhost:4000/users/?id=${userId}`
            );
            const data = await response.json();
            const user = data.result[0];
            setUser({ 'username': user.username, 'email': user.email });
        };
        const fetchRecipes = async () => {
            const response = await fetch(
                `http://localhost:4000/users-recipes/?id=${userId}`
            );
            const data = await response.json();
            setRecipes(data.result);
        };
        fetchUser();
        fetchRecipes();

    }, [userId]);

    const deleteProfile = async () => {
        // To retrieve the token
        await fetch(`http://localhost:4000/users/?user_id=${userId}`, { method: 'DELETE' });
        
    };
    const unsaveRecipe = async (recipeId) => {
        console.log(recipeId);
		await fetch(`http://localhost:4000/users-recipes/?user_id=${userId}&recipe_id=${recipeId}`, { method: 'DELETE' });
    }
    const deleteRecipe = async (recipeId, created_by) => {
		// TODO: Check User authorizatoin
        const userId = authUser().id;
        if (userId == created_by) {
            await unsaveRecipe(recipeId);
    		await fetch(`http://localhost:4000/recipes/?id=${recipeId}`, { method: 'DELETE' });
        }    
    };
    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    const anyListExport = () => {
        //TODO: Anylist functionality
        
    };

    return (
        <div className="profile">
            <h1>Profile</h1>
            {/* TODO: Show user info*/}
            <h2>Name: {user.username}</h2>
            <h3>Email: {user.email}</h3>
            <h2>Created Recipes</h2>
            <h2>Saved Recipes</h2>
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
                                    created_at: recipe.created_at,
                                    created_by: recipe.created_by
                                }}>    
                                {recipe.name}
                            </Link>
                        </td>
                        <td>{recipe.created_at}</td>
                        
                        <td>
                            <button onClick={() => unsaveRecipe(recipe.id)}>Unsave</button>
                            <button onClick={() => anyListExport(recipe)}>Export</button>                
            				<button onClick={() => deleteRecipe(recipe.id, recipe.created_by)}>DELETE RECIPE</button>
                        </td>
                    </tr>
                ))}
            </table>
            <div>
                <button onClick={handleSignOut}>Sign Out</button>
                <button onClick={deleteProfile}>Delete Profile</button>
            </div>
            

        </div>
    )
};
export default Profile;