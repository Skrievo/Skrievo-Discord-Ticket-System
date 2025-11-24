const createEmbed = require('../functions/embedcreator');
const createComponent = require('../functions/componentcreator');

function verifysendcmd(interaction) {
    let embed = createEmbed('verifyembed')
    let row = createComponent('button', 'verifyembed.buttons')
    
    interaction.channel.send({embeds: [embed], components: [row]})
    interaction.reply({content: 'Verify embed sent!', ephemeral: true})
}

module.exports = verifysendcmd;