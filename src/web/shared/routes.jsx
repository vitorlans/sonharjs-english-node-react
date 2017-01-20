import React, {Component} from 'react';
import { Router, Route } from 'react-router';
import MainLayout from 'screens/Main/MainLayout';
import AccountView from 'screens/Account/AccountView';
import HomeView  from 'screens/Home/HomeView';
import WordView  from 'screens/Word/WordView';
import NotFound from 'screens/NotFound/index';


var routes = (history) => 
    (
        <Router history={history}>
            <Route component={MainLayout}>
                <Route path="/" component={HomeView} />
                <Route path="/account" component={AccountView} />
                <Route path="/word" component={WordView}/>
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    );

export default routes;