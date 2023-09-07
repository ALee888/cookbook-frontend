import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink to='/' className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                Home
            </NavLink>
            <NavLink to='/recipes' className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                Recipes
            </NavLink>
            <NavLink to='/newRecipe' className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                Create Recipe
            </NavLink>
            <NavLink to='/profile' className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                Profile
            </NavLink>
            <NavLink to='/login' className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                Login
            </NavLink>
        </nav>
    );
};
export default Navbar;