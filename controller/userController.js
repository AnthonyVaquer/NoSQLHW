// functions needed createUser, updateUser, getAllusers, getOneUser, deleteuser, addFriend, deleteFriend

const User = require("../models/User");



module.exports = {

  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // retrieves a single user by id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "User id does not exist." });
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
  },

  // update user 
  updateUser(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User id does not exist."})
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete a user and remove them from the friend's list
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "User id does not exist" });
      }

      const friends = await Friends.findOneAndUpdate(
        { user: req.params.userId },
        { $pull: { friends: req.params.userId } },
        { new: true }
      );

      if (!friends) {
        return res.status(404).json({
          message: 'User deleted',
        });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  // add a friend
  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: body.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with this id" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.json(err));
  },

// delete a friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },
};
