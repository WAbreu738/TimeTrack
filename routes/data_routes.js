const router = require('express').Router()
const { User, Event } = require('../models')



//Register user
router.post('/register', async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body


    //Create a user in the databse
    const newUser = await User.create(({
      email,
      password,
      first_name,
      last_name
    }))
    console.log(req.session)
    req.session.user_id = newUser.user_id
    res.redirect('/events')
  } catch (err) {
    console.log(err)

    res.redirect('/register')
  }
})

//Login a User
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } })

    // If user not found or password doesn't match, return error
    if (!user || !user.validatePass(password)) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    req.session.user_id = user.user_id
  
    res.redirect('/events')

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' })
  }
})

// Logout route to destroy session
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      res.sendStatus(500)
    } else {
      res.redirect('/login')
    }
  })
})


// Create a POST route to create an event
router.post('/events', async (req, res) => {
  try {
    const { year, title, post } = req.body;

    // Create a new event in the database
    const newEvent = await Event.create({
      year,
      title,
      post,
      user_id: req.session.user_id
    });

    

  } catch (err) {
    console.log(err)

    const errors = err.errors.map(eObj => {
      return {
        message: eObj.message
      }
    })

    res.status(403).json({
      message: 'Validation Error',
      errors: errors
    })
  }
})


module.exports = router

