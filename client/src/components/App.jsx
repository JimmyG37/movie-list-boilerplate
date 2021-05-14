import React from 'react';
import movieListData from './movieListData.js'
import MovieData from "./MovieData.jsx"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieList: movieListData,
      searchResults: '',
      buttonValue: 'Search',
      addMovie: '',
      previousMovies: movieListData
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

  }
   //handlechange for input text in search

   handleChange(e) {
     this.setState({
      searchResults: e.target.value
     })
   }

   handleSubmit(e) {
     e.preventDefault();

     if (this.state.buttonValue === 'Go Back!') {
      console.log(this.state.previousMovies);
      this.setState((props, state) => {
        return ({
          movieList: this.state.previousMovies,
          buttonValue: 'Search'
        })
      })
      // this.state.movieList = this.state.previousMovies
      // this.state.buttonValue = 'Search'
     }

     var newMovieList = this.filterSearch(this.state.searchResults);
     this.setState((prevState) => {
      console.log(this.state.previousMovies);
       return (
         {previousMovies: prevState.movieList,
         movieList: newMovieList,
         searchResults: '',
         buttonValue: 'Go Back!'}
       )
     })

     // conditional - return to previous state or go the next state
     // prevState.movieList (should have all the old movie list?)

   }
   //handleSubmit for saving searched value in state
     //iterate in the movie list data and find title that match value or contains similar words
     //re-render the page to reflect only those titles

   //filter search results function take in search result and output similar or same input
   filterSearch(input) {
      let movieData = this.state.movieList;
      let result = movieData.filter(film => {
        return (film.title.indexOf(input) > -1)
      })
      if(result.length === 0) {
        return [{title: 'No movie by that name found'}]
      }
      return result
   }

   // create a new handle button that takes care of adding movies

   handleAddChange(e) {
     this.setState({
       addMovie: e.target.value
     })
   }

   handleAdd(e) {
     e.preventDefault();
     let newMovie = {title: this.state.addMovie};
     this.setState({
       movieList: [newMovie, ...this.state.movieList],
       addMovie: ''
     })
   }


   render() {
    return (
      // mapping of the movie data here using MovieData.jsx
      <div>
        <header>MovieList</header>
        <form>
          <input type="text" name="addmovietitle" value={this.state.addMovie} onChange={this.handleAddChange}/>
          <button onClick={this.handleAdd}>Git Add</button>
        </form>
        <form onSubmit={this.handleSubmit}>
          <label>
          <input type="text" name="title" placeholder=":)" value={this.state.searchResults} onChange={this.handleChange}/>
          </label>
          <input type="submit" value={this.state.buttonValue} />
        </form>

        <div>
          {this.state.movieList.map((title, index) =>
            <MovieData title={title} key={index} />)}
        </div>
      </div>
    )

  }
}




export default App;