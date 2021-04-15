const express = require('express')
const router = express.Router()

const gifs = require('./gifs')

router.use('/gifs', gifs)

module.exports = router