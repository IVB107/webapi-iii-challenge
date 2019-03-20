const express = require('express');

const db = require('../helpers/userDb.js');

const router = express.Router();



// http request handlers

router.get('/', (req, res) => {
  res.send(`
    <div>
      <h1>This is the users page...</h1>
      <h6>...crickets...</h6>
    </div>
  `)
})



module.exports = router;