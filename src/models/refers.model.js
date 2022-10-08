const { model, Schema } = require("mongoose");

const NewRefersSchema = new Schema({
  id_refer: {
    type: Number,
    required: true,
  },
  id_user: {
    type: Number,
    required: true,
  },
  name_refer: {
    type: String,
  }
});

module.exports = model("Refer", NewRefersSchema);
