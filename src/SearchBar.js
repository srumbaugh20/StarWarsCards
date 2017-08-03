import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  render() {
    return (
      <div className='search-bar'>
      <input placeholder='Search Your Destiny' type='search' onChange={(event) => this.props.searchPeople( event.target.value )}/>
      </div>
    );
  }
}

export default SearchBar;
