import React, {Component} from 'react';

export class ImageWidget extends Component {
    render() {
        return (
            <div>
                <div className="w3-row image--padding">
                    <div className="w3-col m4">
                        <img className="img" src="https://allthingslearning.files.wordpress.com/2012/08/ok-heres-the-thing.png"/>
                    </div>

                    <div className="w3-col m4">
                        <img className="img" src="https://static.omelete.uol.com.br/media/extras/conteudos/stranger-things-banner.jpg"/>
                    </div>
                
                    <div className="w3-col m4">
                        <img className="img" src="http://visualizetheweb.com/wp-content/uploads/2014/12/IoT.png"/>
                    </div>
                </div>
                <div>
                    <div className="w3-col m4">
                        <img className="img" src="https://static.omelete.uol.com.br/media/extras/conteudos/stranger-things-banner.jpg"/>
                    </div>

                    <div className="w3-col m4">
                        <img className="img" src="https://lh3.googleusercontent.com/y0GlnpYaTAlEwrK74ZgLpM5B5kvnpHVnC2Lrt4_wota8yBeMiM-YuLMQik8bnEXjZMk=w300"/>
                    </div>
                </div>
                <a className="w3-btn-block w3-round  w3-teal w3-margin-top">LOAD MORE</a>
            </div>
        );
    }
}
