import React, { Component } from 'react';
import './Card.css';


class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
                planet: '',
                planetId: props.people.homeworld,
                edit: false,
                checked: props.people.checked,
                name: props.people.name,
                birth: props.people.birth_year,
                worlds: props.homeworld,
                id: props.people.id
    }
  }

  componentDidMount(){
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


  editName = ()=>{
      this.setState({edit: true})
  }


  changeName = (name)=>{
    this.setState({name: name})
  }

  changeBirth = (birth)=>{
    this.setState({birth: birth})
  }

  changeWorld = (newId)=>{
    var id = Number(newId)
    this.setState({planetId: id});
    this.state.worlds.map((world)=>{
      if(id === world.id){
        this.setState({planet: world.name})
      }
      return 'ok'
      })
    }


  saveChanges = ()=>{
      this.setState({edit: false}, ()=>{
        fetch(`http://localhost:3008/people/${this.props.people.id}`, {
          method: "PATCH",
          mode: 'cors',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( { name: this.state.name, birth_year: this.state.birth, homeworld: this.state.planetId } )}).then(()=>{
          this.props.refresh();
        })
      })
    }

    checked = ()=> {
      this.setState({checked: !this.state.checked}, ()=>{
        fetch(`http://localhost:3008/people/${this.props.people.id}`, {
          method: "PATCH",
          mode: 'cors',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( { checked: this.state.checked } )}).then(()=>{
          this.props.refresh();
          this.props.isFavorite(this.state.checked, this.state.id);
        })
      })
    }


  render() {
    return (
      <div  className='card'>
        <div key={this.props.people.id} className='card-content'>
            {this.state.edit ?<input type='text' value={this.state.name} onChange={(event) => this.changeName(event.target.value)}/> : <p className='card-names'><b>{this.props.people.name}</b></p>}
          	<img src={'http://localhost:3008/' + this.props.people.image} alt='profile'/>
            <p>
                <span><b>Birthday:</b></span>
                {this.state.edit ?<input  type='text' value={this.state.birth} onChange={(event) => this.changeBirth(event.target.value)}/> : <span className='card-name'>{this.props.people.birth_year}</span>}
            </p>
            <p>
                <span><b>Homeworld:</b></span>

              {this.state.edit ?
                  <select className="soflow" name="worlds" onChange={(event)=> this.changeWorld(event.target.value)}>
                      <option value={this.state.planet}>Current: {this.state.planet}</option>

                      {this.state.worlds.map((worlds)=>{
                      return <option key={worlds.id} value={worlds.id}>{worlds.name}</option>
                      })}

                  </select>
              : <span>{this.state.planet}</span>}

            </p>

            <input type='checkbox' onChange={() => this.checked()} checked={this.props.people.checked}/><span>Favorite</span>
            {this.state.edit ? <button className='button -dark center' onClick={()=>this.saveChanges()}>Save</button> : <button className='button -dark center' onClick={()=>this.editName()}>Edit Info</button>}
        </div>
    </div>

    );
  }
}

export default Card;
