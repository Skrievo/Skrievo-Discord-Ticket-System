const commmands = require('../../commands')
const client = require('../bot')
const botcommands = client.application.commands

Object.keys(commmands).forEach(command => {
    botcommands.create(commmands[command])
})