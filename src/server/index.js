const path = require('path');
const express = require('express');
const image = require('./routes/image');
const dictionary = require('./routes/dictionary');
const translate = require('./routes/translate');

import { RouterContext, match } from 'react-router';
import createRoutes from '../web/shared/routes';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import configureStore from '../web/shared/store';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import React from 'react';
import fs from 'fs';

module.exports = {
  app: function () {
    const app = express();
    const publicPath = express.static(path.join(__dirname, '../../public'));

    //CONFIG
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '/views'));
    app.use(publicPath);


    //WEBPACK
    if (process.env.NODE_ENV !== 'production') {
      const webpack = require('webpack');
      const webpackDevMiddleware = require('webpack-dev-middleware');
      const webpackHotMiddleware = require('webpack-hot-middleware');
      const config = require('../../webpack.dev.config.js');
      const compiler = webpack(config);

      app.use(webpackHotMiddleware(compiler));
      app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
      }));
    }

    //ROUTES
    app.get("/api/image", image.imageByKeyword);
    app.get("/api/define", dictionary.defineByKeyword);
    app.get("/api/translate", translate.translateByKeyword);

    // app.get("/", (req, res) => { 
    //     var html = "";
    //     var reduxState = "";
    //     res.render('index.ejs', {html, reduxState}); 
    // });

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
                //getReduxPromise(renderProps, store).then(() => {
                    const reduxState = JSON.stringify(store.getState()).replace(/</g, '\\x3c');
                    const html = ReactDOMServer.renderToString(
                        <Provider store={store}>
                            {<RouterContext {...renderProps} />}
                        </Provider>
                    );
                    res.render('index.ejs', { html, reduxState });
                //}).catch(e => {
                 //   console.log(e);
                //});
            } else {
                res.sendStatus(404);
            }
        });
    });

    return app;
  }
};

function getReduxPromise(props, store) {
    const comp = props.components[props.components.length - 1].WrappedComponent;
    return Promise.resolve();
}