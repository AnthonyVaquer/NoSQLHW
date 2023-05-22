const { Schema, model } = require('mongoose');
const formatTime = require('../utils/dateFormat')
const reactionSchema = require('./Reaction')

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
        get: (date)=> formatTime(date) // getter
       },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
        getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// create your virtual here
thoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length
})


const Thought = model('thought', thoughtSchema)

module.exports = Thought;
