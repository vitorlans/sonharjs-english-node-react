import React, { Component } from 'react';

export class FooterWidget extends React.Component {
  render () {
    return (
    <footer className="w3-container w3-theme w3-center w3-margin-top footer">
      {/* <i className="fa fa-facebook-official w3-hover-text-indigo w3-large"></i> 
          <i className="fa fa-linkedin w3-hover-text-indigo w3-large"></i> */}
      <div className="w3-margin">
        <a href="https://www.instagram.com/vitorlans" target="_blank" title="Instagram" ><i className="fa fa-instagram w3-hover-text-purple w3-large"></i> </a>
        <a href="https://snapchat.com/add/vitorlans" target="_blank" title="Snapchat" ><i className="fa fa-snapchat w3-hover-text-yellow w3-large"></i> </a>
        <a href="https://twitter.com/vitorlans" target="_blank" title="Twitter" ><i className="fa fa-twitter w3-hover-text-light-blue w3-large"></i> </a>
        <a href="https://github.com/vitorlans" target="_blank" title="Github" ><i className="fa fa-github w3-hover-text-black w3-large"></i> </a>
      </div>
    </footer>
    );
  }
}