require('babel-core/register');
require('babel-polyfill');

const Server = require('./src/server/index.js');
const port = (process.env.PORT || 8080);
const app = Server.app();

app.listen(port);
console.log(`Listening at http://localhost:${port}`);
