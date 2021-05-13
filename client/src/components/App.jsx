import React from 'react';
import movieListData from './movieListData.js'
import MovieData from "./MovieData.jsx"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieList: movieListData,
      searchResults: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
   //handlechange for input text in search

   handleChange(e) {
     this.setState({
      searchResults: e.target.value
     })
   }

   handleSubmit(e) {
     e.preventDefault();
     var newMovieList = this.filterSearch(this.state.searchResults);
     this.setState({
       movieList: newMovieList,
       searchResult: ''
     })
   }
   //handleSubmit for saving searched value in state
     //iterate in the movie list data and find title that match value or contains similar words
     //re-render the page to reflect only those titles

   //filter search results function take in search result and output similar or same input
   filterSearch(search) {
      let movieData = this.state.movieList;
      let result = movieData.filter(word => {
        return (word.title.indexOf(search) > -1)
      })
      if(result.length === 0) {
        return [{title: 'poopoo'}]
      }
      return result
   }
  render() {
    return (
      // mapping of the movie data here using MovieData.jsx
      <div>
        <header>MovieList</header>
        <form onSubmit={this.handleSubmit}>
          <label>
          <input type="text" name="title" value={this.state.searchResults} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="search" />
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