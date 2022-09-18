const { home } = require("./keyboards");

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
};
