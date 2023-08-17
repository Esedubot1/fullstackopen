const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, likes: 1 })
  
  res.json(users)
})

userRouter.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = userRouter