const createEmbed = require("../functions/embedcreator")

async function ticketremindcmd(interaction) {
    let embed = createEmbed('ticketsettings.remind')

    const isadmin = require("../../api/functions/isadmin")
    if (!await isadmin(interaction.user.id)) return interaction.reply({content: 'You are not allowed to use this command!', ephemeral: true})

    embed.data.description = embed.data.description.replace('{ticket}', interaction.channel.toString())

    interaction.guild.members.cache.get(interaction.channel.topic).send({embeds: [embed]})

    interaction.reply({content: 'Erinnerung erfolgreich gesendet', ephemeral: true})
}

module.exports = ticketremindcmd;