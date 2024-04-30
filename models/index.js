const User = require('./User')
const Event = require('./Event')

Event.belongsTo(User)
User.hasMany(Event)

module.exports = {
  User: User,
  Event: Event
}