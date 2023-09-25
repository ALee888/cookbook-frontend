import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink to='/' className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                <button>Home</button>
            </NavLink>
            <NavLink to='/recipes' className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                <button>Recipes</button>
            </NavLink>
            <NavLink to='/newRecipe' className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                <button>Create Recipe</button>
            </NavLink>
            <NavLink to='/profile' className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                <button>Profile</button>
            </NavLink>
            <NavLink to='/login' className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                <button>Login</button>
            </NavLink>
            {/* TODO: Add (if logged-in -> show profile else show login) */}
        </nav>
    );
};
export default Navbar;