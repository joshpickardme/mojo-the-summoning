const { sequelize, DataTypes, Model} = require('../db/config.js')

const Attack = sequelize.define('Attack', {
    title: DataTypes.STRING,
    mojoCost: DataTypes.INTEGER,
    staminaCost: DataTypes.INTEGER,
})


module.exports = {Attack}