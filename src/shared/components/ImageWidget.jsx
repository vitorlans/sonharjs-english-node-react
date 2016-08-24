import React, {Component} from 'react';

export class ImageWidget extends Component {
    render() {
        let rows = [];
                this.props.data.map(function (image , key) {
                    rows.push(<div key={key} className="w3-quarter">
                           <img className="img" src={image.thumb} />
                        </div>);
                }, this);
        return (
            <div>
                <div className="w3-row image--padding">
                    {rows}
                </div>
                <a className="w3-btn-block w3-round  w3-teal w3-margin-top">LOAD MORE</a>
            </div>
        );
    }
}
