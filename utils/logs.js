const client = require("../client/bot");
const config = require("../config");
const embedcreator = require("../client/functions/embedcreator");

function logger(title, msg, action) {
    let embed = embedcreator("logs.embed");
    embed.setTitle(title);
    embed.setDescription(msg);

    client.channels.fetch(config.logs[action]).then(channel => {
        channel.send({ embeds: [embed] });
    })
}

module.exports = logger;