const isTicket = require("../functions/isticket")
const createEmbed = require("../functions/embedcreator")
const config = require("../../config")
const logger = require("../../utils/logs")
async function ticketautoclosecmd(interaction) {
    if (!isTicket(interaction.channel.parentId)) return interaction.reply({content: 'This is not a ticket channel!', ephemeral: true})
    const isadmin = require("../../api/functions/isadmin")
    if (!await isadmin(interaction.user.id)) return interaction.reply({content: 'You are not allowed to use this command!', ephemeral: true})
    let embed = createEmbed('ticketsettings.autoclose.embed')

    embed.data.description = embed.data.description.replace('{ticket}', interaction.channel.toString())

    if (config.ticketsettings.autoclose.senddm) {
        const user = interaction.guild.members.cache.get(interaction.channel.topic)
        try {
            user.send({embeds: [embed]}).catch(e => {
                console.log("cant send msg")
            })
        }
        catch(e) {
            console.log("cant send msg")
        }
    }

    const message = await interaction.channel.send({embeds: [embed]})
    interaction.reply({content: 'Autoclose erfolgreich aktiviert', ephemeral: true})
    logger("Ticket Autoclose", `${interaction.user.toString()} activated autoclose for ${interaction.channel.toString()}`, "autoclose")
    const ticket_id = interaction.channel.id
    const ticket_msgid = message.id
    const timestamp = Date.now() + config.ticketsettings.autoclose.time

    const autoclose = {
        ticket_id: ticket_id,
        ticket_msgid: ticket_msgid,
        timestamp: timestamp
    }

    const fs = require('fs')
    const data = fs.readFileSync('./data/autoclose.json', 'utf8')
    const autoclose_data = JSON.parse(data)
    autoclose_data.tickets.push(autoclose)
    const json = JSON.stringify(autoclose_data)
    fs.writeFileSync('./data/autoclose.json', json, 'utf8')
}

module.exports = ticketautoclosecmd;