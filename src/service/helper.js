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
  const { id_refer } = refer

  const films = await FilmModel.find({ id_refer: id_refer });
  return films;
}

async function findToCodeFilms(msg) {
  const text = msg.text;
  let films = []

  console.log({ text });
  if (text.length > 0) {
    films = await FilmModel.findOne({ id_film: text });
    console.log({ films });
  }

  return films;
}

module.exports = { createNewReferal, findRefer, findRefersFilms, findToCodeFilms };
