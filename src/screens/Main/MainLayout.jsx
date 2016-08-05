import React from 'react';
import { Router, Route, Link } from 'react-router';
import { HeaderWidget } from './Header/HeaderWidget';
import { FooterWidget } from './Footer/FooterWidget';

export class MainLayout extends React.Component {
    
    constructor(props, context){
      super(props, context);
      this.state = {
       
      };
    }
       
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