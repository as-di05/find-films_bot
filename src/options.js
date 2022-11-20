const { home, referHome, findTypes, outBack, newFilm } = require("./keyboards");

module.exports = {
  mainOptions: {
    reply_markup: JSON.stringify({
      keyboard: [
        [home.find_film],
        [
          { text: "Проверка", callback_data: 4 },
          { text: "Тест", callback_data: 5 },
        ],
        [home.info_bot],
      ],
    }),
  },

  referOptions: {
    reply_markup: JSON.stringify({
      keyboard: [
        [referHome.add_film],
        [referHome.my_films, referHome.my_referals],
      ],
    }),
  },

  outOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [outBack.btn_out],
      ],
    }),
  },

  newFilmOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [newFilm.name],
        [newFilm.id_film],
        [newFilm.description],
        [newFilm.poster],
        [newFilm.trailer],
        [newFilm.out, newFilm.save],
      ],
    }),
  },

  mainInlineOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Найти фильм/сериал", callback_data: "new_chat_members" }],
        [
          { text: "Проверка", callback_data: 4 },
          { text: "Тест", callback_data: 5 },
        ],
        [{ text: "Инфо о боте", callback_data: 0 }],
      ],
    }),
  },

  againOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Попробовать еще раз", callback_data: "/again" }],
      ],
    }),
  },

  channelsList: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "@minor_theme", url: "https://t.me/minor_theme" }],
        [{ text: "Проверка", callback_data: "check" }],
      ],
    }),
  },

  findTypesOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [findTypes.find_code, findTypes.find_name],
        [findTypes.btn_out]
      ],
    }),
  },
};
