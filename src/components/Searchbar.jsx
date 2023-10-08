import React, { useState } from 'react';

function SearchBar() {
  const [text, setText] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className='SearchBar'>
      <input type="text" value={text} onChange={handleInputChange} />
    </div>
  );
}

export default SearchBar;