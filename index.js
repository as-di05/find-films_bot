const TelegramApi = require("node-telegram-bot-api");
const kb = require("./src/keyboards");
const token = "5662298858:AAGODGPYzZPMt28ge4cAJ4UWXJvyVkAi0Bo";
const { mainOptions, channelsList } = require("./src/options");

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Я загадаю одну цифру от 0 до 9, а вы дожны угадать ее"
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, "Поехали!");
};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Запустить бота" },
    { command: "/info", description: "Как меня зовут?" },
    { command: "/find", description: "Найти фильм/сериал" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      return bot.sendMessage(
        chatId,
        `Добро пожаловать в телеграм бот для поиска фильмов и сериалов!`,
        mainOptions
      );
    }

    if (text === "/info") {
      return bot.sendMessage(chatId, `Вас зовут ${msg.from.first_name} `);
    }

    if (text === "/find") {
      //   return startGame(chatId);
      return bot.sendMessage(chatId, `Введите название фильма: `);
    }

    // return bot.sendMessage(chatId, `Я вас не понимаю!`);
  });
};

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  switch (text) {
    case kb.home.find_film:
      return checkSubscription(chatId)
      break;
    case kb.home.info_bot:
      await bot.sendMessage(chatId, `Телеграм бот от AS_DI05 `);
      break;
    default:
      // await bot.sendMessage(chatId, `Пусто`);
      break;
  }
})

async function checkSubscription(chatId) {
  let pass = await bot.getChatMember('@minor_theme', chatId)
  console.log(pass, 'pass');

  if (pass.status === 'creator' || pass.status === 'left') {
    await bot.sendMessage(chatId, `Сначала подпишитесь на следующие каналы:`, channelsList);
  } else if (pass.status === 'member') {
    await bot.sendMessage(chatId, `Ура все готово! \n Ожидайте`);
  }
}

// bot.on('new_chat_members', (msg) => {
//   // console.log(msg);
//   if (msg.new_chat_members.username === me.username) {
//     console.log('join %s(%s)', msg.chat.title, msg.chat.id);
//     channels.set(msg.chat.id);
//     saveData();
//   }
// });

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  console.log(data, "data");


  if (data === "check") {
    return checkSubscription(chatId)
  }
  // if (data == chats[chatId]) {
  //   return await bot.sendMessage(
  //     chatId,
  //     `Поздравляю! Вы правильно отгадали цифру "${data}"`,
  //     againOptions
  //   );
  // } else {
  //   return await bot.sendMessage(
  //     chatId,
  //     `К сожалению вы не угадали! \n Бот загадал цифру "${chats[chatId]}" `,
  //     againOptions
  //   );
  // }
});


start();
