const API_KEY = "api_key=3a0641f8102192c59a0e2ba5b56c7347"
const BASE_URL = "https://api.themoviedb.org/3"
const API_URL = BASE_URL + "/trending/movie/week?" + API_KEY

const IMG_URL = "https://image.tmdb.org/t/p/w500"

const trendingMovies = document.getElementById("trendingMovies")

getTrendingMovies(API_URL)

function getTrendingMovies(url) {
    fetch(url).then(results => results.json()).then(data => {
        displayTrendingMovies(data.results)
    })
}

function displayTrendingMovies(data) {
    trendingMovies.innerHTML = ""

    data.forEach(movie => {
        const {title, poster_path, vote_average} = movie
        const movieElement = document.createElement("div")
        movieElement.classList.add("trending")
        movieElement.innerHTML = `
            
            <div class="movieInfo">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
        
            <img src="${IMG_URL+poster_path}" alt="${title}">

            
        `

        trendingMovies.appendChild(movieElement)
    })
}

function getColor(vote) {
    if(vote >= 8){
        return "green"
    } else if (vote >= 5){
        return "orange"
    } else{
        return "red"
    }
}

const carouselSlide = document.querySelector(".trendingMovies")
const carouselImages = document.querySelectorAll (".trendingMovies img")

const previous = document.querySelector(".prevSlide")
const next = document.querySelector(".nextSlide")

let counter = 1
const size = carouselImages[0].clientWidth

carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)"

//button listeners
next.addEventListener("click", () => {
    carouselSlide.style.transition = "transform 0.4 ease-in"
    counter++;
    carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)"
})
