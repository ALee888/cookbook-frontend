import React from "react";
import { Link } from "react-router-dom";

const Error=()=>{
    return (
        <div className="Error">
            <h2>404</h2>
            <p>Page not found</p>
            <Link to='/'>Home</Link>            
        </div>
    )
};
export default Error;