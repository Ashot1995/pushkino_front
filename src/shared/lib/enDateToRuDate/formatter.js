export function formatterDateEnToRu(date, options) {
    const enDates = date.split(' - ');
    const dates = enDates.map(date => new Date(date));
    const ruDates = dates.map(date => (Intl.DateTimeFormat('ru-RU', options).format(date)));

    return ruDates.join(' - ');
}
