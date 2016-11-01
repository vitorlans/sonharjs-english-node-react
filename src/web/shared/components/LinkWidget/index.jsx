import React, { Component } from 'react';
import { Link } from 'react-router';

export class LinkWidget extends React.Component {
  render () {
    return (
      <Link className={this.props.className} to={this.props.to} onClick={this.props.onClick}>{this.props.children}</Link>
    );
  }
}
