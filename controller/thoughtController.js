// function needed createThought, getAllthoughts, GetOneThought, updateThought, deleteThought, addReaction, deleteReaction
const Thought = require("../models/Thought");

module.exports = {
  // gets all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // retrieves a single thought id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "Thought id does not exist." });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "Thoguth id does not exist." });
          return;
        }
        res.status(200).json(thought);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  },

  // deletes reactions
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: params.reactionId } },
      { new: true }
    )
      .then((thought) => {
        res.status(200).json(thought);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  },
  // create a thought
  createThought({ body }, res) {
    Thought.create(body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "User id does not exist." });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.json(err));
  },

  // delete a thought
  deleteThought({ params, query }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "Thought id does not exist." });
          return;
        }
        return User.findOneAndUpdate(
          { _id: query.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "User id does not exist." });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.json(err));
  },

  // update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "Thought id does not exist." });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
