const client = require('../bot')

function getusername(userid) {
    return new Promise((resolve, reject) => {
        client.users.fetch(userid).then(user => {
            resolve(user.username)
        })
    })
}

module.exports = getusername