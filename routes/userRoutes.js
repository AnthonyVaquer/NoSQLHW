// functions needed createUser, updateUser, getAllusers, getOneUser, deleteuser, addFriend, deleteFriend

const app = require('express');
const router = require('express').Router()
const { createUser, updateUser, getAllUsers, getOneUser, deleteUser, addFriend, deleteFriend } = require('../controller/userController')

app.post('/user/create', createUser)
app.put('/user/edit', updateUsers)
app.get('/user/getAll', getAllUsers)
app.get('/user/getOne', getOneUsers)
app.delete('/user/deleteUser', deleteUser)
app.post('/user/addFriend', addFriend)
app.delete('/user/deleteFriend', deleteFriend)

module.exports = router