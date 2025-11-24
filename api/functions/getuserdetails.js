async function getUserDetails(access_token) {
    const axios = require('axios');
    const res = await axios.get('https://discord.com/api/users/@me', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    }).catch(err => {
        console.log("cant get user details")
        // console.log(err)
        const id = "null"
        return { id }
    })
    return res.data;
}

module.exports = getUserDetails;