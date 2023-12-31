import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';

const Login = () => {
    const navigate = useNavigate();
    const signIn = useSignIn()
    
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    // Handle input changes for user details
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value})
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Fetch Token from api
        const authUser = await fetchPost();

        // Authenticate User based on response
        if(signIn(
            {
                token: authUser.token,
                expiresIn: 60, //Time for which the auth token will last, in minutes
                tokenType: "Bearer",
                authState: authUser // State of the Authorized user
            }
        )){
            console.log('Successful User sign-in');
            // Reset User Inputs
            setUser({
                email: '',
                password: ''            
            });
            navigate('/profile');
        } else {
            console.error('Error trying to sign-in with react-auth-kit');
        }
    };

    // Fetch POST Request
    const fetchPost = async () => {
        const response = await fetch(`http://localhost:4000/login`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(user),
        });
        return response.json();
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <div className='formGroup'>
                    <label for="email">Email Address</label>
                    <input 
                        type='email'
                        name='email'
                        value={user.email}
                        onChange={(e) => handleInputChange(e)}
                        placeholder='email'
                        required
                    />
                </div>
                <div className='formGroup'>
                    <label for="password">Password</label>
                    <input 
                        type='password'
                        name='password'
                        value={user.password}
                        onChange={(e) => handleInputChange(e)}
                        placeholder='password'
                        required
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
            <Link to='/register'><button>Register</button></Link>
        </div>
    )
};
export default Login;