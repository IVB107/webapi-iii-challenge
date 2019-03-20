const express = require('express');

const db = require('../helpers/postDb.js');

const router = express.Router();


// http request handlers

router.get('/', (req, res) => {
  res.send(`
    <h1>
      This is the posts page. What, were you expecting more?
    </h1>
  `)
})



module.exports = router;