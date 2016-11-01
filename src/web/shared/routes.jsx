import React, {Component} from 'react';
import { Router, Route } from 'react-router';
import MainLayout from 'screens/Main/MainLayout';
import Login from 'screens/Login/index';
import HomeView  from 'screens/Home/HomeView';
import DictationView  from 'screens/Dictation/DictationView';
import NotFound from 'screens/NotFound/index';


var routes = (history) => 
    (
        <Router history={history}>
            <Route component={MainLayout}>
                <Route path="/" component={HomeView} />
                <Route path="/dictation" component={DictationView} />
                <Route path="/login" component={Login} />
                <Route path="/me" component={HomeView} />
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    );

export default routes;