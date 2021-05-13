import React from "react"

const movieListData = (props) => {
  // function that will go into the mapping of movie data
  // function will take in a single movie and return html of what we want it to look like
  // return a div with the movie title
  return (
    <p>
      {props.title.title}
    </p>
  )
}

export default movieListData