
const router = require('express').Router()
const { createThought, getThoughts, getSingleThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controller/thoughtController')



module.exports = router