'use strict';
require('./polyfills');
const setting = require("./settings.config");

var Server;
if(setting.isDevelopment){
    require('dotenv').config();
    require("babel-core/register");
    Server = require('./src/server/index');
} else {
    Server = require("./build/server/index");
}

const port = process.env.PORT || 8080;
const app = Server.app();

app.listen(port);
console.log(`Listening at http://localhost:${port}`);