const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const users = []
let nextId = 1

// Get all users
router.get('/', (req, res) => {
  const result = users.map(u => removePassword(u))
  res.send(result)
})

// ADD user - POST: users/
router.post('/', async (req, res) => {
  const { userName, password } = req.body
  const user = users.find(user => user.name.trim().toLowerCase() === userName.trim().toLowerCase())
  if (user) {
    res.status(400).send({ error: "User with the same name already exists" })
  } else {
    const hashed = await bcrypt.hash(password, 10)
    const newUser = { id: nextId++, name: userName, password: hashed }
    users.push(newUser)
    res.send(removePassword(newUser))
  }
})

const removePassword = (user) => {
  const result = { ...user }
  result.password = null
  return result
}

// login
router.post('/login', async (req, res) => {
  const { userName, password } = req.body
  const user = users.find(user => user.name.trim().toLowerCase() === userName.trim().toLowerCase())
  if (!user) {
    res.status(401).send({ error: "No such user" })
  } else {
    await bcrypt.compare(password, user.password, (err, passwordsMatch) => {
      if (err || !passwordsMatch) {
        res.status(401).send({ error: "Bad password" })
      } else {
        res.send({ secret: "shhh..." })
      }
    })
  }
})
module.exports = router