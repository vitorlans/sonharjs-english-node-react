import React, { Component } from 'react';
import { LinkWidget } from 'shared/components/LinkWidget';


export default class DictationView extends React.Component {
  render () {
    return (
      <div className="w3-teal w3-margin-top">
      <LinkWidget to='/' className="w3-xxlarge w3-right">PLUS</LinkWidget> 
      <h1 className="w3-center" >DictationView</h1>
      </div>
    );
  }
}