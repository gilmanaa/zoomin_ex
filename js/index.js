starWars = {}

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://swapi.co/api/films/",
        success: function (response) {
            starWars.movies = response.results;
            starWars.appendMovies();
            starWars.addImages();
        },
        error: function () {
            console.log("Star Ware API Call Error");
        }
    })
})

starWars.appendMovies = function () {
    var movieContainer = $("#movies");
    for (let i = 0; i < starWars.movies.length; i++) {
        if (localStorage.getItem(`movie-${starWars.movies[i].title}`) === null) {
            localStorage.setItem(`movie-${starWars.movies[i].title}`, "no-fav")
        }
        var title = starWars.movies[i].title;
        var movieWrapper = $("<div>");
        var fav = $("<button>");
        var movieTitle = $("<span>");
        movieTitle.text(title);
        movieWrapper.addClass("movie-wrapper");
        fav.text("Add to Favorites");
        if (localStorage.getItem(`movie-${starWars.movies[i].title}`) === "fav") {
            movieWrapper.addClass("favorite-movie");
            fav.text("Remove Favorite");
        }
        fav.addClass("fav-btn");
        fav.click(function (event) {
            var selection = event.currentTarget.parentElement;
            var movieSelection = event.currentTarget.previousSibling.textContent
            $(selection).toggleClass("favorite-movie");
            if (localStorage.getItem(`movie-${movieSelection}`) === "no-fav") {
                localStorage.setItem(`movie-${movieSelection}`, "fav")
                event.currentTarget.innerText = "Remove Favorite"
            } else {
                localStorage.setItem(`movie-${movieSelection}`, "no-fav")
                event.currentTarget.innerText = "Add to Favorites"
            }
        })
        movieTitle.appendTo(movieWrapper);
        fav.appendTo(movieWrapper);
        movieWrapper.appendTo(movieContainer);
    }
}

starWars.addImages = function () {
    var movies = $(".movie-wrapper");
    for (let i = 0; i < starWars.movies.length; i++) {
        var bg = $("<img/>");
        bg.attr("src", `./images/${starWars.movies[i].title}.jpg`);
        bg.attr("style", "height: 100px")
        movies[i].prepend(bg[0]);
    }
}
