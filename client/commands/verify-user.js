function verifyusercmd(interaction) {
    const user = interaction.options.getUser('user');
    const verifyuser = require('../functions/verifyuser');

    verifyuser(user);
}

module.exports = verifyusercmd;