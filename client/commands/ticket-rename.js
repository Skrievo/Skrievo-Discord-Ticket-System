const isTicket = require('../functions/isticket');
const logger = require('../../utils/logs');
async function renameTicketCmd(interaction) {
    let ticketName = interaction.options.getString('name');
    const ticket = interaction.channel;

    const isadmin = require("../../api/functions/isadmin")
    if (!await isadmin(interaction.user.id)) return interaction.reply({content: 'You are not allowed to use this command!', ephemeral: true})

    if (!isTicket(ticket.parentId)) return interaction.reply({ content: 'This is not a ticket channel!', ephemeral: true });
    
    // get current ticket name
    const oldTicketName = ticket.name;

    ticketName = oldTicketName.split('︱')[0] + '︱' + ticketName;

    ticket.setName(ticketName);

    logger("Ticket Rename", `Ticket ${ticket.name} renamed to ${ticketName}`, "rename")

    interaction.reply({ content: `Ticket renamed to ${ticketName}`, ephemeral: true });
}

module.exports = renameTicketCmd;