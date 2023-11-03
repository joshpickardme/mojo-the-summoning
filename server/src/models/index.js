const { User } = require('./User')
const { Deck } = require('./Deck')
const { Card } = require('./Card')
const { Attack } = require('./Attack')
// import the rest of your models above

//set up the associations here

// One to One Relationship
User.hasOne(Deck)
Deck.belongsTo(User)

// One to Many Relationship
Deck.hasMany(Card)
Card.belongsTo(Deck)

// Many to Many Relationship 
Card.belongsToMany(Attack, {through: 'CardAttack'})
Attack.belongsToMany(Card, {through: 'CardAttack'})



// and then export them all below
module.exports = { User, Deck, Card, Attack }
