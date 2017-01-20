import jwt from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';
import setting from '../../../settings.config.js';

//RENDER-REACT-SERVER-SIDE
import React from 'react';
import { RouterContext, match } from 'react-router';
import createRoutes from '../../web/shared/routes';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import configureStore from '../../web/shared/store';
import ReactDOMServer from 'react-dom/server';
import cookie from 'react-cookie';
import { Provider } from 'react-redux';
import {setCurrentUser} from '../../web/actions/user-action';
import {setMySaved} from '../../web/actions/word-action';

//FEATCH MY SAVED WORDS
import { getUserByCredential } from '../connections/repository.db';

//SERVER RENDER''
 export default function(req, res) {
        
        cookie.setRawCookie(req.headers.cookie);
        cookie.save = res.cookie.bind(res);

        const history = createMemoryHistory();
        const store = configureStore();
        const routes = createRoutes(history);

        console.log(req);
        match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
            if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            } else if (error) {
                res.send(500, error.message);
            } else if (renderProps === null) {
                res.send(404, 'Not found');
            } else if (renderProps) {
                getReduxPromise(renderProps, store, req.url).then(() => {
                    const reduxState = JSON.stringify(store.getState()).replace(/</g, '\\x3c');
                    const html = ReactDOMServer.renderToString(
                        <Provider store={store}>
                            {<RouterContext {...renderProps} />}
                        </Provider>
                    );
                    res.render('index.ejs', { html, reduxState, isDevelopment: setting.isDevelopment });
                });
            } else {
                res.sendStatus(404);
            }
        });
    }

function getReduxPromise(props, store, url) {
    const token = cookie.load('jwtToken');
    if (token) {
        var user = jwt.decode(token);
        store.dispatch(setCurrentUser(user));
        
        if(url === '/account'){
            return getUserByCredential(user.credential).then((resp) => {
                if (!isEmpty(resp.docs)) {
                    let user = resp.docs[0];
                    store.dispatch(setMySaved(user.words));
                }   
                return Promise.resolve();
            });
        } else {
            return Promise.resolve();
        }
    } else { 
        
        return Promise.resolve();
    }
}
