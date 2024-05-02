const router = require('express').Router()
const { Event } = require('../models')

function isAuthenticated(req, res, next) {
    console.log(req.session)

    if (!req.session.user_id) {
        return res.redirect('/login')
    }

    next()
}

// Show homepage
router.get('/home', (req, res) => {
    res.render('home');
});

// Show about
router.get('/about', (req, res) => {
    res.render('about');
});

// Show register page
router.get('/register', (req, res) => {
    res.render('register');
});

//Show login page
router.get('/login', (req, res) => {
    res.render('login');
});

//Show user's timeline page
router.get('/events', isAuthenticated, async (req, res) => {

    const events = await Event.findAll({
        where: {
            user_id: req.session.user_id
        }
    })
    res.render('events', { events: events.map(eobj => eobj.get({ plain: true })) });

});

module.exports = router