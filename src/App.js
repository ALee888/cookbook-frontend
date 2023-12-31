import React, { useState } from 'react';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeInfo from './pages/RecipeInfo';
import NewRecipe from './pages/NewRecipe';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Anylist from './pages/Anylist';
import Error from './pages/Error';
import SharedLayout from './pages/SharedLayout';


function App() {
    const [user, setUser] = useState(null);
    return (
        <AuthProvider
            authType={'cookie'}
            authName={'_auth'}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === "https:"}>
            <link href='https://fonts.googleapis.com/css?family=Indie Flower' rel='stylesheet'></link>
            <Router>
                <Routes>
                    <Route path='/' element={<SharedLayout />}>
                        <Route index element={<Home />} />
                        <Route path='recipes' element={<Recipes />} />
                        <Route path='recipes/:recipeId' element={<RecipeInfo />} />
                        <Route path='newRecipe' element={<NewRecipe />} />
                        <Route path='login' element={<Login setUser={setUser}></Login>} />
                        <Route path='register' element={<Register />} />
                        <Route path='profile' element={
                            <RequireAuth loginPath={'/login'}>
                                <Profile user={user}></Profile>
                            </RequireAuth> 
                        }/>
                        <Route path='anylist' element={<Anylist />} />
                        <Route path='*' element={<Error />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;