// functions needed createUser, updateUser, getAllusers, getOneUser, deleteuser, addFriend, deleteFriend

const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Delete a user and remove them from the friend's list
// async deleteUser(req, res) {
//   try {
//     const user = await User.findOneAndRemove({ _id: req.params.userId });

//     if (!user) {
//       return res.status(404).json({ message: 'This user does not exist' })
//     }

//     const friends = await Friends.findOneAndUpdate(
//       { user: req.params.userId },
//       { $pull: { friends: req.params.userId } },
//       { new: true }
//     );

//     if (!course) {
//       return res.status(404).json({
//         message: 'User deleted',
//       });
//     }

//     res.json({ message: 'User successfully deleted' });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// }
};

