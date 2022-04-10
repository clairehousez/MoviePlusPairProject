const movieApp = {};
movieApp.dropdown = document.querySelector("#dropdown");
movieApp.form = document.querySelector("#form");
movieApp.baseURL = "https://api.themoviedb.org/3";
movieApp.genresURL = "https://api.themoviedb.org/3/genre/movie/list";
movieApp.apiKey = "3a0641f8102192c59a0e2ba5b56c7347";
movieApp.discoverURL =
  movieApp.baseURL + "/discover/movie?sort_by=popularity.desc&";
movieApp.searchURL = movieApp.baseURL + "/search/movie?";
movieApp.imageURL = "https://image.tmdb.org/t/p/w500";
movieApp.peopleURL = "https://api.themoviedb.org/3/person/popular";

movieApp.getPeople = () => {
  const url = new URL(movieApp.peopleURL);

  url.search = new URLSearchParams({
    api_key: movieApp.apiKey,
  });

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      movieApp.populatePeople(data.results);
    });
};

movieApp.populatePeople = (movieResultsPeople) => {
  movieResultsPeople.forEach((movieResult) => {
    const gender = document.createElement("p");
    if (movieResult.gender == 1) {
      gender.innerText = "Female";
    } else {
      gender.innerText = "Male";
    }
    const name = document.createElement("h3");
    name.innerText = movieResult.name;
    const popularity = document.createElement("p");
    popularity.innerText = movieResult.popularity;
    const image = document.createElement("img");
    image.src = movieApp.imageURL + movieResult.profile_path;
    image.alt = movieResult.name;

    //now put them in a div container;
    const div = document.createElement("div");
    div.classList.add("peoplePiece");

    div.appendChild(name);
    div.appendChild(image);
    div.appendChild(popularity);
    div.appendChild(gender);

    document.querySelector("#popularPeople").append(div);
  });
};

movieApp.getSearch = (searchTerm) => {
  const url = new URL(movieApp.searchURL);

  url.search = new URLSearchParams({
    api_key: movieApp.apiKey,
    query: searchTerm,
  });

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      movieApp.displayActionGenre(data.results);
    });
};

movieApp.searchMovie = () => {
  movieApp.form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
      movieApp.getSearch(searchTerm);
    }
  });
};

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
    with_genres: query,
  });

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#actionMovies").innerHTML = "";
      movieApp.displayActionGenre(data.results);
    });
};

movieApp.displayActionGenre = (movieResults) => {
  movieResults.forEach((movieResult) => {
    const title = document.createElement("h2");
    title.innerText = movieResult.title;

    const overview = document.createElement("p");
    overview.innerText = movieResult.overview;

    const image = document.createElement("img");
    image.src = movieApp.imageURL + movieResult.poster_path;
    image.alt = movieResult.title;

    const div = document.createElement("div");
    div.classList.add("moviePiece");

    div.appendChild(title);
    div.appendChild(overview);
    div.appendChild(image);

    document.querySelector("#actionMovies").append(div);
  });
};

movieApp.populateDropdown = (dataFromApi) => {
  dataFromApi.forEach(function (genre) {
    const option = document.createElement("option");
    option.textContent = genre.name;
    option.id = genre.id;
    movieApp.dropdown.addEventListener("change", (e) => {
      const movie = e.target.value;
      movieApp.getSearch(movie);
    });
    movieApp.dropdown.append(option);
  });
};

movieApp.init = () => {
  movieApp.getGenreData();
  // movieApp.discoverData();
  movieApp.getPeople();
  movieApp.searchMovie();
};

movieApp.init();
