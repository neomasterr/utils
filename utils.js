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
export const createElement = function(html) {
    const template = document.createElement('template');
    template.insertAdjacentHTML('afterbegin', html.trim());
    return template.children.length > 1 ? [...template.children] : template.firstElementChild;
}
