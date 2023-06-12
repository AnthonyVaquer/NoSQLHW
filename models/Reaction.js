const { Schema, model } = require('mongoose');
const formatTime = require('../utils/dateFormat')

// Schema to create reactions model
const reactionSchema = new Schema(
    {
      reactionId: {
      type: Schema.Types.ObjectId,
        required: true,
  
      },
      reactionBody: {
          type: String,
          required: true,
          max_length: 280,
      },
      username: {
        type: String,
        required: true,
      },
      // time stamp getter
      createdAt: {
          type: Date, 
          default: Date.now,
          get: (date)=> formatTime(date)
         },
  
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );

  module.exports = reactionSchema