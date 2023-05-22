const router = require("express").Router();
const {
  createUser,
//   updateUser,
  getUsers,
  getSingleUser,
//   deleteUser,
//   addFriend,
//   deleteFriend,
} = require("../../controller/userController");

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser)



module.exports = router;
