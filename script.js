const movieApp = {};
movieApp.dropdown = document.querySelector("#dropdown");
movieApp.baseURL = "https://api.themoviedb.org/3";
movieApp.genresURL = "https://api.themoviedb.org/3/genre/movie/list";
movieApp.apiKey = "3a0641f8102192c59a0e2ba5b56c7347";
movieApp.discoverURL =
  movieApp.baseURL + "/discover/movie?sort_by=popularity.desc&";
movieApp.selectedGenre = [];
movieApp.imageURL = "https://image.tmdb.org/t/p/w500";

movieApp.getGenreData = () => {
  const url = new URL(movieApp.genresURL);

  url.search = new URLSearchParams({
    api_key: movieApp.apiKey,
  });

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      movieApp.populateDropdown(data.genres);
    });
};

movieApp.discoverData = (query) => {
const url = new URL(movieApp.discoverURL);

url.search = new URLSearchParams({
  api_key: movieApp.apiKey,
  with_genres: query
});

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    document.querySelector("#actionMovies").innerHTML = "";
    movieApp.displayActionGenre(data.results)
  });
}


movieApp.displayActionGenre = (movieResults) => {
    console.log(movieResults)
    movieResults.forEach((movieResult) => {
      //create the html for each piece of art
      const title = document.createElement("h2");
      title.innerText = movieResult.title;

      const overview = document.createElement("p");
      overview.innerText = movieResult.overview;

      const image = document.createElement("img");
      image.src = movieApp.imageURL + movieResult.poster_path;
      image.alt = movieResult.title;

      //now put them in a div container;
      const div = document.createElement("div");
      div.classList.add("moviePiece");

      div.appendChild(title);
      div.appendChild(overview);
      div.appendChild(image);

      document.querySelector("#actionMovies").append(div);
    });
}

movieApp.populateDropdown = (dataFromApi) => {
  dataFromApi.forEach(function (genre) {
    const option = document.createElement("option");
    option.textContent = genre.name;
    option.id = genre.id;
     movieApp.dropdown.addEventListener("change", () => {
       const movie = option.id;
       //its appending all the ids all at once so need to loop through them.
       movieApp.discoverData(movie);
     });
    movieApp.dropdown.append(option);
  });
};


movieApp.init = () => {
  movieApp.getGenreData();
  movieApp.discoverData();
};

movieApp.init();
