const client = require("../bot");
const config = require("../../config");
const createComponent = require('../functions/componentcreator');
const closeticket = require('../functions/ticketclose');
const { EmbedBuilder, ChannelType, PermissionFlagsBits } = require("discord.js");
const logger = require("../../utils/logs");

client.on("interactionCreate", async (interaction) => {
    const customid = interaction.customId;

    if (!interaction.isStringSelectMenu() && !interaction.isButton()) return;

    if (customid == config.ticketsettings.buttons[0].name.toLocaleLowerCase().replace(" ", "_")) {
        closeticket(interaction.channelId, interaction.user.toString())
        // if ticket gets deleted interaction.reply({ content: "Ticket closed!", ephemeral: true });
        if (config.ticketsettings.delonclose) interaction.reply({ content: "Ticket closed! Deleting in " + Math.floor(config.ticketsettings.deltimer / 1000) + " Seconds.", ephemeral: true });
        else interaction.reply({ content: "Ticket closed!", ephemeral: true });
    }

    if (customid != "ticketmenu") return;

    try {
        if (customid == "ticketmenu") {
            const value = interaction.values[0];

            const category = config.ticketcategories.find(category => category.name.toLocaleLowerCase().replace(" ", "_") == value);
            // get index of category

            if (category.categoryid == "autoreply") {
                let embed = new EmbedBuilder()
                .setColor(category.embed.color || config.bot.color)
                .setTitle(category.embed.title)
                .setDescription(category.embed.description)

                // check if the author iconURL and Footer iconURL is a url
                if (category.embed.author?.iconURL && !category.embed?.author?.iconURL.startsWith('http')) category.embed.author.iconURL = null
                if (category.embed.footer?.iconURL && !category.embed?.footer?.iconURL.startsWith('http')) category.embed.footer.iconURL = null

                if (category.embed.author?.name) embed.setAuthor(category.embed.author)
                if (category.embed.footer?.text) embed.setFooter(category.embed.footer)

                if (category.embed.image) embed.setThumbnail(category.embed.image)
                if (category.embed.banner) embed.setImage(category.embed.banner)
                if (category.embed.timestamp) embed.setTimestamp()
                if (category.embed.url) embed.setURL(category.embed.url)

                if (category.embed.fields) category.embed.fields.forEach(filed => {
                    embed.addFields(filed)
                });

                let row = createComponent('ticket', 'ticketmenu')

                await interaction.message.edit({ components: [row]})
                await interaction.reply({ embeds: [embed], ephemeral: true });
            } else {
                // if user hasnt role to open ticket
                if (category.roles.length != 0) {
                    if (!category.roles.some(role => interaction.member.roles.cache.has(role))) {
                        let row = createComponent('ticket', 'ticketmenu')
                        await interaction.message.edit({ components: [row]})
                        return interaction.reply({ content: "You dont have the permission to open this ticket!", ephemeral: true });
                    }
                }

                // check if user has already a ticket
                if (config.ticketsettings.maxtickets != 0) {
                    let tickets = 0;
                    interaction.guild.channels.cache.forEach(channel => {
                        if (channel.type == 0 && channel.topic == interaction.user.id) tickets++;
                    })

                    if (tickets >= config.ticketsettings.maxtickets) {
                        let row = createComponent('ticket', 'ticketmenu')
                        await interaction.message.edit({ components: [row]})
                        return interaction.reply({ content: "You already have the maximum amount of tickets!", ephemeral: true });
                    }
                }

                let embed = new EmbedBuilder()
                    .setColor(category.embed.color || config.bot.color)
                    .setTitle(category.embed.title)
                    .setDescription(category.embed.description)

                // check if the author iconURL and Footer iconURL is a url
                if (category.embed.author?.iconURL && !category.embed.author?.iconURL.startsWith('http')) category.embed.author.iconURL = null
                if (category.embed.footer?.iconURL && !category.embed.footer?.iconURL.startsWith('http')) category.embed.footer.iconURL = null

                if (category.embed.author?.name) embed.setAuthor(category.embed.author)
                if (category.embed.footer?.text) embed.setFooter(category.embed.footer)

                if (category.embed.image) embed.setThumbnail(category.embed.image)
                if (category.embed.banner) embed.setImage(category.embed.banner)
                if (category.embed.timestamp) embed.setTimestamp()
                if (category.embed.url) embed.setURL(category.embed.url)

                if (category.embed.fields) category.embed.fields.forEach(filed => {
                    embed.addFields(filed)
                });

                let button = createComponent('button', 'ticketsettings.buttons')

                const channel = await interaction.guild.channels.create({ 
                    name: category.channel.replace("{username}", interaction.user.username),
                    parent: category.categoryid,
                    type: ChannelType.GuildText,
                    topic: interaction.user.id,
                    reason: "Ticket created by " + interaction.user.tag,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: [PermissionFlagsBits.ViewChannel]
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles]
                        }
                    ]
                });

                category.perms.forEach(perm => {
                    channel.permissionOverwrites.create(perm, {
                        ViewChannel: true,
                        SendMessages: true,
                        ReadMessageHistory: true,
                        AttachFiles: true
                    })
                })

                let message = ""
                if (category.pinguser) message += interaction.user.toString() + "\n"
                if (category.pingstaff) {
                    category.perms.forEach(perm => {
                        message += `<@&${perm}>, `
                    })
                }

                message = message.slice(0, -2);

                embed.setDescription(category.embed.description.replace("{userping}", interaction.user.toString()).replace("{category}", category.name).replace("{categoryname}", category.name))

                channel.send({ content: message, embeds: [embed], components: [button] });

                let row = createComponent('ticket', 'ticketmenu')
                await interaction.message.edit({ components: [row]})
                logger("TIcket created", "Neues Ticket wurde von " + interaction.user.toString() + " erstellt!\n" + channel.toString(), "open")
                interaction.reply({ content: "Ticket created! Go Check it out " + channel.toString(), ephemeral: true });
            }

        }
    }
    catch (error) {
        console.error(error);
        await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
});