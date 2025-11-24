const express = require('express');
const router = express.Router();
const config = require('../../config');
const getAccessToken = require('../functions/getaccesstoken');
const getUserDetails = require('../functions/getuserdetails.js');

let redirect

router.get("/", async (req, res) => {
    console.log(req.query);

    const code = req.query?.code;
    if (req.query?.redirect!= undefined) redirect = req.query?.redirect;
    // redirect = req.query?.redirect;
    // replace / with %2F
    // redirect = redirect?.replace(/\//g, "%2F");
    const url = `https://discord.com/api/oauth2/authorize?client_id=${config.server.oauth2.client_id}&redirect_uri=${config.redirect_url}&response_type=code&scope=${config.server.oauth2.client_scopes.join('%20')}`;
    if (!code) return res.redirect(url);
    const { access_token, refresh_token } = await getAccessToken(code);
    console.log(access_token);
    if (access_token == "null") return res.redirect(url);


    const { id } = await getUserDetails(access_token);


    // store the user id in a session cookie
    req.session.userid = id;

    if (redirect) {
        res.redirect(redirect);
        redirect = undefined;
    } else {
        res.redirect(`/user/${id}`);
    }
})

module.exports = router;