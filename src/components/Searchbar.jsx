import React, { useState, useEffect } from 'react';

function SearchBar() {
  const [text, setText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };
  const url = 'http://localhost:4000/recipes'
  useEffect(() => {
    fetch(url)
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setPosts(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }, []);

  return (
    // Call get query on button press
    <div className='SearchBar'>
      <input type="text" value={text} onChange={handleInputChange} />
      <p>Entered text: {text}</p>
      <div className='Results'>
        {posts}
      </div>
    </div>
  );
}

export default SearchBar;