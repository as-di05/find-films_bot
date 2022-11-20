const ReferModel = require("../models/refers.model");
const FilmModel = require("../models/films.model");
const ReferalsModel = require("../models/referals.model");
const ChannelsModel = require("../models/channels.model");

async function getReferLink(msg) {
  const refer = await findRefer(msg);
  const my_link = "https://t.me/proFilmsFind_bot?start=" + refer.id_refer;
  return my_link;
}

async function createNewReferal(msg) {
  const text = msg.text;
  const id_user = msg.from.id;
  const idRefer = text.split(" ")[1];
  
  if (idRefer) {
    const findUser = await ReferalsModel.find({id_referal: id_user})
    console.log({findUser});
    if (!findUser.length) {
      let a = new ReferalsModel({ id_referal: id_user, id_refer: idRefer });
      a.save()
    }
  }
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
  const refer = await findRefer(msg);
  const { id_refer } = refer;

  const films = await FilmModel.find({ id_refer: id_refer });
  return films;
}

async function findToCodeFilms(msg) {
  const text = msg.text;
  let films = [];

  if (text.length > 0) {
    films = await FilmModel.findOne({ id_film: text });
  }

  return films;
}

async function refersList() {
  const refers = await ReferModel.find();

  return refers;
}

async function allChannel() {
  const channels = await ChannelsModel.find();

  return channels;
}

async function addChannel(name, link) {
  const channels = new ChannelsModel({channel_name: name, channel_link: link});
  channels.save
  return channels;
}

module.exports = {
  getReferLink,
  createNewReferal,
  findRefer,
  findRefersFilms,
  findToCodeFilms,
  refersList,
  allChannel,
  addChannel
};
