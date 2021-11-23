const ReadCookie = (cookieName: string) => {
    const cookies = decodeURI(document.cookie).split(";");
    const cookie = cookies.find(el => el.includes(cookieName));
    return cookie ?
        JSON.parse(decodeURI(cookie).replaceAll("%3A", ":").replaceAll("%2C", ",").split("=")[1].slice(2)) :
        false
}

export default ReadCookie;