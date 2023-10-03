import React from "react";
import { useNavigate } from "react-router-dom";
import { useSignOut } from 'react-auth-kit';

const Profile = () => {
    const navigate = useNavigate();
    const signOut = useSignOut();
    
    const deleteProfile = () => {
        //TODO: Protected delete
        // To retrieve the token
        const token = document.cookie.split('; ')
        .find(row => row.startsWith('token='))
        .split('=')[1];

        console.log('Token: ' + token);
    };

    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    return (
        <div className="profile">
            <h1>Profile</h1>
            {/* TODO: Show user info*/}
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={deleteProfile}>Delete Profile</button>

        </div>
    )
};
export default Profile;