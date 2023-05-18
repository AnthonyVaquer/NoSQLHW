// function needed createThought, getAllthoughts, GetOneThought, updateThought, deleteThought, addReaction, deleteReaction

const app = require('express');
const router = require('express').Router()
const { createThought, getAllthoughts, GetOneThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../controller/thoughtController')

app.post('/thought/create', createThought)
app.get('/thought/thoughtall', getAllThoughts)
app.get('/thought/thoughtone', getOneThought)
app.put('/thought/thoughtone', updateThought)
app.delete('/thought/deletethought', deleteThought)
app.post('/thought/addthought', addThought)
app.post('/thought/addreaction', addReaction)
app.delete('/user/deletereaction', deleteReaction)

module.exports = router