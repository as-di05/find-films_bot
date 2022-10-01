const { model, Schema } = require("mongoose");

const NewReferalSchema = new Schema({
  id_referal: {
    type: String,
    required: true,
  },
  id_refer: {
    type: String,
  },
});

module.exports = model("Referals", NewReferalSchema);