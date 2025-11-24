const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const config = require('../../config');
const isadmin = require('../functions/isadmin');

router.get("/:userid/", async (req, res) => {

    // if the session userid is not the same as the userid in the url, return 403
    // if (req.session.userid != req.params.userid) return res.status(403).sendFile(path.resolve('./public/403.html'));

    const userid = req.params.userid;
    const admin = await isadmin(req.session.userid)
    if (!admin) {
      if (req.session.userid != req.params.userid) return res.status(403).sendFile(path.resolve('./public/403.html'));
    }

    const pathfile = `./public/${userid}`;
    if (fs.existsSync(pathfile)) {
        // get all files in the directory and return the links to the files
        
        let tickets = `
        <style>
        .main {
            font-family: Arial, Helvetica, sans-serif;
            padding: 50px;
            background: #f4f9fb;
            height: 100vh;
          }
          table {
            max-width:800px;
            margin:0 auto
          }
          
          /****** table style ******/
          table tbody>tr>td:last-child{
            text-align: center;
          }
          
          .table.table-style {
            border-collapse: separate;
            border-spacing: 0 10px;
          }
          
          .table.table-style tr td {
            border-left: 5px solid #f4f9fb;
            padding: 5px;
          }
          
          .table.table-style > thead > tr > td,
          .table.table-style > tbody > tr > td,
          .table.table-style > tfoot > tr > td {
            border-top: 0px;
            line-height: 36px;  
          }
          
          .table.table-style tbody > tr {
            box-shadow: 1px 0px 7px 0 rgba(215, 234, 243, 0.6);
            background:#fff;
          }
          
        </style>
        <div class="main">
        <h1>Tickets</h1>
        <table class="table table-style">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ticket</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>`
        // get the tickets from the user by public/user.id/*.html
        // for each file, add a new line to tickets
        // if no tickets, tickets = "No tickets found"
        //

        let baseurl = config.server.https ? `https://${config.server.ip}` : `http://${config.server.ip}`

        baseurl = config.server.port != 443 && config.server.port != 80 ? `${baseurl}:${config.server.port}` : baseurl

        if (config.server.proxy.enabled) {
          baseurl = config.server.proxy.https ? `https://${config.server.proxy.url}` : `http://${config.server.proxy.url}`
        }

        baseurl = `${baseurl}/transcript/${userid}/`

        if (!fs.existsSync(`./public/${userid}`)) {
            tickets = "No tickets found"
        } else {
            const files = fs.readdirSync(`./public/${userid}`);
            let i = 1
            files.forEach(file => {
                // add the file with the base url but without the .html
                // get the content between the title tag
                let tag = fs.readFileSync(`./public/${userid}/${file}`, 'utf8').split('<title>')[1].split('</title>')[0]
                // tickets += `[${tag}](${baseurl}${file.replace('.html', '')})\n`
                // in html style
                let time = fs.statSync(`./public/${userid}/${file}`).mtime.toLocaleString('de-DE')
            
                tickets += `<tr>
                <td>${i++}</td>
                <td><a href="${baseurl}${file.replace('.html', '')}">${tag}</a></td>
                <td>${time}</td>
                </tr>
                `
                // <a href="${baseurl}${file.replace('.html', '')}">${tag}</a><br>
            })
            tickets += `</tbody>
                </table>
                </div>`
        }
        res.send(tickets)

    } else {
        return res.status(404).sendFile(path.resolve('./public/404.html'));
    }
})

module.exports = router;