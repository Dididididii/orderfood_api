const express = require('express')
const router = express.Router()

router.get('/user', (req, res) => {
  console.log(1)
})

module.exports = router
