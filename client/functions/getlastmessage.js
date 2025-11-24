const client = require('../bot')
const config = require('../../config')
function getlastmessage(channel) {
    return new Promise((resolve, reject) => {
        const guild = client.guilds.cache.get(config.guildid)
        const channelobj = guild.channels.cache.get(channel)
        channelobj.messages.fetch({ limit: 1 }).then(messages => {
            resolve(messages.first())
        })
    })
}

module.exports = getlastmessage