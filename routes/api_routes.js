const router = require('express').Router()
const { User, Event } = require('../models')

function isAuthenticated(req, res, next) {
  console.log(req.session)

  if (!req.session.user_id) {
    return res.redirect('/register')
  }

  next()
}


function handleValidationError(err, res) {
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

// View route
router.get('/', (req, res) => {
  res.render('home'); 
});


router.get('/about', (req, res) => {
  res.render('about');
});


// View route
router.get('/register', (req, res) => {
  res.render('register'); 
});

router.get('/login', (req, res) => {
  res.render('login');
});

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

  res.redirect('/auth/register')
}
})

router.get('/main', (req, res) => {
  res.render('main'); 
});



//view route
router.get('/events', isAuthenticated, (req, res) => {
  console.log(req.session)
  console.log(req.session.user_id)
  res.render('events'); 
});

// Create a POST route to create an event
router.get('/events', isAuthenticated, async (req, res) => {

  const events = await Event.findAll({
      where: {
          user_id: req.session.user_id
      }
  })
  res.render('events', { events: events.map(eobj => eobj.get({ plain: true })) });

});

module.exports = router

// // Create a PUT route to update an event's information
// router.put('/events/:id', async (req, res) => {
//     const { id } = req.params;
//     const newData = req.body;
    
//     try {
//       const event = await Event.findByPk(id);
  
//       if (!event) {
//         return res.json({ message: 'Event not found.' });
//       }
  
//       await event.update(newData);
  
//       res.json(event);
//     } catch (err) {
//       handleValidationError(err, res);
//     }
//   });


// // Create a DELETE route to remove an event
// router.delete('/events/:id', async (req, res) => {
//     try {
//       const id = req.params.id;
  
//       await Event.destroy({
//         where: {
//           event_id: id
//         }
//       });
  
//       res.json({
//         message: 'Event deleted successfully!'
//       });
//     } catch (err) {
//       handleValidationError(err, res);
//     }
//   });
