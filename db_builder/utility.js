const https = require("https");

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function httpsRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let statusCode = response.statusCode;
            if(statusCode != 200) {
                reject(statusCode);
                return null;
            }
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on("end", () => {
                resolve(data);
            });
        }).on("error", reject)
    });
}

module.exports = {
    sleep,
    httpsRequest
}