import React from "react";
const Profile = () => {
    const deleteProfile = () => {
        //TODO: Protected delete
        // To retrieve the token
        const token = document.cookie.split('; ')
        .find(row => row.startsWith('token='))
        .split('=')[1];

        console.log('Token: ' + token);
    };

    return (
        <div className="profile">
            <h1>Profile</h1>
            {/* TODO: Show user info*/}
            <button onClick={deleteProfile}>Delete Profile</button>
        </div>
    )
};
export default Profile;