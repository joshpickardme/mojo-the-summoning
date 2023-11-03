const {sequelize} = require('../db/config.js')
const { User } = require('./index.js')
const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')



// define in global scope
let user

// clear db and create new user before tests
beforeAll(async () => {
  await sequelize.sync({ force: true })
  user = await User.create({ username: 'gandalf' })
})

// clear db after tests
afterAll(async () => await sequelize.sync({ force: true }))

describe('User Tests', () => {
  it('has an id', async () => {
    expect(user).toHaveProperty('id')
  })

  test('username is gandalf', async () => {
    expect(user.username).toBe('gandalf')
  })

  test('can update username', async () => {
    const updateUser = await user.update({
      username: 'great-gandalf'
    })
    expect(updateUser.username).toBe('great-gandalf')
  })

  test('can delete username', async () => {
    const userToDelete = await User.findByPk(user.id)
    await userToDelete.destroy();
    const allUsers = await User.findAll()
    expect(allUsers.length).toBe(0)
  })

  /**
   * Create more tests
   * E.g. check that the username of the created user is actually gandalf
   */
})
