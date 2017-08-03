import React, { Component } from 'react';
import './App.css';


class Buttons extends Component {
  render() {
    return (
      <div >
        <button className="button23" onClick={()=>this.props.last()}>Last</button>
        <p>Page: {this.props.page}</p>
        <button className="button23" onClick={()=>this.props.next()}>Next</button>
      </div>
    );
  }
}

export default Buttons;
