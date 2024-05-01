const router = require('express').Router()
const { User, Event } = require('../models')

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

router.get('/test', (req, res) => {
  res.send('route works!')
})

// View route
router.get('/auth/register', (req, res) => {
  res.render('register'); 
});

//Register user
router.post('/auth/register', async (req, res) => {
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

//view route
router.get('/events', (req, res) => {
  console.log(req.session)
  console.log(req.session.user_id)
  res.render('events'); 
});

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
    handleValidationError(err, res);
  }
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
