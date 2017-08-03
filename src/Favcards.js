import React, { Component } from 'react';
import './FavCard.css';




class Favcards extends Component {
  constructor(props){
    super(props);
    this.state = {
      planet: '',
      planetId: props.people.homeworld

    }
  }

  componentDidMount = ()=>{
    this.matchHomeworld();
  }

  matchHomeworld = ()=>{
  this.props.homeworld.map((homeworld)=>{
    if(this.state.planetId === homeworld.id){
      this.setState({planet: homeworld.name})
    }
    return 'ok'
    })
  }

render() {
  return (
      <div  className='card1' id={this.props.people.id}>
        <div  className='card-content1'>
            <span>{this.props.people.name}</span>
            <img src={'http://localhost:3008/' + this.props.people.image} alt='profile'/>
            <p>
                <span><b>Birthday:</b></span>
                <span>{this.props.people.birth_year}</span>
            </p>
            <p>
                  <span><b>Homeworld:</b></span>
                  <span>{this.state.planet}</span>

            </p>

        </div>
      </div>
    );
  }
}

export default Favcards;
