const { sequelize, DataTypes, Model } = require('../db/config.js')

const Deck = sequelize.define('Deck', {
        name: DataTypes.STRING,
        xp: DataTypes.INTEGER,
})

module.exports = {Deck}