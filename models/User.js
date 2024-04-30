const { DataTypes, Model } = require('sequelize');
const client = require('../db/client')
const { hash, compare } = require('bcrypt')

class User extends Model {
  async validatePass(formPassword) {
    const is_valid = await compare(formPassword, this.password)

    return is_valid
  }

  toJSON() {
    const user = Object.assign({}, this.get())

    delete user.password

    return user
  }
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
        args: true,
        msg: 'You must provide a valid email string'
        }
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: 6
      },
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: client,
    modelName: 'user',
    hooks: {
      async beforeCreate(user) {
        user.password = await hash(user.password, 10)
      }
    },
    // Do not include createdAt and updatedAt fields
    timestamps: false
  }
)

module.exports = User