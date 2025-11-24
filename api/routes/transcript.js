const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const isadmin = require('../functions/isadmin');

router.get("/:userid/:ticketid", async (req, res) => {

    // if the session userid is not the same as the userid in the url, return 403
    const admin = await isadmin(req.session.userid)
    if (!admin) {
      if (req.session.userid != req.params.userid) return res.status(403).sendFile(path.resolve('./public/403.html'));
    }
    const userid = req.params.userid;
    const ticketid = req.params.ticketid;

    const pathfile = `./public/${userid}/${ticketid}.html`;
    if (fs.existsSync(pathfile)) {
        res.sendFile(path.resolve(pathfile));
    } else {
        res.status(404).sendFile(path.resolve('./public/404.html'));
    }
})

module.exports = router;