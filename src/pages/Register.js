import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
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
        
        // Reset User
        setUser({
            name: '',
            email: '',
            password: ''            
        })

        // TODO: Go to login
        useNavigate('/Login')
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

    return(
        <div className='Register'>
            <form onSubmit={handleSubmit}>
                <div className='formGroup'>
                    <label for="name">Name</label>
                    <input 
                        type='text'
                        name='name'
                        value={user.name}
                        onChange={(e) => handleInputChange(e)}
                        placeholder='username'
                        required
                    />
                </div>
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
                <button type='submit'>Register User</button>
            </form>
        </div>
    );
};
export default Register;