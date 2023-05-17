// **Thought**:

// * `thoughtText`
//   * String
//   * Required
//   * Must be between 1 and 280 characters

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

// * `username` (The user that created this thought)
//   * String
//   * Required

// * `reactions` (These are like replies)
//   * Array of nested documents created with the `reactionSchema`

const { Schema, model } = require('mongoose');

// Schema to create thoughts model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      Date: true,
      required: true,
      unique: true,

    },
    username: {
        type: String,
        required: true,
    }
    User: [userSchema],
    Reaction: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('thought', thoughtSchema);

module.exports = Thought;
