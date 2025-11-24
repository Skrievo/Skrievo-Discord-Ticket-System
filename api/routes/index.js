const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    // get the complete url

    res.redirect("/user/" + req.session.userid)
})

module.exports = router;