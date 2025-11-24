const config = require('../../config')
const client = require('../bot')
const Discord = require('discord.js');
let i = 0
let j = config.bot.activitys.length - 1

// client.user.setAvatar(config.settings.avatar)
// client.user.setUsername(config.settings.name)
// change status every 10 minutes
setInterval(() => {
    const activity = config.bot.activitys[i]
    client.user.setPresence({
        activities: [{
            name: activity.name,
            type: Discord.ActivityType[activity.type]
        }],
        status: activity.status
    });
    i++
    if (i > j) i = 0
}, config.bot.intervall);