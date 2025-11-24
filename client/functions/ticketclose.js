const transcripts = require('discord-html-transcripts')
const fs = require('fs')
const config = require('../../config')
const createEmbed = require('./embedcreator')
const logger = require('../../utils/logs')

async function closeticket(ticket, closer) {
    // Get the Disord Bot Client
    const client = require('../bot')

    // Get the Discord Channel
    const channel = client.channels.cache.get(ticket)

    // Create a transcript for the Channel
    const transcript = await transcripts.createTranscript(channel, {
        // Options
        format: 'html',
        user: true,
        bot: true,
        pinned: true,
        reverseArray: true,
        maxMessagesPerChannel: 10000,
        maxTotalMessages: 10000,
        saveImages: config.ticketsettings.transcript.saveImages,
        saveVideos: config.ticketsettings.transcript.saveVideos,
        returnType: 'buffer',
        poweredBy: false,
        footerText: config.ticketsettings.transcript?.footer,        
    })

    // Create the folder if it doesnt exist
    fs.mkdirSync(`./public/${channel.topic}`, { recursive: true })

    fs.writeFileSync(`./public/${channel.topic}/${channel.id}.html`, transcript)

    if (config.ticketsettings.senduserdm) {
        const user = await client.users.fetch(channel.topic)
        let embed = createEmbed('ticketsettings.userdm')

        if (!config.ticketsettings.transcript.saveindc) {
            let url = config.server.https ? `https://${config.server.ip}` : `http://${config.server.ip}`
            url = config.server.port != 443 && config.server.port != 80 ? `${url}:${config.server.port}` : url

            if (config.server.proxy.enabled) {
                url = config.server.proxy.https ? `https://${config.server.proxy.url}` : `http://${config.server.proxy.url}`
            }

            url = `${url}/transcript/${channel.topic}/${channel.id}`

            embed.setURL(url)
        } else {
            
        }

        try {
            user.send({ embeds: [embed] }).catch(e => {
                console.log("cant send msg")
            })
        } catch(e) {
            console.log("cant send msg")
        }
        
    }

    // check if ticket is in autoclose.json if so delete it
    const autoclose = require('../../data/autoclose.json')
    if (autoclose.tickets.some(ticket => ticket.ticket_id == channel.id)) {
        autoclose.tickets.splice(autoclose.tickets.indexOf(autoclose.tickets.find(ticket => ticket.ticket_id == channel.id)), 1)
        const json = JSON.stringify(autoclose)
        fs.writeFileSync('./data/autoclose.json', json, 'utf8')
    }

    logger("Ticket closed", `Ticket ${channel.name} closed.\nOpener: <@${channel.topic}>\nCloser: ${closer}`, "close")

    if (config.ticketsettings.delonclose) {
        await new Promise(resolve => setTimeout(resolve, config.ticketsettings.deltimer));
        channel.delete()
    } else {
        // move the channel to the archive category
        try{
            const category = client.channels.cache.get(config.ticketsettings.archivecategory[0])
            channel.setParent(category.id)
        }
        catch (error) {
            const category = client.channels.cache.get(config.ticketsettings.archivecategory[1])
            channel.setParent(category.id)
        }

    }
}

module.exports = closeticket