const createEmbed = require('../functions/embedcreator');
const createComponent = require('../functions/componentcreator');

async function ticketsendcmd(interaction) {
    const isadmin = require("../../api/functions/isadmin")
    if (!await isadmin(interaction.user.id)) return interaction.reply({content: 'You are not allowed to use this command!', ephemeral: true})
    let embed = createEmbed('ticketmenu')
    let row = createComponent('ticket', 'ticketmenu')
    
    interaction.channel.send({embeds: [embed], components: [row]})
    interaction.reply({content: 'Ticket menu sent!', ephemeral: true})
}

module.exports = ticketsendcmd;