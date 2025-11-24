const config = require('../../config');
const client = require('../../client/bot');

async function isadmin(userid) {
    // check if the user has an admin role on the server
    const guild = await client.guilds.fetch(config.guildid);
    const member = await guild.members.fetch(userid);
    const roles = member.roles.cache.map(role => role.id);
    const adminroles = config.adminroles;
    const admin = roles.some(role => adminroles.includes(role));
    return admin;
}   

module.exports = isadmin;