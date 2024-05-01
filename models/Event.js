const { DataTypes, Model } = require('sequelize');
const client = require('../db/client')

class Event extends Model { }

Event.init(
  {
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post: {
        type: DataTypes.STRING,
        allowNull: false
      }
  },
  {
    sequelize: client,
    modelName: 'event',
    timestamps: false
  }
)

module.exports = Event