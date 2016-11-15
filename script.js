'use strict';

(() => {
  const input = document.querySelector('input');
  const button = document.querySelector('button');

  function renderMovies(movieArr) {
    if (document.querySelector('#movie-container')) document.querySelector('#movie-container').remove();
    const movieContainer = document.createElement('div');
    movieContainer.setAttribute('id', 'movie-container');
    movieArr.forEach((movie) => {
      let title = document.createElement('h3');
      title.setAttribute('class', 'movie-title');
      title.textContent = `${movie.Title} (${movie.Year})`;
      let poster = document.createElement('img');
      poster.setAttribute('src', movie.Poster);
      movieContainer.append(title, poster);
    });
    document.querySelector('#results-container').append(movieContainer);
  }

  function searchMovies(title) {
    fetch(`http://www.omdbapi.com/?s=${title}`)
    .then(r => r.json())
    .then((movies) => {
      renderMovies(movies.Search);
    })
    .catch(err => console.log(err));
  }

  button.addEventListener('click', (e) => {
    searchMovies(input.value);
  })

  input.addEventListener('keypress', (e) => {
    if (e.which === 13) searchMovies(input.value);
  })
})();