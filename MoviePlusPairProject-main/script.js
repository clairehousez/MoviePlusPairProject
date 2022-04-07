const movieApp = {};
movieApp.dropdown = document.querySelector("#dropdown");
movieApp.genresURL = "https://api.themoviedb.org/3/genre/movie/list";
movieApp.apiKey = "3a0641f8102192c59a0e2ba5b56c7347";
movieApp.selectedGenre = [];

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

movieApp.populateDropdown = (dataFromApi) => {
  dataFromApi.forEach(function (genre) {
    const option = document.createElement("option");
    option.textContent = genre.name;
    option.id = genre.id;
    movieApp.dropdown.append(option);
  });
};

movieApp.dropdown.addEventListener("change", (e) => {
  console.log(e.target);
});

movieApp.init = () => {
  movieApp.getGenreData();
};

movieApp.init();
