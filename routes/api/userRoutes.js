const router = require("express").Router();
const {
  createUser,
  updateUser,
  getUsers,
  getSingleUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controller/userController");

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser)

router.route('/:userId/friends').post(addFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);




module.exports = router;
