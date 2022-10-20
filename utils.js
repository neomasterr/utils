/**
 * Получение датасета элемента
 * @param  {HTMLElement} $element Элемент
 * @return {Object}
 */
export const getElementDataset = ($element) => {
    const dataset = Object.assign({}, $element.dataset);

    for (let key in dataset) {
        let value = dataset[key];

        switch (value.toLowerCase().trim()) {
            case 'true':
            case 'yes':
            case 'on':
            case '1':
            case '':
                value = true;
                break;
            case 'false':
            case 'off':
            case 'no':
            case '0':
                value = false;
                break;
        }

        dataset[key] = value;

        const keyParts = key.replace(/([A-Z])/, '-$1').toLowerCase().split('-');
        if (keyParts.length > 1) {
            let tmp = dataset;
            keyParts.forEach((nk, index, arr) => {
                tmp = tmp[nk] = tmp[nk] || ((index == arr.length - 1) ? value : {});
            });
            delete dataset[key];
        }
    }

    return dataset;
}

/**
 * Создание элемента из строки
 * @param  {String} html      HTML валидный текст
 * @return {HTMLElement|Array} Элемент или Массив
 */
export const createElement = (html) => {
    const template = document.createElement('template');
    template.insertAdjacentHTML('afterbegin', html.trim());
    return template.children.length > 1 ? [...template.children] : template.firstElementChild;
}

/**
 * Продолжительность выполнения анимации
 * @param  {Element} $el  Проверяемый элемент
 * @param  {String}  name Имя анимируемого свойства
 * @return {Number}       Время анимации в милисекундах
 */
export const getTransitionDuration = ($el, name) => {
    const transition = (window.getComputedStyle($el).transition || 'all 0s ease 0s').split(',').map(s => s.trim()).reduce((acc, item) => {
        const [property, duration, timingFunction, delay] = item.split(' ');

        acc[property] = {
            duration: parseFloat(duration) * 1000,
            timingFunction,
            delay: parseFloat(delay) * 1000,
        }

        return acc;
    }, {});

    // имя не передано = любой самый долгий переход
    if (typeof name == 'undefined') {
        const timings = [];
        for (const key in transition) {
            timings.push(transition[key].duration + transition[key].delay);
        }
        return Math.max.apply(null, timings);
    }

    // имя передано = поиск по имени либо "все"
    if (transition[name]) {
        return transition[name].duration + transition[name].delay;
    } else if (transition['all']) {
        return transition['all'].duration + transition['all'].delay;
    }

    return 0;
},
