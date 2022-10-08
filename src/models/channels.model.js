const { model, Schema } = require("mongoose");

const NewChannel = new Schema({
  channel_name: {
    type: String,
    required: true,
  },
  channel_link: {
    type: String,
    required: true,
  }
});

module.exports = model("Channel", NewChannel);
