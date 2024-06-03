const Movie = require('../models/movie');

module.exports.playlist = async function(req, res) {
    try {
        await Movie.create({
            movie: req.body.Name,
            user: req.user._id,
            isPublic: req.body.isPublic ? true : false
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
            await Movie.findByIdAndDelete(req.params.id);
            console.log("Deleted movie from Playlist");
        } else {
            console.log("Movie not found");
        }
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return res.redirect('back'); // Handle the error appropriately
    }
}
