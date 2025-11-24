const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const config = require('../../config');
const isadmin = require('../functions/isadmin');
const getusername = require('../../client/functions/getusername');

let users = `
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
<h1>Users</h1>
<table class="table table-style">
<thead>
    <tr>
    <th scope="col">#</th>
    <th scope="col">User ID</th>
    <th scope="col">Username</th>
    </tr>
</thead>
<tbody>`

router.get("/", async (req, res) => {
    const admin = await isadmin(req.session.userid)
    if (!admin) return res.status(403).sendFile(path.resolve('./public/403.html'));

        // list all users and get them from /public/ and return the links to the user pages

    // get the users from the user by public/user.id
    // for each folder, add a new line to users
    // if no users, users = "No users found"
    //
    let baseurl = config.server.https ? `https://${config.server.ip}` : `http://${config.server.ip}`

    if (!config.server.proxy.enabled) {
        baseurl = config.server.port != 443 && config.server.port != 80 ? `${baseurl}:${config.server.port}` : baseurl
    } else {
        baseurl = config.server.https ? `https://${config.server.proxy.url}` : `http://${config.server.proxy.url}`
    }
    
   

    baseurl = `${baseurl}/user/`

    if (!fs.existsSync(`./public`)) {
        users = "No users found"
        res.send(users)    
    } else {
        // const files = fs.readdirSync(`./public`);
        // let i = 1
        // // do the foreach async
        // await files.forEach((file) => {
        //     // add the file with the base url but without the .html
        //     // get the content between the title tag
        //     // let tag = fs.readFileSync(`./public/${userid}/${file}`, 'utf8').split('<title>')[1].split('</title>')[0]
        //     // tickets += `[${tag}](${baseurl}${file.replace('.html', '')})\n`
        //     // in html style
        //     // let time = fs.statSync(`./public/${userid}/${file}`).mtime
        //     // time = time.toString().split(' ').slice(0, 5).join(' ')
        //     if (file == '403.html') return
        //     if (file == '404.html') return
        //     getusername(file).then(username => {

        //     users += `<tr>
        //     <td>${i++}</td>
        //     <td><a href="${baseurl}${file}">${file}</a></td>
        //     <td>${username}</td>
        //     </tr>
        //     `
        //     })
        //     // <a href="${baseurl}${file.replace('.html', '')}">${tag}</a><br>
        // })
        // users += `</tbody>
        //     </table>
        //     </div>`
        // res.send(users)
        const files = fs.readdirSync('./public');
        let i = 1;
        const promises = files.map(async (file) => {
            if (file === '403.html' || file === '404.html') return;

            const username = await getusername(file);
            return `<tr>
                <td>${i++}</td>
                <td><a href="${baseurl}${file}">${file}</a></td>
                <td>${username}</td>
            </tr>`;
        });

        const tableRows = await Promise.all(promises);
        users = users + `
                ${tableRows.join('\n')}
            </tbody>
        </table>
        </div>`;

        res.send(users);
    }
})

module.exports = router;