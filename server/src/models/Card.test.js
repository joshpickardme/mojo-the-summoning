const {sequelize} = require('../db/config.js')
const { Card } = require('./index.js')
const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')

// name: DataTypes.STRING,
// mojo: DataTypes.INTEGER,
// stamina: DataTypes.INTEGER,
// imgUrl: DataTypes.STRING,

// define in global scope
let card

// clear db and create new user before tests
beforeAll(async () => {
  await sequelize.sync({ force: true })
  card = await Card.create({ name: 'theCard', mojo: 15, stamina: 20, imgUrl: 'testImgURL' })
})

// clear db after tests
afterAll(async () => await sequelize.sync({ force: true }))

describe('Card Tests', () => {
  it('has an id', async () => {
    expect(card).toHaveProperty('id')
  })

  test('cards name is theCard', async () => {
    expect(card.name).toBe('theCard')
  })
  
  test('card has mojo of 15', async () => {
    expect(card.mojo).toBe(15)
  })

  test('card has stamina of 20', async () => {
    expect(card.stamina).toBe(20)
  })

  test('card has imgUrl of testImgURL', async () => {
    expect(card.imgUrl).toBe('testImgURL')
  })

  test('can update card name', async () => {
    const updateCard = await card.update({
      name: 'updatedName'
    })
    expect(card.name).toBe('updatedName')
  })

  test('can delete card', async () => {
    const cardToDelete = await Card.findByPk(card.id)
    await cardToDelete.destroy();
    const allCards = await Card.findAll()
    expect(allCards.length).toBe(0)
  })

  /**
   * Create more tests
   * E.g. check that the username of the created user is actually gandalf
   */
})
