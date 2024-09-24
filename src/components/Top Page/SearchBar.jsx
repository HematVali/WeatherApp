// Import statements
import React from 'react';
import './Searchbar.css'; 

// React component to display the search bar and handle activity
const Searchbar = ({ city, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="search-form">
        <input type="text" placeholder="Enter City" value={city} onChange={handleInputChange}/>
        <button type="submit" hidden />
    </form>
  );
}

export default Searchbar;