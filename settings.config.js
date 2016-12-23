const path = require('path');

module.exports = {
    appPath: path.join(__dirname, '/dist'),
    staticPath: path.join(__dirname, '/static'),
    templatePath: path.join(__dirname, "/src/server/views"),
    publicPath: "/"
};