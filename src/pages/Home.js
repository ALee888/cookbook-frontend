import React, { useState } from "react";
import { Link } from "react-router-dom";
import searchImage from './search.png'

const Home = () => {
    const [searchInput, setSearchInput] = useState('');
    const handleInputChange = (event) => {
        event.preventDefault();
        setSearchInput(event.target.value);
    };
    return (
        <div className="home">
            <h1>Our Cookbook!</h1>
            <div className="searchbar">
                <input type="text" value={searchInput} onChange={handleInputChange} />
                <Link 
                    to={`/recipes`} 
                    state= {{
                        search: searchInput
                    }}>
                    <img src={searchImage} alt="search"/>
                </Link>
            </div>
        </div>
    );
};
export default Home;