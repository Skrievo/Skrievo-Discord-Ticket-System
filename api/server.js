const transcript = require('./routes/transcript');
const config = require('../config');
const {app} = require('./functions/cert');
const {checkCert} = require('./functions/cert');
const path = require('path');
const cookieParser = require("cookie-parser");
const favicon = require('serve-favicon');
const sessions = require('express-session');
const server = checkCert();

// creating 1 hours from milliseconds
const onehour = 1000 * 60 * 60;

//session middleware
app.use(sessions({
    secret: "blabalbladlfasdjfl",
    saveUninitialized:true,
    cookie: { maxAge: onehour },
    resave: false
}));

app.use(cookieParser());


app.use("/auth", require('./routes/auth'));

app.use((req, res, next) => {
    // Check if user is logged in and if not, redirect to login page
    // console.log(req.session);
    if (!req.session?.userid) {
        const url = req.originalUrl.replace(/\//g, "%2F");
        return res.redirect(`/auth?redirect=${url}`);
    }

    next()
})

app.use(favicon(path.join(__dirname, 'favicon.ico')));


app.use("/user", require('./routes/user'));

app.use("/users", require('./routes/users'));

app.use("/transcript", transcript);

app.use("/", require('./routes/index'));

app.use((req, res) => {
    res.status(404).sendFile(path.resolve('./public/404.html'));
})

server.listen(config.server.port, () => console.log(`Endpoint started 🗸`));