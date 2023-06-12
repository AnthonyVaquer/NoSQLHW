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

// "/" user route
router.route('/').get(getUsers).post(createUser);

// "/:id" user route
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser)

// "/:userid/friends" user route
router.route('/:userId/friends').post(addFriend);

// "/:userid/friends/:friendId" user route
router.route('/:userId/friends/:friendId').delete(deleteFriend);




module.exports = router;
