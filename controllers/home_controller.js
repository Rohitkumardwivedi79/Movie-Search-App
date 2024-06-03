const Movie = require('../models/movie');

module.exports.home = async function(req, res) {
    try {
        const movies = await Movie.find({}).populate('user').exec();
        
        // Group movies by user ID
        const groupedMovies = {};
        movies.forEach(movie => {
            const userId = movie.user.id;
            if (!groupedMovies[userId]) {
                groupedMovies[userId] = [];
            }
            groupedMovies[userId].push(movie);
        });
        
        return res.render('home', {
            title: "HomePage",
            groupedMovies: groupedMovies, // Pass grouped movies to the template
            user: req.user // Pass user information if available
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};


module.exports.playlist = async function(req, res) {
    try {
        await Movie.create({
            movie: req.body.Name,
            user: req.user._id
        });
        console.log("Saved to playlist");
        return res.redirect('back');
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports.destroy = async function(req, res) {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            await movie.remove();
            console.log("Deleted movie from Playlist");
        }
        return res.redirect('back');
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};
