require('babel-core/register');
require('babel-polyfill');
const setting = require("./settings.config");

if(setting.isDevelopment)
    require('dotenv').config();

const Server = require('./src/server/index.js');
const port = (process.env.PORT || 8080);
const app = Server.app();

app.listen(port);
console.log(`Listening at http://localhost:${port}`);