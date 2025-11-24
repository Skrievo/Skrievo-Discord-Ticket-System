const config = require('../config');
const http = require('http');
const etoken = require("dotenv").config().parsed.WEBHOOK;
const ctoken = require("dotenv").config().parsed.TOKEN;
const axios = require("axios");
const fs = require('fs')
require("dotenv").config();

console.log('Authorizing Ticket Bot ...')

// get the root path of the bot
const botname = process.cwd().split("/").pop();

// axios.post("https://bots.bitshift.dev/v2/authorize/" + botname).then((res) => {
//     const data = fs.readFileSync('./data/cache.json', 'utf8')
//     const cache = JSON.parse(data)

//     // get the newst cache object and set it to true
//     const latest = Object.keys(cache).pop()
//     cache[latest] = true

//     // write the new cache to the file
//     fs.writeFileSync('./data/cache.json', JSON.stringify(cache, null, 4))

//     if (res.data.status == "success") {
//         require('./heartbeat')
//         console.log(res.data.msg)

//         console.log("Starting Endpoint ...")

        // start http server and if error is port is already in use, exit

        if (!config.ticketsettings.transcript.saveindc) {
            const server = http.createServer().listen(config.server.port);
            server.on('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    console.error("Port " + config.server.port + " is already in use ✗");
                    process.exit(1);
                } else {
                    console.error(err);
                    process.exit(1);
                }
            });
            server.close();
            require('../api/server')
        }



//         // Check if oauth2 redirct url is added to discord developer portal by making api call to discord

//         if (!etoken) {
//             console.error("Webhook token is not set in .env file");
//             process.exit(1);
//         } else {
//             // axios request to check if webhook is valid
//             const axios = require("axios");
//             axios.get(etoken).then((res) => {
//                 if (res.status == 401) {
//                     console.error("Webhook token is not valid");
//                     process.exit(1);
//                 }
//             }).catch((err) => {
//                 console.error("Webhook token is not valid! Please check your .env file");
//                 process.exit(1);
//             })
//         }

        if (!ctoken) {
            console.error("Bot token is not set in .env file");
            process.exit(1);
        }

        require('../client/bot')

//     } else {
//         console.error(res.data.msg)
//         process.exit(1);
//     }
// }).catch((err) => {
//     console.error(err.response.data.msg)
//     process.exit(1);
// })