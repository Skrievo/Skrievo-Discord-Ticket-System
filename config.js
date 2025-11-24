const config = {}

config.guildid = ""

config.bot = {
    name: "Ticket System",
    color: "#2b2b2b",
    avatar: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
    activitys: [
        {
            name: 'through the matix',
            type: 'Watching',
            status: 'online'
        },
        {
            name: 'with your feelings',
            type: 'Playing',
            status: 'dnd'
        },
    ],
    intervall: 10 * 1000 // 10 Sekunden
}

config.adminroles = ["1140406205488046161"] // For Transcripts and Commands

config.ticketmenu = {
    title: "Ticketsystem",
    description: "Please choose the right category to open a ticket.",
    image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
    author: {
        name: "Ticket System",
        iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
        url: "https://discord.gg/codebotz"
    },
    footer: {
        text: "Ticket System",
        iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png"
    },
    timestamp: true,
}

config.ticketsettings = {
    buttons: [
        {
            name: "Close",
            style: 4,
            emoji: "🔒",
        }
    ],

    maxtickets: 4, // Max open tickets per user

    // Transcripts are allways saved.
    delonclose: true, // Delete the channel when closed
    deltimer: 5 * 1000, // 5 Seconds delay
    
    archivecategory: ["1117849278824599615"], // Category were the closed tickets are moved to (!!! Only if delonclose is false !!!)

    // Transcript Settings
    transcript: {
        saveindc: false, // Save the transcript in the Discord Channel
        footer: "Messages sent in Ticket: {number}",
        saveImages: true,
        saveVideos: true 
    },

    senduserdm: true,
    userdm: {
        title: "Ticket closed",
        description: "Your ticket was closed.\nFor the transscript, click on the title.",
        url: "https://transkript.com", // Get replaced with the transcript url
        color: "#2d1f54",
        image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
        author: {
            name: "Ticket System",
            iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
            url: "https://discord.gg/codebotz"
        },
        footer: {
            text: "Ticket System",
            iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png"
        },
        timestamp: true
    },

    remind: {
            title: "Reminder!",
            description: "You have an open ticket.\nIf you dont need support anymore please close it.\n{ticket}",
            color: "#2d1f54",
            image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
            author: {
                name: "Ticket System",
                iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.pngg",
                url: "https://discord.gg/codebotz"
            },
            footer: {
                text: "Ticket System",
                iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png"
            },
            timestamp: true
    },

    autoclose: {
        time: 24 * 60 * 60 * 1000, // 24 Hours
        refresh: 5 * 1000, // (Every 5 Seconds it checks if an channel of autoclose needs to be closed)
        senddm: true, // Send user DM when Autoclsoe is active
        embed: {
            title: "Attention!",
            description: "Your ticket gets automaticlly closed in 24 hours.\nYou need more support or your issue isnt solved? Reach out to us and write in the channel to cancel the process.\n{ticket}",
            color: "#2d1f54",
            image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
            author: {
                name: "Ticket System",
                iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
                url: "https://discord.gg/codebotz"
            },
            footer: {
                text: "Ticket System",
                iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png"
            },
            timestamp: true
        },
        cancel: {
            title: "Autoclose canceled",
            description: "Autoclose for ticket is canceld, because someone sent a message in the channel.",
            color: "#2d1f54",
            image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
            author: {
                name: "Ticket System",
                iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
                url: "https://discord.gg/codebotz"
            },
            footer: {
                text: "Ticket System",
                iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png"
            },
            timestamp: true
        }
    },
}

