const { StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const config = require("../../config")

function createComponent(type, name) {
    if (type == "selectmneu") {
        let selectmneu = new StringSelectMenuBuilder()
        selectmneu.setCustomId(name)
    } else if (type == "ticket") {
        let selectmneu = new StringSelectMenuBuilder()
        selectmneu.setCustomId(name)

        config.ticketcategories.forEach(category => {
            selectmneu.addOptions({
                label: category.name,
                description: category.description,
                value: category.name.toLocaleLowerCase().replace(" ", "_"),
                emoji: category.emoji
            })
        })

        const row = new ActionRowBuilder()
            .addComponents(selectmneu)

        return row
    } else if (type == "button") {
        let buttons = []

        let args = name.split(".")

        let conf = config

        args.forEach(arg => {
            conf = conf[arg]
        })

        conf.forEach(button => {
            let buttonbuilder = new ButtonBuilder()
                .setCustomId(button.name.toLocaleLowerCase().replace(" ", "_"))
                .setLabel(button.name)
                .setStyle(button.style)
                .setEmoji(button.emoji)

            buttons.push(buttonbuilder)
        })
        
        const row = new ActionRowBuilder()
            .addComponents(buttons)

        return row
    }
}

module.exports = createComponent;