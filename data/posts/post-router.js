const express = require('express');

const db = require('../helpers/postDb.js');

const router = express.Router();


// http request handlers

// GET --> /api/posts
router.get('/', (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    })
})

// GET --> /api/posts/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.getById(id)
    .then(post => {
      return !post
        ? res.status(404).json({ message: 'No post with specified ID' })
        : res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    })
})

// POST --> /api/posts
router.post('/', (req, res) => {
  const newPost = req.body;

  !newPost.text || !newPost.user_id
    ? res.status(400).json({ message: "Please provide valid 'text' & 'user_id' properties" })
    : db.insert(newPost)
      .then(post => {
        console.log(post);
        res.status(200).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500);
      })
})

// PUT --> /api/posts/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  !changes.text
    ? res.status(400).json({ message: "Please provide a 'text' property & value" })
    : db.update(id, changes)
      .then(post => {
        return !post
        ? res.status(404).json({ message: 'No post with specified ID' })
        : res.status(200).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500);
      })
})

// DELETE --> /api/posts/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(post => {
      return !post
        ? res.status(404).json({ message: "No post with specified ID" })
        : res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    })
})



module.exports = router;