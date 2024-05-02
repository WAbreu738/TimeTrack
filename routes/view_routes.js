const router = require('express').Router()
const { Event, User } = require('../models')

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
    try {
        const events = await Event.findAll({
            where: {
                user_id: req.session.user_id
            },
            order: [['year', 'ASC']] // Order events by year in ascending order
        })

        const user = await User.findOne({
            where: {
                user_id: req.session.user_id
            }
        })

        res.render('events', { 
            events: events.map(eobj => eobj.get({ plain: true })),
            firstName: user.first_name,
            lastName: user.last_name
         })

    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router