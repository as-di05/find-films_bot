module.exports = {
  mainOptions: {
    reply_markup: JSON.stringify({
      keyboard: [
        [{ text: "Найти фильм/сериал", callback_data: "/find" }],
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
};
