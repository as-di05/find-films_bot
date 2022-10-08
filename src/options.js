const { home, referHome, findTypes, adminHome } = require("./keyboards");
const ChannelsModel = require("./models/channels.model");

// let channelsOBJ;

// async function channels() {
//   const obj = await ChannelsModel.find();
//   if (obj.length) {
//     channelsOBJ = obj.map((list) => {
//       return [{ text: list.channel_name, url: list.channel_link }];
//     });
//   }
//   return channelsOBJ;
// }

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

  adminOptions: {
    reply_markup: JSON.stringify({
      keyboard: [
        [adminHome.add_film, adminHome.my_films],
        [adminHome.list_refers, adminHome.my_referals, adminHome.refer_link],
        [adminHome.add_channel, adminHome.all_channel],
      ],
    }),
  },

  referOptions: {
    reply_markup: JSON.stringify({
      keyboard: [
        [referHome.add_film],
        [referHome.my_films, referHome.my_referals],
        [referHome.refer_link],
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
        [{ text: "@as_test_chanel", url: "https://t.me/as_test_chanel" }],
        [{ text: "Проверка", callback_data: "check" }],
      ],
    }),
  },

  addChannel: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Сохранить", callback_data: "saveChannel" }],
        [{ text: "Отмена", callback_data: "otkatChannel" }],
      ],
    }),
  },

  findTypesOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [findTypes.find_code, findTypes.find_name],
        [findTypes.btn_out],
      ],
    }),
  },
};
