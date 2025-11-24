const isTicket = require("../functions/isticket")
const logger = require('../../utils/logs');
const isadmin = require("../../api/functions/isadmin")

async function ticketremovecmd(interaction) {
    const user = interaction.options.getMentionable('user');
    const ad = await isadmin(interaction.user.id)
    if (!ad) return interaction.reply({content: 'You are not allowed to use this command!', ephemeral: true})
    if (!user) return interaction.reply({content: 'Please specify a user or role!', ephemeral: true})

    const parent = interaction.channel.parentId
    if (isTicket(parent)) {
        interaction.channel.permissionOverwrites.delete(user)

        logger("Ticket Remove", `${interaction.user.toString()} removed ${user.toString()} from the ticket ${interaction.channel.toString()}`, "remove")

        interaction.reply({content: 'Removed ' + user.toString() + ' from ' + interaction.channel.toString() + '!', ephemeral: true})
    } else {
        return interaction.reply({content: 'This is not a ticket channel!', ephemeral: true})
    }
}

module.exports = ticketremovecmd;