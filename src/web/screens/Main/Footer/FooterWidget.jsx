import React, { Component } from 'react';

export class FooterWidget extends React.Component {
  render () {
    return (
    <footer className="w3-container w3-theme w3-center w3-margin-top footer">
      {/*  */}
      <div className="w3-margin">
        <a className="w3-padding-small" href="https://facebook.com/vitorlans" target="_blank" title="Facebook" ><i className="fa fa-facebook-official w3-hover-text-indigo w3-xlarge"></i> </a>
        <a className="w3-padding-small" href="whatsapp://send?text=https://sonhar.mybluemix.net" target="_blank" title="Whatsapp" ><i className="fa fa-whatsapp w3-hover-text-green w3-xlarge"></i> </a>
        <a className="w3-padding-small" href="https://www.instagram.com/vitorlans" target="_blank" title="Instagram" ><i className="fa fa-instagram w3-hover-text-purple w3-xlarge"></i> </a>
        <a className="w3-padding-small" href="https://snapchat.com/add/vitorlans" target="_blank" title="Snapchat" ><i className="fa fa-snapchat w3-hover-text-yellow w3-xlarge"></i> </a>
        <a className="w3-padding-small" href="https://twitter.com/vitorlans" target="_blank" title="Twitter" ><i className="fa fa-twitter w3-hover-text-light-blue w3-xlarge"></i> </a>
        <a className="w3-padding-small" href="https://github.com/vitorlans" target="_blank" title="Github" ><i className="fa fa-github w3-hover-text-black w3-xlarge"></i> </a>
        <a className="w3-padding-small" href="https://www.linkedin.com/in/vitorlans" target="_blank" title="Linkedin" ><i className="fa fa-linkedin w3-hover-text-indigo w3-xlarge"></i> </a>
      </div>
    </footer>
    );
  }
}