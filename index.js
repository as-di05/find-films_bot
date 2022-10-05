const TelegramApi = require("node-telegram-bot-api");
const config = require("./src/service/config");
const helper = require("./src/service/helper");
const kb = require("./src/keyboards");
const {
  mainOptions,
  channelsList,
  referOptions,
  findTypesOptions,
} = require("./src/options");
const mongoose = require("mongoose");
const FilmModel = require("./src/models/films.model");

async function connect() {
  try {
    await mongoose.connect(config.DB_URL, () => console.log("Connect mongodb"));
  } catch (error) {
    console.log(error);
  }
}
connect();

let film = new FilmModel({
  id_film: "2",
  film_name: "Интерстеллар",
  id_refer: 1,
});

// film.save()

const bot = new TelegramApi(config.TOKEN, { polling: true });

// const chats = {};
// const startGame = async (chatId) => {
//   await bot.sendMessage(
//     chatId,
//     "Я загадаю одну цифру от 0 до 9, а вы дожны угадать ее"
//   );
//   const randomNumber = Math.floor(Math.random() * 10);
//   chats[chatId] = randomNumber;
//   await bot.sendMessage(chatId, "Поехали!");
// };

const start = async () => {
  bot.setMyCommands([
    { command: "/start", description: "Запустить бота" },
    { command: "/info", description: "Как меня зовут?" },
    { command: "/find", description: "Найти фильм/сериал" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      helper.createNewReferal(msg);
      const refer = await helper.findRefer(msg);

      if (refer) {
        return bot.sendMessage(
          chatId,
          `Добро пожаловать в телеграм бот для поиска фильмов и сериалов!`,
          referOptions
        );
      }
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
      if (checkSubscription(chatId)) {
        await bot.sendMessage(
          chatId,
          `Введите название фильма:`
          // findTypesOptions
        );
        return findFilm();
      }
    case kb.home.info_bot:
      await bot.sendMessage(chatId, `Телеграм бот от AS_DI05 `);
      break;
    default:
      // await bot.sendMessage(chatId, `Пусто`);
      break;
  }

  switch (text) {
    case kb.referHome.add_film:
      await bot.sendMessage(chatId, `Добавление фильма `);
      break;
    case kb.referHome.my_films:
      const films = await helper.findRefersFilms(msg);

      let a = films.map((film, i) => {
        return (i > 0 ? "\n" : "") + film.id_film + " - " + film.film_name;
      });
      await bot.sendMessage(chatId, `Список ваших фильмов: \n${a}`);
      break;
    case kb.referHome.my_referals:
      bot.sendMessage(chatId, `У вас N подписчиков `);
      break;
    case kb.referHome.refer_link:
      link = helper.getReferLink(msg)
      console.log({link});
      bot.sendMessage(chatId, `Ваша ссылка для приглашения: \n\n ${link}`, );
      break;
    default:
      break;
  }
});

async function checkSubscription(chatId) {
  let pass = await bot.getChatMember("@minor_theme", chatId);
  // console.log(pass, "pass");

  if (pass.status === "creator" || pass.status === "left") {
    await bot.sendMessage(
      chatId,
      `Сначала подпишитесь на следующие каналы:`,
      channelsList
    );
  } else if (pass.status === "member") {
    return true;
  }
}

async function findFilm() {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const film = await helper.findToCodeFilms(msg);
    console.log(film, "fil");
    if (film) {
      return getInfoFilm(chatId, film);
    }
  });
}

async function getInfoFilm(chatId, film) {
  bot.sendMessage(chatId, `Название фильма: \n<b>- ${film.film_name}</b>`, {
    parse_mode: "HTML",
  });
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
  // console.log(data, "data");
  // console.log({ data });
  if (data === "check") {
    return checkSubscription(chatId);
  }
});

start();
