// username:
// String
// Unique
// Required
// Trimmed

// email:
// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)


// thoughts:
// Array of _id values referencing the Thought model

// friends:
// Array of _id values referencing the User model (self-reference)


const { Schema, model } = require('mongoose');

// Schema to create Student model
const userScheme = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      max_length: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,

    },
    Thoughts: [thoughtsSchema],
    Friends: [friendsSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
