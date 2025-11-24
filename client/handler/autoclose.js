const fs = require('fs');
const closeticket = require('../functions/ticketclose');
const getlastmessage = require('../functions/getlastmessage');
const getchannel = require('../functions/getchannel');
const config = require('../../config');
const embedcreator = require('../functions/embedcreator');
const logger = require('../../utils/logs');

function autoclosecheck() {
    const data = fs.readFileSync('./data/autoclose.json', 'utf8');
    const autoclose = JSON.parse(data);
    autoclose.tickets.forEach(async (ticket) => {
        // check if the timestamp is in the past
        const channel = await getchannel(ticket.ticket_id);
        if (!channel) {
            autoclose.tickets.splice(autoclose.tickets.indexOf(ticket), 1);
            const json = JSON.stringify(autoclose);
            fs.writeFileSync('./data/autoclose.json', json, 'utf8');
            return;
        }
        if (ticket.ticket_msgid != await getlastmessage(ticket.ticket_id)) {
            autoclose.tickets.splice(autoclose.tickets.indexOf(ticket), 1);
            const json = JSON.stringify(autoclose);
            fs.writeFileSync('./data/autoclose.json', json, 'utf8');
            const embed = embedcreator('ticketsettings.autoclose.cancel');
            channel.send({ embeds: [embed] });
            return;
        }
        if (ticket.timestamp > Date.now()) return;
        logger("Ticket Autoclose", `${channel.name} got closed by Autoclose`, "autoclose")
        closeticket(ticket.ticket_id, "Autoclose");
        autoclose.tickets.splice(autoclose.tickets.indexOf(ticket), 1);
        const json = JSON.stringify(autoclose);
        fs.writeFileSync('./data/autoclose.json', json, 'utf8');
    })
}

setInterval(autoclosecheck, config.ticketsettings.autoclose.refresh);