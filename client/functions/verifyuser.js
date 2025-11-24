function verifyuser(user) {
    // add the user to the verified roles
    const logger = require('../../utils/logs');
    logger("Verify User", `${user.toString()} is now verifyed`, "verify")    
    const config = require('../../config');
    config.verifyroles.forEach(role => {
        user.roles.add(role)
    })
}

module.exports = verifyuser;