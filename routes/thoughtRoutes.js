// function needed createThought, getAllthoughts, GetOneThought, updateThought, deleteThought, addReaction, deleteReaction

const app = require('express');
const router = require('express').Router()
const { createThought, getThoughts, getSingleThought, updateThought, deleteThought, addReaction, deleteReaction, getSingleThought } = require('../controller/thoughtController')

app.post('/thought/create', createThought)
app.get('/thought/thoughtall', getThoughts)
app.get('/thought/thoughtone', getSingleThought)
app.put('/thought/thoughtone', updateThought)
app.delete('/thought/deletethought', deleteThought)
app.post('/thought/addreaction', addReaction)
app.delete('/user/deletereaction', deleteReaction)

module.exports = router