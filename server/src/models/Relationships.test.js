const {sequelize} = require('../db/config.js')
const { User, Deck, Card, Attack } = require('./index.js')
const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')





// clear db and create new user before tests
beforeAll(async () => {
  await sequelize.sync({ force: true })
})

// clear db after tests
afterAll(async () => await sequelize.sync({ force: true }))

describe('Associations and Relationships Tests', () => {
    it('user can have a deck and that we can get deck from user and user from deck', async () => {
        const user = await User.create({
            username: 'user1'
        })
        const deck = await user.createDeck({
            name: 'deck',
            xp: 100
        })
        const deckFromUser = await user.getDeck()
        const userFromDeck = await deck.getUser()
        expect(deckFromUser.name).toBe('deck') // Tests that we can get the deck from the user
        expect(userFromDeck.username).toBe('user1') // Tests that we can get username from the deck
    })

    it('deck can have many cards and card has one deck', async () => {
        const deck = await Deck.create({
            name: 'deckWithManyCards',
            xp: 500
        })

        const card1 = await deck.createCard({
            name: 'card1',
            mojo: 100,
            stamina: 10,
            imgUrl: 'card1-img',
        })

        const card2 = await deck.createCard({
            name: 'card2',
            mojo: 200,
            stamina: 20,
            imgUrl: 'card2-img',
        })

        const cardsInDeck = await deck.getCards()
        const getDeckFromCard = await card1.getDeck()

        expect(cardsInDeck.length).toBe(2)
        expect(getDeckFromCard.name).toBe('deckWithManyCards')

        })

    it('Attack belongs to many card and card belongs to many attack', async () => {
        const card = await Card.create({
            name: 'testCard',
            mojo: 10,
            stamina: 15,
            imgUrl: 'testCardImg'
        })

        const card2 = await Card.create({
            name: 'testCard2',
            mojo: 10,
            stamina: 15,
            imgUrl: 'testCard2Img'
        })

        const attackCard = await card.createAttack({
            title: 'Attack1',
            mojoCost: 10,
            staminaCost: 5,
        })
        card2.addAttack(attackCard.id)
        await card.createAttack({
            title: 'Attack2',
            mojoCost: 10,
            staminaCost: 5,
        })
        await card.createAttack({
            title: 'Attack3',
            mojoCost: 10,
            staminaCost: 5,
        })

        const getAttacksFromCard = await card.getAttacks()
        const getCardsFromAttack = await attackCard.getCards()
        console.log(getCardsFromAttack)
        expect(getAttacksFromCard.length).toBe(3)
        expect(getCardsFromAttack.length).toBe(2)
    })
})
