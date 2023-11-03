const {sequelize} = require('../db/config.js')
const { Attack } = require('./index.js')
const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')

// title: DataTypes.STRING,
// mojoCost: DataTypes.INTEGER,
// staminaCost: DataTypes.INTEGER,

// define in global scope
let attack

// clear db and create new user before tests
beforeAll(async () => {
  await sequelize.sync({ force: true })
  attack = await Attack.create({ title: 'rhino', mojoCost: 5, staminaCost: 3 })
})

// clear db after tests
afterAll(async () => await sequelize.sync({ force: true }))

describe('Attack Tests', () => {
  it('has an id', async () => {
    expect(attack).toHaveProperty('id')
  })

  test('attack title is rhino', async () => {
    expect(attack.title).toBe('rhino')
  })
  
  test('attack has mojo cost of 5', async () => {
    expect(attack.mojoCost).toBe(5)
  })

  test('attack has stamina cost of 3', async () => {
    expect(attack.staminaCost).toBe(3)
  })

  test('can update attack title', async () => {
    const updateAttack = await attack.update({
      title: 'updatedAttack'
    })
    expect(attack.title).toBe('updatedAttack')
  })

  test('can delete attack', async () => {
    const attackToDelete = await Attack.findByPk(attack.id)
    await attackToDelete.destroy();
    const allAttacks = await Attack.findAll()
    expect(allAttacks.length).toBe(0)
  })

  /**
   * Create more tests
   * E.g. check that the username of the created user is actually gandalf
   */
})
