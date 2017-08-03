import React, { Component } from 'react';
import _ from 'lodash';
import { Route, HashRouter as Router } from 'react-router-dom'
import './App.css';
import Feed from './Feed';
import Favorites from './Favorites';
import star from './images/star.svg';
import wars from './images/wars.svg';


class App extends Component {
  render() {
    return (
      <div className='content'>

        <div className='logo'>
          <img src={star} alt="star-logo" />
          <span className='interview-text'>The Interview</span>
          <img src={wars} alt="wars-logo" />
        </div>

        <Router>
            <div>
                <Route path='/' exact={true} component={Feed} />
                <Route path='/favorites' component={Favorites} />
            </div>
        </Router>

      </div>
    );
  }
}

export default App;
