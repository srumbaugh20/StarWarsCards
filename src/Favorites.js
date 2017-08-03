import React, { Component } from 'react';
import Favcards from './Favcards'
import { Link } from 'react-router-dom'
import Dragula from 'react-dragula';
import './Favorites.css';



class Favorites extends Component {
  constructor(){
    super();
    this.state = {
                favoriteList: [],
                people: [],
                peopleList: [],
                homeworlds: [],
                message: ''
    }
  }

  componentDidMount(){
    this.fetchPeople();
    this.getFavorites();
    this.getHomeworlds();
  }

  fetchPeople = ()=>{
    fetch(`http://localhost:3008/people`).then((response)=>{
      if(response.ok){
        response.json().then(data =>{
          this.setState({people: data});
        })
      }
      return 'ok'
    })
  }

  getFavorites = ()=>{
    fetch(`http://localhost:3008/peoplefavorites/1`).then((response)=>{
      if(response.ok){
        this.setState({message: 'done'}, this.matchFavorites())
        response.json().then(data =>{
          data.favorites.map((id)=>{
            this.setState({ favoriteList: this.state.favoriteList.concat(id) })
            return 'ok'
            })
        })
      }
    })
  }

  matchFavorites = ()=>{
    this.state.favoriteList.map((id)=>{
      for (var i = 0; i < this.state.people.length; i++) {
        if(this.state.people[i].id === id){
          this.setState({ peopleList: this.state.peopleList.concat(this.state.people[i]) })
        }
      }
      return 'ok'
    })
  }

  getHomeworlds = ()=>{
    const worldUrl = "http://localhost:3008/planets"
    fetch(worldUrl).then((response)=>{
      if(response.ok){
        response.json().then( data=>{
          this.setState({homeworlds: data}, this.matchFavorites())
        })
      }
    })
    }

    dragulaDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
          let options = { };
          Dragula([componentBackingInstance], options);
        }
      };

    saveOrder = () => {
      const cards = document.querySelectorAll('div.card1')
      const nums = []
      for (var i = 0; i < cards.length; i++) {
        nums.push(Number(cards[i].id))
      }
      fetch(`http://localhost:3008/peoplefavorites/1`, {
        method: "PATCH",
        mode: 'cors',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify( { favorites: nums } )}
      )
      .then(()=>{
        console.log('ok', nums);
      });
  }


  render() {
    return (
      <div>
        <Link className="linkbutton" to="/"><button className="button23">Back</button></Link>
        <button className="button23" onClick={()=>this.saveOrder()}>Save</button>
        <div className='content' ref={this.dragulaDecorator}>
            {this.state.peopleList.map((people)=>{
            return <Favcards key={people.id} id={people.id} people={people} homeworld={this.state.homeworlds} />
            })}

        </div>
      </div>
    );
  }
}

export default Favorites;
