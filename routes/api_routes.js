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


// Create a GET route to get all user and attach their associated event
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      include: Event
    })

    res.json(users)
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server error. Please try again.'
    })
  }
})


// Create a GET route to get a single user by ID and attach their associated events
router.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findByPk(id, {
      include: Event
    })

    if (!user) {
      return res.json({
        message: 'No user found with that ID.'
      })
    }

    res.json(player)
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server error. Please try again.'
    })
  }
})


// Create a POST route to create an event
router.post('/events', async (req, res) => {
    try {
      const newEvent = await Event.create(req.body);
  
      res.json(newEvent);
    } catch (err) {
      handleValidationError(err, res);
    }
  });


// Create a PUT route to update an event's information
router.put('/events/:id', async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    
    try {
      const event = await Event.findByPk(id);
  
      if (!event) {
        return res.json({ message: 'Event not found.' });
      }
  
      await event.update(newData);
  
      res.json(event);
    } catch (err) {
      handleValidationError(err, res);
    }
  });


// Create a DELETE route to remove an event
router.delete('/events/:id', async (req, res) => {
    try {
      const id = req.params.id;
  
      await Event.destroy({
        where: {
          event_id: id
        }
      });
  
      res.json({
        message: 'Event deleted successfully!'
      });
    } catch (err) {
      handleValidationError(err, res);
    }
  });

module.exports = router