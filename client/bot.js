const Discord = require('discord.js');
const client = new Discord.Client({
    autoReconnect: true,
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
    ]
});

client.once('ready', () => {
    console.log('Discord Client started 🗸');
    console.log('Discord Client Informations:')
    console.table([{Name: client.user.username, Tag: client.user.discriminator, ID: client.user.id}]);
    console.log('Discord Client Guilds:')
    console.table(client.guilds.cache.map(guild => {
        return {
            Name: guild.name,
            ID: guild.id,
            Members: guild.memberCount
        }
    }));
    require('./handler/presence');
    require('./functions/commandcreator');
    require('./handler/commands');
    require('./handler/tickets')
    require('./handler/autoclose')
})

console.log("Starting Discord Client ...")

client.login(require("dotenv").config().parsed.TOKEN);

module.exports = client;