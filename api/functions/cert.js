const config = require('../../config');
const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');

function checkCert() {
    if (config.server.https) {
        if (config.server.ip.match(/^[0-9.]+$/)) {
            console.log("Please enter a domain instead of ip address for HTTPS or disable it in the config");
            process.exit(1);
        } else if (!fs.existsSync('./certs/key.pem') || !fs.existsSync('./certs/cert.pem')) {
            console.error("HTTPS is enabled but no certificates were found!");
            // check if config.settings.server.ip is an ip address or domain
            if (certs) {
                console.log("Requesting certificates...");
                const firststart = require('../../utils/func/firststart');
                firststart();
                return app
            } else {
                console.log("Certificates cant be found!")
                process.exit(1);
            }
        } else {
            return https.createServer({
                key: fs.readFileSync('./certs/key.pem'),
                cert: fs.readFileSync('./certs/cert.pem')
            }, app);
        }
    } else {
        // check if config.settings.server.ip is an ip address or domain
        if (!config.server.ip.match(/^[0-9.]+$/)) {
            console.log("Please enter an ip address instead of domain for HTTP or enable HTTPS in the config");
            process.exit(1);
        }
        return app;
    }
}

module.exports = { checkCert, app};