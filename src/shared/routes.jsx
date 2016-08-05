import React from 'react';
import { Router, Route } from 'react-router';
import { MainLayout } from 'screens/Main/MainLayout';
import { HomeView } from 'screens/Home/HomeView';


export const routes = <Route component={MainLayout}>
    <Route path="/" component={HomeView} />
    <Route path="*" component={HomeView} />
</Route>;
