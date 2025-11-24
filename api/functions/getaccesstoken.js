const config = require('../../config');
const axios = require('axios');

async function getAccessToken(code, refresh) {

    let data = {
        client_id: config.server.oauth2.client_id,
        client_secret: config.server.oauth2.client_secret,
    }

    if (!refresh) {
        data.grant_type = 'authorization_code';
        data.code = code;
        data.redirect_uri = config.redirect_url;
        data.scope = config.server.oauth2.client_scopes.join(' ');
    } else {
        data.grant_type = 'refresh_token';
        data.refresh_token = code;
    }

    let res = {};

    const rest = await axios.post('https://discord.com/api/oauth2/token', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).catch((err) => {
        console.log(err);
        res.data = {
            access_token: "null",
            refresh_token: "null"
        }
    });

    if (rest) {
        res.data = rest.data;
    };

    return res.data
    
}
module.exports = getAccessToken;