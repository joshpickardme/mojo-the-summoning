// create your User model here

const { sequelize, DataTypes, Model} = require('../db/config.js')


const User = sequelize.define('User', {
    username: DataTypes.STRING
})



module.exports = {User}
