module.exports = {
    home: {
        find_film: 'Найти фильм/сериал',
        info_bot: 'Инфо о боте'
    },
    referHome: {
        add_film: 'Добавить фильм',
        my_films: 'Список фильмов',
        my_referals: 'Количество подписчиков'
    },
    newFilm: {
        name: { text: 'Редактировать название', callback_data: 'edit_name' },
        id_film: { text: 'Код фильма(обязательный)', callback_data: 'id_film' },
        description: { text: 'Описание', callback_data: 'description' },
        poster: { text: 'Картинка', callback_data: 'poster' },
        trailer: { text: 'Трейлер', callback_data: 'trailer' },
        save: { text: 'Сохранить', callback_data: 'save' },
        out: { text: 'назад', callback_data: 'out' },
    },
    outBack: {
        btn_out: { text: 'назад', callback_data: 'out' }
    },
    findTypes: {
        find_code: { text: 'Поиск по коду', callback_data: 'code' },
        find_name: { text: 'Поиск по названию', callback_data: 'name' },
        btn_out: { text: 'назад', callback_data: 'out' }
    },
}