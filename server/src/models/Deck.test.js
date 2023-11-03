const {sequelize} = require('../db/config.js')
const { Deck } = require('./index.js')
const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')

// name: DataTypes.STRING,
// xp: DataTypes.INTEGER,

// define in global scope
let deck

// clear db and create new user before tests
beforeAll(async () => {
  await sequelize.sync({ force: true })
  deck = await Deck.create({ name: 'deckOfCards', xp: 1500})
})

// clear db after tests
afterAll(async () => await sequelize.sync({ force: true }))

describe('Card Tests', () => {
  it('has an id', async () => {
    expect(deck).toHaveProperty('id')
  })

  test('deck name is deckOfCards', async () => {
    expect(deck.name).toBe('deckOfCards')
  })
  
  test('deck has xp of 1500', async () => {
    expect(deck.xp).toBe(1500)
  })

  test('can update deck name', async () => {
    const updateDeck = await deck.update({
      name: 'updatedDeck'
    })
    expect(deck.name).toBe('updatedDeck')
  })

  test('can delete deck', async () => {
    const deckToDelete = await Deck.findByPk(deck.id)
    await deckToDelete.destroy();
    const allDecks = await Deck.findAll()
    expect(allDecks.length).toBe(0)
  })

  /**
   * Create more tests
   * E.g. check that the username of the created user is actually gandalf
   */
})
