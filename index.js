const TelegramApi = require("node-telegram-bot-api");
const config = require("./src/service/config");
const helper = require("./src/service/helper");
const kb = require("./src/keyboards");
const {
  mainOptions,
  channelsList,
  referOptions,
  findTypesOptions,
  adminOptions,
  addChannel,
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

const start = async () => {
  bot.setMyCommands([
    { command: "/start", description: "Запустить бота" },
    { command: "/info", description: "Как меня зовут?" },
    { command: "/find", description: "Найти фильм/сериал" },
  ]);

  bot.on("message", async (msg) => {
    const id_user = msg.from.id;
    const text = msg.text.split(" ")[0];
    const chatId = msg.chat.id;

    if (text === "/start") {
      helper.createNewReferal(msg);
      const refer = await helper.findRefer(msg);

      if (id_user == 793289094) {
        return bot.sendMessage(
          chatId,
          `Ассаламу алейкум мой господин!`,
          adminOptions
        );
      }
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
    case kb.adminHome.add_film:
      await bot.sendMessage(chatId, `Добавление фильма `);
      break;
    case kb.adminHome.my_films:
      const filmy = await helper.findRefersFilms(msg);

      let b = films.map((film, i) => {
        return (i > 0 ? "\n" : "") + film.id_film + " - " + film.film_name;
      });
      await bot.sendMessage(chatId, `Список ваших фильмов: \n${b}`);
      break;
    case kb.adminHome.my_referals:
      bot.sendMessage(chatId, `У вас N подписчиков `);
      break;
    case kb.adminHome.refer_link:
      link = await helper.getReferLink(msg);
      console.log({ link });
      bot.sendMessage(chatId, `Ваша ссылка для приглашения: \n\n ${link}`);
      break;
    case kb.adminHome.list_refers:
      const refers = await helper.refersList();

      let ref = refers.map((refer, i) => {
        return (
          (i > 0 ? "\n" : "") +
          refer.id_refer +
          " - " +
          refer.id_user +
          " " +
          refer?.name_refer
        );
      });
      await bot.sendMessage(chatId, `Список реферов: \n${ref}`);
      break;
    case kb.adminHome.all_channel:
      const allChannel = await helper.allChannel();
      let channels = allChannel.map((channel, i) => {
        return (
          (i > 0 ? "\n" : "") +
          channel.channel_name +
          " - " +
          channel.channel_link
        );
      });
      bot.sendMessage(chatId, `Все каналы: \n ${channels}`);
      break;
    case kb.adminHome.add_channel:
      await bot.sendMessage(chatId, `Введите название канала:`);
      // const nameChannel = await addNameChannel(chatId);

      await bot.sendMessage(chatId, `Введите ссылку на канал:`);
      // const linkChannel = await addLinkChannel(chatId);

      bot.sendMessage(chatId, `Сохранить канал?`, addChannel);
      bot.on("callback_query", async (msg) => {
        const data = msg.data;
        if (data === "saveChannel") {
          // const newChannel = await new addLinkChannel(chatId);
          // newChannel.save();
        }
        if (data === "otkatChannel") {
        }
      });
      break;
    default:
      break;
  }

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
      link = await helper.getReferLink(msg);
      console.log({ link });
      bot.sendMessage(chatId, `Ваша ссылка для приглашения: \n\n ${link}`);
      break;
    default:
      break;
  }
});

async function findFilm() {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const film = await helper.findToCodeFilms(msg);
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

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  // console.log(data, "data");
  // console.log({ data });
  if (data === "check") {
    return checkSubscription(chatId);
  }
});

async function addNameChannel(chatId) {
  await bot.sendMessage(chatId, `Отправьте название:`);
  let name;
  bot.on("message", async (msg) => {
    const text = msg.text;
    name = await text;
  });
  return name;
}

async function addLinkChannel(chatId) {
  await bot.sendMessage(chatId, `Отправьте ссылку:`);
  let name;
  bot.on("message", async (msg) => {
    const text = msg.text;
    name = await text;
  });
  return name;
}

async function checkSubscription(chatId) {
  let pass = await bot.getChatMember("@minor_theme", chatId);
  console.log(pass, "pass");

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

start();
