const fetch = require('axios');
const generateTime = () => {
    const maxTime = 30
    const time = Math.floor(Math.random() * maxTime) * 1000
    if (time < 10000) {
        return 10000
    } else {
        return time
    }
}
const process = () => {
    try {
        const time = generateTime()
        console.log(`Request information within time : ${time / 1000} seconds`);
        const running = setInterval(async() => {
            const json = require("./data/url.json")
            const request = json.data.map((element) => {
                return fetch(element.url)
            })
            const respone = await (await Promise.all(request)).map((m) => {
                return {
                    statusText: m.statusText,
                    statusCode: m.status,
                    host: m.request.host
                }
            })
            console.log("respone", respone);
            clearInterval(running)
            process()
        }, time)
    } catch (error) {
        console.error(error)
    }

}
process()