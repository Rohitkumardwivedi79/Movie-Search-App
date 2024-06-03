let button = document.getElementById("clicked");

button.addEventListener('click', async function(e) {
    var movieName = document.getElementById('movie-name').value;
    const result = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=6a4ebfb`);
    const MovieDetails = await result.json();
    showDetails(MovieDetails);
});

function showDetails(info) {
    var result = document.getElementById('result');
    if(info.Response == 'True') {
        let moviesHTML = '';
        info.Search.forEach(movie => {
            moviesHTML += `
            <div class="col-md-6 mb-3">
                <div class="movie-item p-3 border rounded d-flex flex-column flex-md-row">
                    <div class="movie-poster mr-md-6 mb-3 mb-md-0" style="height:240px; width:240px; overflow:hidden">
                        <img src="${movie.Poster}" alt="Loading..." class="img-fluid">
                    </div>
                    <div class="info flex-grow-1">
                        <div class="movie-info-1 mb-3">
                            <h2 class="movie-title h4">${movie.Title}</h2>
                            <ul class="movie-info list-unstyled">
                                <li class="year">Year: ${movie.Year}</li>
                                <li class="type">Type: ${movie.Type}</li>
                            </ul>
                        </div>
                        <div class="movie-info-2">
                            <button class="btn btn-primary details-button" data-imdbid="${movie.imdbID}">Show Details</button>
                        </div>
                    </div>
                </div>
            </div>        
            `;
        });
        result.innerHTML = moviesHTML;

        // Add event listeners to each details button
        document.querySelectorAll('.details-button').forEach(button => {
            button.addEventListener('click', async function(e) {
                const imdbID = e.target.getAttribute('data-imdbid');
                const detailedResult = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=6a4ebfb`);
                const detailedMovie = await detailedResult.json();
                showMovieDetails(detailedMovie);
            });
        });
    } else {
        result.innerHTML = `<h1>Movie Not Found!</h1>`;
    }
}

function showMovieDetails(info) {
    var result = document.getElementById('result');
    result.innerHTML = `
    <div class="container">
    <div class="row">
        <div class="col-lg-4">
            <div class="wrapper">
                <div class="movie-poster">
                    <img src="${info.Poster}" alt="Loading..." class="img-fluid">
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="info">
                <div class="movie-info-1">
                    <h2 class="movie-title mb-4">Name of a Movie: ${info.Title}</h2>
                    <ul class="list-unstyled" style="display-flex; justify-content:space-between">
                        <li><strong>Year:</strong> ${info.Year}</li>
                        <li><strong>Released:</strong> ${info.Released}</li>
                        <li><strong>Country:</strong> ${info.Country}</li>
                    </ul>
                </div>
                <div class="movie-info-2">
                    <p class="genre">
                        <strong>Genre:</strong> ${info.Genre}
                    </p>
                    <p class="runtime">
                        <strong>Movie Duration:</strong> ${info.Runtime}
                    </p>
                    <p class="actors">
                        <strong>Actors:</strong> ${info.Actors}
                    </p>
                    <p class="writers">
                        <strong>Writer:</strong> ${info.Writer}
                    </p>
                    <p class="language">
                        <strong>Language:</strong> ${info.Language}
                    </p>
                    <p class="imdbRating">
                        <strong>IMDB Rating:</strong> 
                        <span class="rating-stars" style="color: #ffa534;">
                            <span class="star" style="font-size: 1.2em;">&#9733;</span>
                            <span class="star" style="font-size: 1.2em;">&#9733;</span>
                            <span class="star" style="font-size: 1.2em;">&#9733;</span>
                            <span class="star" style="font-size: 1.2em;">&#9733;</span>
                            <span class="star" style="font-size: 1.2em;">&#9733;</span>
                        </span>
                    </p>

                    <p class="plot">
                        <strong>Plot:</strong> ${info.Plot}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
    var playlistButton = document.getElementById('add-to-playlist');

    playlistButton.innerHTML = `
    <form action="/movies/playlist" method="post">
        <input type="hidden" name="Name" value="${info.Title}">
        <label for="isPublic">Make Public:</label>
        <input type="checkbox" name="isPublic" id="isPublic">
        <input type="submit" value="Add to Playlist" id="playlist-button">
    </form> 
    `;
}


