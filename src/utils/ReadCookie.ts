const ReadCookie = (cookieName: string) => {
    const cookies = decodeURI(document.cookie).split(";");
    const cookie = cookies.find(el => el.includes(cookieName));
    if(cookie)
        console.log(decodeURI(cookie))
    return cookie ? 
        JSON.parse(decodeURI(cookie).replaceAll("%3A", ":").replaceAll("%2C", ",").split("=")[1]) :
        false
}

export default ReadCookie;