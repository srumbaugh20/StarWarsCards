import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import './App.css';
import Card from './Card.js';
import SearchBar from "./SearchBar.js";
import Buttons from "./Buttons.js";



function getUrl(page, search) {
  if(search){
  return `http://localhost:3008/people?q=${search}`;
  }else{
    return `http://localhost:3008/people?_page=${page}&_limit=10`;
  }

  }


class Feed extends Component {
  constructor(){
    super();
    this.state = {
                people: [],
                possible_pages: 0,
                page: 1,
                search: '',
                homeworlds: [],
                favoriteList: []

    }
  }

  componentDidMount(){
    this.getHomeworlds();
    this.fetchPeople();
    this.getPages();
    this.initialFavoritePost();

  }

  initialFavoritePost = ()=>{
    fetch(`http://localhost:3008/peoplefavorites`, {
      method: "POST",
      mode: 'cors',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( { favorites: [] } )})
    fetch(`http://localhost:3008/peoplefavorites/1`).then((response)=>{
      if(response.ok){
        response.json().then( data=>{
          this.setState({favoriteList: data.favorites})
        })
      }
    })
  }

  fetchPeople = ()=>{
    fetch(getUrl(this.state.page, this.state.search)).then((response)=>{
      if(response.ok){
        response.json().then(data =>{
          this.setState({
            people: data,
            length: data.length
          })
        })
      }
    })
  }


  getHomeworlds = ()=>{
    const worldUrl = "http://localhost:3008/planets"
    fetch(worldUrl).then((response)=>{
      if(response.ok){
        response.json().then( data=>{
          this.setState({homeworlds: data})
        })
      }
    })
    }

  getPages = ()=>{
    const url = 'http://localhost:3008/people';
    fetch(url).then((response)=>{
      if(response.ok){
        response.json().then(data =>{
          if(data.length%10 !== 0){
            const possible_pages = Math.floor(data.length/10+1);
            this.setState({
              possible_pages: possible_pages
            })
          }else {
            const possible_pages = data.length/10;
            this.setState({
              possible_pages: possible_pages
            })
          }

        })
      }
    })
  }

  isFavorite = (checked, id)=>{
    const favs2 = [];
    if(checked === true){
      this.setState({ favoriteList: this.state.favoriteList.concat(id) })
    } else
      {for (var i = 0; i < this.state.favoriteList.length; i++) {
        if(this.state.favoriteList[i] !== id){
          favs2.push(this.state.favoriteList[i])
      }
    }
    this.setState({favoriteList: favs2})
    }
    this.postFavorites();
  }

  postFavorites = ()=>{
    fetch(`http://localhost:3008/peoplefavorites/1`, {
      method: "PATCH",
      mode: 'cors',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( { favorites: this.state.favoriteList } )})
  }

  searchPeople = (search)=>{
      this.setState({ search: search, page:1}, () =>{
        this.fetchPeople()
      })

  }

  inceasePage = ()=>{
      if(this.state.page !== this.state.possible_pages){
        this.setState({ page: this.state.page + 1 }, () => {
          this.fetchPeople()
        })
      }
  }

  decreasePage = () => {
        if(this.state.page !== 1){
          this.setState({ page: this.state.page - 1 }, () =>{
            this.fetchPeople()
          })
        }
  }

  render() {
    const peopleSearch = _.debounce((term) => {this.searchPeople(term)}, 300)
    return (
              <div>
                <SearchBar searchPeople={peopleSearch}/>
                <Link className="linkbutton" to='/favorites'><button className="button23">Favorites</button></Link>
                <Buttons page={this.state.page} next={this.inceasePage} last={this.decreasePage}/>
              <div>
                    {this.state.people.map((people)=>{
                    return <Card key={people.id} people={people} homeworld={this.state.homeworlds} isFavorite={this.isFavorite} refresh={this.fetchPeople}/>
                    })}

                </div>
              </div>
    );
  }
}

export default Feed;
