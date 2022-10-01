const { model, Schema } = require("mongoose");

const NewFilmSchema = new Schema({
  id_film: {
    type: String,
    required: true,
  },
  film_name: {
    type: String,
    required: true,
  },
  film_picture: {
    type: String,
  },
  film_link: {
    type: String,
  },
  id_refer: {
    type: Number,
    required: true,
  },
});

module.exports = model("Film", NewFilmSchema);
