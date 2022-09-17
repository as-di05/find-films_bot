const TelegramApi = require("node-telegram-bot-api");
const token = "5662298858:AAGODGPYzZPMt28ge4cAJ4UWXJvyVkAi0Bo";
const { mainOptions } = require("./src/options");

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
    console.log({ msg });
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

    return bot.sendMessage(chatId, `Я вас не понимаю!`);
  });
};

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  console.log(data, "data");
  //   if (data === "/again") {
  //     return startGame(chatId);
  //   }
  //   if (data == chats[chatId]) {
  //     return await bot.sendMessage(
  //       chatId,
  //       `Поздравляю! Вы правильно отгадали цифру "${data}"`,
  //       againOptions
  //     );
  //   } else {
  //     return await bot.sendMessage(
  //       chatId,
  //       `К сожалению вы не угадали! \n Бот загадал цифру "${chats[chatId]}" `,
  //       againOptions
  //     );
  //   }
});

bot
  .getChatMember(() => {
    console.log(msg, "");
    console.log(data, "data");
    if (data.status != "administrator") isAdmin = 0;
  })
  .catch(function (e) {
    if (err.message.indexOf("CHAT_ADMIN_REQUIRED") != -1) isAdmin = 0;
  });

start();
