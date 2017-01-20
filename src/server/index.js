import path from 'path';
import express from 'express';
import bodyParser  from 'body-parser';
import morgan from 'morgan';
import cookies from 'cookie-parser';

import setting from '../../settings.config.js';


//MIDDLEWARES
import { authenticate, https } from './middlewares';

//CONTROLLERS
import user from './routes/user';
import word from './routes/word';
import serverSideRouter from './routes/index';

module.exports = {
  app: function () {
    const app = express();
    const appPath = express.static(setting.appPath);

    //CONFIG
    app.set('view engine', 'ejs');
    app.use(appPath);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookies());

    //WEBPACK
    if (setting.isDevelopment) {
      app.use(morgan("dev"));  
      const webpack = require('webpack');
      const webpackDevMiddleware = require('webpack-dev-middleware');
      const webpackHotMiddleware = require('webpack-hot-middleware');
      const config = require('../../webpack.dev.config.js');
      const compiler = webpack(config);

      app.set('views', path.join(__dirname, '/views'));
      app.use(webpackHotMiddleware(compiler));
      app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
      }));
    } else {
       app.set('views', setting.appPath);
       app.enable('trust proxy');
       app.use(https);
    }
    app.set('view cache', true);

    //ROUTES
    app.use("/api/user", user);
    app.use("/api/word", word);

    //SERVERSIDE
    app.use(serverSideRouter);
   
    return app;
  }
};