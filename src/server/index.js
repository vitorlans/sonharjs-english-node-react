import path from 'path';
import express from 'express';
import setting from '../../settings.config.js';

//RENDER-REACT-SERVER-SIDE
import React from 'react';
import { RouterContext, match } from 'react-router';
import createRoutes from '../web/shared/routes';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import configureStore from '../web/shared/store';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';

//CONTROLLERS
import image from './routes/image';
import dictionary from './routes/dictionary';
import translate from './routes/translate';
import word from './routes/word';

module.exports = {
  app: function () {
    const app = express();
    const appPath = express.static(setting.appPath);

    //CONFIG
    app.set('view engine', 'ejs');
    app.use(appPath);

    //WEBPACK
    if (setting.isDevelopment) {
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

       app.use (function (req, res, next) {
            if (req.secure) {
                    // request was via https, so do no special handling
                    next();
            } else {
                    // request was via http, so redirect to https
                    res.redirect('https://' + req.headers.host + req.url);
            }
        });
    }

    //ROUTES
    app.get("/api/image", image.imageByKeyword);
    app.get("/api/define", dictionary.defineByKeyword);
    app.get("/api/translate", translate.translateByKeyword);
    app.get("/api/word", word.gettranslates);

    //SERVER RENDER
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