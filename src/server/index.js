import path from 'path';
import express from 'express';
import bodyParser  from 'body-parser';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';

import setting from '../../settings.config.js';

//RENDER-REACT-SERVER-SIDE
import React from 'react';
import { RouterContext, match } from 'react-router';
import createRoutes from '../web/shared/routes';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import configureStore from '../web/shared/store';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';


//MIDDLEWARES
import { authenticate, https } from './middlewares';

//CONTROLLERS
import user from './routes/user';
import word from './routes/word';

module.exports = {
  app: function () {
    const app = express();
    const appPath = express.static(setting.appPath);

    //CONFIG
    app.set('view engine', 'ejs');
    app.use(appPath);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

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

    //SERVER RENDER''
    app.use(function(req, res) {
        const history = createMemoryHistory();
        const store = configureStore();
        const routes = createRoutes(history);

        match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
            if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            } else if (error) {
                res.send(500, error.message);
            } else if (renderProps === null) {
                res.send(404, 'Not found');
            } else if (renderProps) {
                    const reduxState = JSON.stringify(store.getState()).replace(/</g, '\\x3c');
                    const html = ReactDOMServer.renderToString(
                        <Provider store={store}>
                            {<RouterContext {...renderProps} />}
                        </Provider>
                    );
                    res.render('index.ejs', { html, reduxState, isDevelopment: setting.isDevelopment });
            } else {
                res.sendStatus(404);
            }
        });
    });

    return app;
  }
};