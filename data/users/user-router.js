const express = require('express');

const db = require('../helpers/userDb.js');

const router = express.Router();



// http request handlers

// GET --> /api/users
router.get('/', (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    })
})

// GET --> /api/users/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.getById(id)
    .then(user => {
      return !user
        ? res.status(404).json({ message: 'No user with specified ID' })
        : res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    })
})

// GET --> /api/users/:id/posts
router.get('/:id/posts', (req, res) => {
  const { id } = req.params;

  db.getUserPosts(id)
    .then(posts => {
      return !posts
        ? res.status(404).json({ message: 'Unable to retrieve posts by user with specified ID' })
        : res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    })
})

// POST --> /api/users
router.post('/', (req, res) => {
  const newUser = req.body;

  !newUser.name
    ? res.status(400).json({ message: "Pleas provide a 'name' property & value" })
    : db.insert(newUser)
      .then(user => {
        console.log(user);
        res.status(200).json(user);
      })
      .catch(err => {
        console.log(err);
        res.status(500);
      })
})

// PUT --> /api/users/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  !changes.name
    ? res.status(400).json({ message: "Pleas provide a 'name' property & value" })
    : db.update(id, changes)
      .then(user => {
        return !user
        ? res.status(404).json({ message: 'No user with specified ID' })
        : res.status(200).json(user);
      })
      .catch(err => {
        console.log(err);
        res.status(500);
      })
})

// DELETE --> /api/users/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(user => {
      return !user
        ? res.status(404).json({ message: "No user with specified ID" })
        : res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    })
})


module.exports = router;