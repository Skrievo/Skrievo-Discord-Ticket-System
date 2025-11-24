const logger = require("../../utils/logs")
const isTicket = require("../functions/isticket")
const closeTicket = require("../functions/ticketclose")

function ticketclosecmd(interaction) {
    if (!isTicket(interaction.channel.parentId)) return interaction.reply({content: 'This is not a ticket channel!', ephemeral: true})
    closeTicket(interaction.channel.id, interaction.user.toString())
    logger()
    interaction.reply({content: 'Ticket closing!', ephemeral: true})
}

module.exports = ticketclosecmd;