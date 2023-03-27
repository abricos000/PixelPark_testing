export const timeConverter = (UNIX_timestamp: number) => {
    let a = new Date(UNIX_timestamp * 1000);
    let year = a.getFullYear();
    let month = a.getMonth() + 1 < 10 ? '0' + (a.getMonth() + 1) :a.getMonth() + 1;
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    let sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    let time = date + '.' + month + '.' + year + ' in ' + hour + ':' + min + ':' + sec ;
    return time;
}
