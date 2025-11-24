const commands = {
    'verify': {
        name: 'verify',
        description: 'Verify Commands',
        options: [{
            name: 'send',
            description: 'Send the verification menu',
            type: 1
        }, {
            name: 'user',
            description: 'Verify a user',
            type: 1,
            options: [{
                name: 'user',
                description: 'User to verify',
                type: 6,
                required: true
            }]
        }]
    },
    'ticket': {
        name: 'ticket',
        description: 'Ticket Commands',
        options: [{
            name: 'send',
            description: 'Send the ticket menu',
            type: 1
        }, {
            name: 'close',
            description: 'Close a ticket',
            type: 1,
        }, {
            name: 'add',
            description: 'Add a user to a ticket',
            type: 1,
            options: [{
                name: 'user',
                description: 'User or Role to add',
                type: 9,
                required: true
            }]
        }, {
            name: 'remove',
            description: 'Remove a user to a ticket',
            type: 1,
            options: [{
                name: 'user',
                description: 'User or Role to remove',
                type: 9,
                required: true
            }]
        }, {
            name: 'rename',
            description: 'Rename a ticket',
            type: 1,
            options: [{
                name: 'name',
                description: 'The new name for the ticket',
                type: 3,
                required: true
            }]
        }, {
            name: 'autoclose',
            description: 'Set a ticket to auto close',
            type: 1
        }, {
            name: 'remind',
            description: 'Remind a user about a ticket',
            type: 1
        }]
    },
    'user': {
        name: 'user',
        description: 'User Commands',
        options: [{
            name: 'tickets',
            description: 'Get a list of tickets a user has',
            type: 1,
            options: [{
                name: 'user',
                description: 'The user to get tickets for',
                type: 6,
                required: true
            }]
        }]
    },
}

module.exports = commands;