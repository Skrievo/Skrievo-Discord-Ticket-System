const isTicket = require("../functions/isticket")
const logger = require('../../utils/logs');
const isadmin = require("../../api/functions/isadmin")

async function ticketaddcmd(interaction) {
    const user = interaction.options.getMentionable('user');
    const ad = await isadmin(interaction.user.id)
    if (!ad) return interaction.reply({content: 'You are not allowed to use this command!', ephemeral: true})
    if (!user) return interaction.reply({content: 'Please specify a user or role!', ephemeral: true})
    const parent = interaction.channel.parentId
    if (isTicket(parent)) {
        interaction.channel.permissionOverwrites.create(user, {
            ViewChannel: true,
            SendMessages: true,
            ReadMessageHistory: true,
            AttachFiles: true
        })

        logger("Ticket Add", `${interaction.user.toString()} added ${user.toString()} to the ticket ${interaction.channel.toString()}`, "add")

        interaction.reply({content: 'Added ' + user.toString() + ' to ' + interaction.channel.toString() + '!', ephemeral: true})

    } else {
        return interaction.reply({content: 'This is not a ticket channel!', ephemeral: true})
    }
}

module.exports = ticketaddcmd;