config.ticketcategories = [
    {
        name: "Buy",
        description: "Tickets to buy a product",
        emoji: "🛒",
        categoryid: "1140462314743681186",
        channel: "💸︱{username}",
        pinguser: true,
        pingstaff: true, // false to disable
        roles: [], // Rolle die das Ticket öffnen darf
        perms: ["1140406205488046161"], // Support, Development, Administration, Projektleitung Ränge
        embed: {
            title: "Buy Ticket",
            description: "Hello {userping},\nPlease tell us wich prudct you want to buy and we will reach out to you as soon as possible.\n\nBest Regards,\nSupport Team",
            color: "#2d1f54",
            image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
            image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
            author: {
                name: "Ticket System",
                iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
                url: "https://discord.gg/codebotz"
            },
            footer: {
                text: "Ticket System",
                iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png"
            },
            timestamp: true
        }
    },
    {
        name: "Custom",
        description: "Tickets to buy a custom bot",
        emoji: "🔧",
        categoryid: "1140462360612589678",
        channel: "🔧︱{username}",
        pinguser: true,
        pingstaff: true, // false to disable
        roles: [], // Rolle die das Ticket öffnen darf
        perms: ["1140610356071387258"], // Support, Development, Administration, Projektleitung Ränge
        embed: {
            title: "Custom Ticket",
            description: "Hello {userping},\nPlease tell us what features and options you want and we will reach out to you as soon as possible.\n\nBest Regards,\nSupport Team",
            color: "#2d1f54",
            image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
            image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
            author: {
                name: "Ticket System",
                iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
                url: "https://discord.gg/codebotz"
            },
            footer: {
                text: "Ticket System",
                iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png"
            },
            timestamp: true
        }
    },
    {
        name: "Support",
        description: "Tickets to get support for a bot",
        emoji: "👥",
        categoryid: "1140459329242275930",
        channel: "👥︱{username}",
        pinguser: true,
        pingstaff: true, // false to disable
        roles: [], // Rolle die das Ticket öffnen darf
        perms: ["1140406205488046161"], // Support, Development, Administration, Projektleitung Ränge
        embed: {
            title: "Support Ticket",
            description: "Hello {userping},\nPlease tell us what isnt working or were you need help and we will reach out to you as soon as possible.\n\nBest Regards,\nSupport Team",
            color: "#2d1f54",
            image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
            image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
            author: {
                name: "Ticket System",
                iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
                url: "https://discord.gg/codebotz"
            },
            footer: {
                text: "Ticket System",
                iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png"
            },
            timestamp: true
        }
    },
    {
        name: "Partnerships",
        description: "New Partnership Requests",
        emoji: "🤝",
        categoryid: "1140462467215007816",
        channel: "🤝︱{username}",
        pinguser: true,
        pingstaff: true, // false to disable
        roles: [], // Rolle die das Ticket öffnen darf
        perms: ["1140462979993833585"], // Support, Development, Administration, Projektleitung Ränge
        embed: {
            title: "Partnerships", 
            description: "Please tell us why we should partner with you and we will reach out to you as soon as possible.\n\nBest Regards,\nSupport Team",
            image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
            author: {
                name: "Ticket System",
                iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
                url: "https://discord.gg/codebotz"
            },
            footer: {
                text: "Ticket System",
                iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png"
            },
            timestamp: true,
        },
    }
]

config.server = {
    ip: "192.168.5.50", // Server IP
    port: 3000, // Port of Application
    https: false, // true if https is enabled (domain usage recommended)

    proxy: {
        enabled: true, // true if you use a (reverse) proxy
        url: "tickets.codebotz.net", // Domain of the proxy
        https: true // true if https is enabled (recommended)
    },

    oauth2: {
        // https://discord.com/developers/applications
        client_id: '1158742816768405524', 
        client_secret: 'JjSHbtqPX5xXDMI7B2ofcUv_vpXkz3RE',
        client_scopes: ['identify', 'guilds'],
    }
}

// Logs
config.logs = {
    open: "1140462741665087620",
    close: "1140462751890813029",
    rename: "1140462770245095454",
    add: "1140462789836677250",
    remove: "1140462789836677250",
    autoclose: "1140462820522197123",

    embed: {
        title: "{titel}",
        description: "{description}",
        color: "#2d1f54",
        image: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
        author: {
            name: "Ticket System",
            iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
            url: "https://discord.gg/codebotz"
        },
        footer: {
            text: "Ticket System",
            iconURL: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png"
        },
        timestamp: true
    }
}

// Redirect URL for OAuth2
config.redirect_url = `https://tickets.codebotz.net/auth`

module.exports = config