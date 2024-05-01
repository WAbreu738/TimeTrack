const User = require('./User')
const Event = require('./Event')

Event.belongsTo(User, { foreignKey: "user_id" })
User.hasMany(Event, { foreignKey: "user_id "})

module.exports = {
  User: User,
  Event: Event
}

