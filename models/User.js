const { Schema, model } = require('mongoose');

// Schema to create user model
const userSchema = new Schema(
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
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

userSchema.virtual('friendCount').get(function (){
    return this.friends.length
})

const User = model('user', userSchema);

module.exports = User;
