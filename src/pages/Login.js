import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
const Login = () => {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Call API
        fetchPost();
        
        // Reset User Inputs
        setUser({
            name: '',
            email: '',
            password: ''            
        })

        // TODO: Go to Home Screen
    };

    // Fetch POST Request
    const fetchPost = async () => {
        const response = await fetch(`http://localhost:4000/users/register`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(user),
        });
        console.log(response.json());
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