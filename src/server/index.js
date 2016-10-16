const path = require('path');
const express = require('express');
const image = require('./routes/image');
const dictionary = require('./routes/dictionary');
const translate = require('./routes/translate');

module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, '../../public/index.html');
    const publicPath = express.static(path.join(__dirname, '../../public'));

    app.use('/public', publicPath);
    app.get('/', function (_, res) { res.sendFile(indexPath); });
    app.get("/api/image", image.imageByKeyword);
    app.get("/api/define", dictionary.defineByKeyword);
    app.get("/api/translate", translate.translateByKeyword);
    return app;
  }
};
