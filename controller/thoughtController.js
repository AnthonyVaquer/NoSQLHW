// function needed createThought, getAllthoughts, GetOneThought, updateThought, deleteThought, addReaction, deleteReaction
const Thought = require("../models/Thought");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thoguth with this ID" });
          return;
        }
        res.status(200).json(thought);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  },
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
  // Create a thought
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
          res.status(404).json({ message: "No User with this ID" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.json(err));
  },

  // Delete a thought
  deleteThought({ params, query }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thoughts found with that id!" });
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
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.json(err));
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
