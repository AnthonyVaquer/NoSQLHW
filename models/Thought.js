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
const { User } = require('./user')

// Schema to create thoughts model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        get: (date)=> date.toLocaleDateString("en-US") // getter
       },
    User: [User],
    Reaction: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
// Schema to create thoughts model
const reactionSchema = new Schema(
  {
    reactionId: {
    type: Schema.Types.ObjectId,
      required: true,

    },
    date: {
        type: Date, 
        default: Date.now,
        get: (date)=> date.toLocaleDateString("en-US") // getter
       },
    reactionBody: {
        type: string,
        required: true,
        max_length: 280,
    },
    User: [User],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
// **Reaction** (SCHEMA ONLY)

// * `reactionId`
//   * Use Mongoose's ObjectId data type
//   * Default value is set to a new ObjectId

// * `reactionBody`
//   * String
//   * Required
//   * 280 character maximum

// * `username`
//   * String
//   * Required

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

const User = model('thought', thoughtSchema);

module.exports = Thought;
