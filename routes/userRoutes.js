// functions needed createUser, updateUser, getAllusers, getOneUser, deleteuser, addFriend, deleteFriend

const app = require('express');
const router = require('express').Router()
const { createUser, updateUser, getUsers, getSingleUser, deleteUser, addFriend, deleteFriend } = require('../controller/userController')

app.post('/user/create', createUser)
app.put('/user/edit', updateUsers)
app.get('/user/getAll', getUsers)
app.get('/user', getSingleUser)
app.delete('/user/deleteUser', deleteUser)
app.post('/user/addFriend', addFriend)
app.delete('/user/deleteFriend', deleteFriend)

module.exports = router