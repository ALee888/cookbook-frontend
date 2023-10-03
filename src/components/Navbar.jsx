import React from "react";
import { NavLink } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";

const Navbar = () => {
    const isAuthenticated = useIsAuthenticated();
    
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
            { isAuthenticated() ? (
                <NavLink to='/profile' className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                    <button>Profile</button>
                </NavLink>
            ) : (
                <NavLink to='/login' className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                    <button>Login</button>
                </NavLink>
            )}
        </nav>
    );
};
export default Navbar;