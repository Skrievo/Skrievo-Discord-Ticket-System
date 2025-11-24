const client = require("../bot");
const commands = require("../../commands");
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = interaction.commandName;
    
    try {
        if (command == commands.ticket.name) {
            const subcommand = interaction.options.getSubcommand();
            if (subcommand == commands.ticket.options[0].name) {
                const ticketsend = require("../commands/ticket-send");
                ticketsend(interaction);
            } else if (subcommand == commands.ticket.options[1].name) {
                const ticketclose = require("../commands/ticket-close");
                ticketclose(interaction);
            } else if (subcommand == commands.ticket.options[2].name) {
                const ticketadd = require("../commands/ticket-add");
                ticketadd(interaction);
            } else if (subcommand == commands.ticket.options[3].name) {
                const ticketremove = require("../commands/ticket-remove");
                ticketremove(interaction);
            } else if (subcommand == commands.ticket.options[4].name) {
                const ticketrename = require("../commands/ticket-rename");
                ticketrename(interaction);
            } else if (subcommand == commands.ticket.options[5].name) {
                const ticketautoclose = require("../commands/ticket-autoclose");
                ticketautoclose(interaction);
            } else if (subcommand == commands.ticket.options[6].name) {
                const ticketremindcmd = require("../commands/ticket-remind");
                ticketremindcmd(interaction);
            }
        } else if (command == commands.user.name) {
            const subcommand = interaction.options.getSubcommand();
            if (subcommand == commands.user.options[0].name) {
                const usertickets = require("../commands/user-tickets");
                usertickets(interaction);
            }
        } else if (command == commands.verify.name) {
            const subcommand = interaction.options.getSubcommand();
            if (subcommand == commands.verify.options[0].name) {
                const verifysendcmd = require("../commands/verify-send");
                verifysendcmd(interaction);
            } else if (subcommand == commands.verify.options[1].name) {
                const verifyusercmd = require("../commands/verify-user");
                verifyusercmd(interaction);
            }
        } else if (command == commands.bestellung.name) {
            const bestellungcmd = require("../commands/bestellung")
            bestellungcmd(interaction)
        }
    }
    catch (error) {
        console.error(error);
        await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
});