import React, { Component } from 'react';
import Headroom from 'react-headroom';
import { LinkWidget } from 'shared/components/LinkWidget';


export class HeaderWidget extends React.Component {
  render () {   
    return ( 
      <div>  
         <Headroom>
                <div className="w3-theme w3-row w3-card-2 header--padding">
                        <div className="w3-col s2">
                            <LinkWidget className="w3-xxlarge" to='/account' ><i className="fa fa-user-circle-o" aria-hidden="true"></i></LinkWidget>
                        </div>
                        <div className="w3-col s8 w3-center">
                            <LinkWidget to='/'><img className="w3-center header--image" src="/images/playbutton.svg"></img> </LinkWidget>
                        </div>
                        <div className="w3-col s2">
                             <LinkWidget to='/word' className="w3-xxlarge w3-right text-decoration--none"><i className="fa fa-search" aria-hidden="true"></i></LinkWidget> 
                        </div>
                 </div>
            </Headroom>
      </div>
    );
  }
}