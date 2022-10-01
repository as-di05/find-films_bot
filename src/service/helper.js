const ReferModel = require("../models/refers.model");
const FilmModel = require("../models/films.model");

async function createNewReferal(msg) {
  const text = msg.text;
  const idRefer = text.split(" ")[1];
  console.log({ msg, idRefer });
}

async function findRefer(msg) {
  const text = msg.text;
  const id_user = msg.from.id;
  const refer = await ReferModel.findOne({ id_user: id_user });
  return refer;
}

async function findRefersFilms(msg) {
    const text = msg.text;
    const id_user = msg.from.id_refer;
    const refer = await findRefer(msg)
    const {id_refer} = refer

    const films = await FilmModel.findOne({ id_refer: id_refer });
    return films;
  }

module.exports = { createNewReferal, findRefer, findRefersFilms };
