const client = require('../bot')
const config = require('../../config')

function getchannel(channel) {
    return new Promise((resolve, reject) => {
        const guild = client.guilds.cache.get(config.guildid)
        const channelobj = guild.channels.cache.get(channel)
        resolve(channelobj)
    })
}

module.exports = getchannel