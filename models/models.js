const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
},
{
    sequelize,
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updateTimestamp',
  },)

const Collection = sequelize.define('collection', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    published: {type: DataTypes.BOOLEAN, defaultValue: false},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: true},
    img: {type: DataTypes.STRING, allowNull: true},
    views: {type: DataTypes.INTEGER, defaultValue: 0},
    likes: {type: DataTypes.INTEGER, defaultValue: 0}
},
{
    sequelize,
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updateTimestamp',
  },)

const Movie = sequelize.define('movie', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
})


User.hasMany(Collection)
Collection.belongsTo(User)

Collection.hasMany(Movie)
Movie.belongsTo(Collection)


module.exports = {
    User,
    Collection,
    Movie
}