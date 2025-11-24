function isTicket(categoryid) {
    const config = require("../../config")
    let ticket = false
    config.ticketcategories.forEach(category => {
        if (category.categoryid == categoryid) {
            ticket = true  
        }
    })
    if (ticket) return true
    else return false
}

module.exports = isTicket;