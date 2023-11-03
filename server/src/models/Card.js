const { sequelize, DataTypes, Model } = require('../db/config.js')

const Card = sequelize.define('Card', {
    name: DataTypes.STRING,
    mojo: DataTypes.INTEGER,
    stamina: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
})


module.exports = { Card }