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
    // time stamp getter
    createdAt: {
        type: Date, 
        default: Date.now,
        get: (date)=> formatTime(date) 
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

// reaction count virtual
thoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length
})


const Thought = model('thought', thoughtSchema)

module.exports = Thought;
