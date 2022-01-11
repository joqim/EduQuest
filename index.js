var express = require('express');
var path = require('path');
const http = require('http');

console.log('inside index.js server')

const app = express();

global.app = app;

app.use(express.static(path.join(__dirname, "client", "build")));

app.locals.appExpress = app;

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "client","build","index.html"));
});

const port = process.env.PORT || 5000;

var server = http.createServer(app);
server.listen(port);
console.log('Running in port', port)