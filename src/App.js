import React, { useState } from 'react';
import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeInfo from './pages/RecipeInfo';
import NewRecipe from './pages/NewRecipe';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
import SharedLayout from './pages/SharedLayout';

function App() {
    const [user, setUser] = useState(null);
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<SharedLayout />}>
                        <Route index element={<Home />} />
                        <Route path='recipes' element={<Recipes />} />
                        <Route path='recipes/:recipeId' element={<RecipeInfo />} />
                        <Route path='newRecipe' element={<NewRecipe />} />
                        <Route path='login' element={<Login setUser={setUser}></Login>} />
                        <Route path='register' element={<Register />} />
                        <Route path='profile' element={<Profile user={user}></Profile>} />
                        <Route path='*' element={<Error />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;