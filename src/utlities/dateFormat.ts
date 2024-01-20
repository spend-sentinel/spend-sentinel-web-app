export const dateFormatter = (date:Date):string => {
    const prefixMonth = date.getMonth() < 10 ? '0' : '';
    const prefixDay = date.getDate() < 10 ? '0' : '';
    const year = date.getFullYear();
    const month = prefixMonth + (date.getMonth() + 1);
    const day = prefixDay + date.getDate();

    return day + '/' + month + '/' + year;
}