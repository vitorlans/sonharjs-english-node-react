import React from 'react';
import { Router, Route, Link } from 'react-router';
import { HeaderWidget } from './Header/HeaderWidget';
import { FooterWidget } from './Footer/FooterWidget';

export default class MainLayout extends React.Component {
       
    render(){
        return (
          <div id="row hold column collapse full-flex">
            <HeaderWidget></HeaderWidget>
            {this.props.children}
            <FooterWidget></FooterWidget>
          </div>
        );
    }
}