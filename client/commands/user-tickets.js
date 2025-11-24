const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const config = require('../../config');
const isadmin = require('../../api/functions/isadmin');

async function ticketsendcmd(interaction) {

    // check if the user is an admin
    const isad = await isadmin(interaction.user.id);
    if (!isad) return interaction.reply({content: 'You are not an admin!', ephemeral: true})

    let user = interaction.options.getUser('user');

    let tickets = ""
    // get the tickets from the user by public/user.id/*.html
    // for each file, add a new line to tickets
    // if no tickets, tickets = "No tickets found"
    //
    let baseurl = config.server.https ? `https://${config.server.ip}` : `http://${config.server.ip}`
    baseurl = config.server.port != 443 && config.server.port != 80 ? `${baseurl}:${config.server.port}` : baseurl

    baseurl = `${baseurl}/transcript/${user.id}/`

    if (!fs.existsSync(`./public/${user.id}`)) {
        tickets = "No tickets found"
    } else {
        const files = fs.readdirSync(`./public/${user.id}`);
        files.forEach(file => {
            // add the file with the base url but without the .html
            // get the content between the title tag
            let tag = fs.readFileSync(`./public/${user.id}/${file}`, 'utf8').split('<title>')[1].split('</title>')[0]
            tickets += `[${tag}](${baseurl}${file.replace('.html', '')})\n`
            // tickets += `[${file}](${baseurl}${file.replace('.html', '')})\n`
        })
    }

    let embed = new EmbedBuilder()
        .setColor(config.bot.color)
        .setTitle("User Tickets")
        .setDescription(tickets)
        .setTimestamp()
    
    interaction.reply({content: 'Here are all Tickets from ' + user.toString(), embeds: [embed], ephemeral: true})
}

module.exports = ticketsendcmd;