const User = require('../models/user');

module.exports.Profile = function(req, res) {
    return res.render('profile', {
        title: 'Profile'
    });
};

module.exports.signup = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('signup', {
        title: "SignUp"
    });
};

module.exports.signin = async function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('signin', {
        title: "SignIn"
    });
};

module.exports.create = async function(req, res) {
    if (req.body.password !== req.body.confirm_password) {
        console.log("Not matching passwords while signup");
        return res.redirect('back');
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            await User.create(req.body);
            console.log("Created User in database for signup");
            return res.redirect('/users/signin');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log("Error in finding/creating user in database", err);
        return res.redirect('back');
    }
};

module.exports.createsession = function(req, res) {
    return res.redirect('/');
};

module.exports.destroysession = function(req, res, next) {
    req.logout(req.user, err => {
        if (err) return next(err);
        res.redirect("/");
    });
};
