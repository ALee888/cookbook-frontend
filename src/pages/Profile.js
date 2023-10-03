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
            // TODO: Make get user data api call to get the basics
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
        console.log('EFFECT:');
        fetchUser();
        fetchRecipes();

    }, [userId]);

    const deleteProfile = () => {
        //TODO: Protected delete
        // To retrieve the token
        const token = document.cookie.split('; ')
        .find(row => row.startsWith('token='))
        .split('=')[1];

        console.log('Token: ' + token);
    };
    const removeRecipe = () => {
        //TODO: Remove record from users-recipes
    }

    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    return (
        <div className="profile">
            <h1>Profile</h1>
            {/* TODO: Show user info*/}
            <h2>Name: {user.username}</h2>
            <h3>Email: {user.email}</h3>
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
                        <td><button onClick={removeRecipe}>Unsave</button></td>
                    </tr>
                ))}
            </table>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={deleteProfile}>Delete Profile</button>

        </div>
    )
};
export default Profile;