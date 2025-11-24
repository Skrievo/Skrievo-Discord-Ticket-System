function createEmbed(path) {
    let config = require('../../config')
    const { EmbedBuilder } = require('discord.js');

    const args = path.split('.')

    let conf = config

    args.forEach(argument => {
        conf = conf[argument]
    });

    const embed = new EmbedBuilder()
        .setColor(conf.color || config.bot.color)
        .setTitle(conf.title)
        .setDescription(conf.description)

    // check if the author iconURL and Footer iconURL is a url
    if (conf.author?.iconURL && !conf.author?.iconURL.startsWith('http')) conf.author.iconURL = null
    if (conf.footer?.iconURL && !conf.footer?.iconURL.startsWith('http')) conf.footer.iconURL = null
        
    if (conf.footer?.text) embed.setFooter(conf.footer)
    if (conf.author?.name) embed.setAuthor(conf.author)
        
    if (conf.image) embed.setThumbnail(conf.image)
    if (conf.banner) embed.setImage(conf.banner)
    if (conf.timestamp) embed.setTimestamp()
    if (conf.url) embed.setURL(conf.url)

    if (conf.fields) conf.fields.forEach(filed => {
        embed.addFields(filed)
    });

    return embed
}

module.exports = createEmbed