import React, {Component} from 'react';

export class ImageWidget extends Component {
    onClick(image){
        document.getElementById("img01").src = image.url;
        document.getElementById("modal01").style.display = "block";
    }

    onModalClick(element){
        element.target.style.display='none';
    }

    render() {
        if(this.props.images.length === 0){
            return (<div>
                        Images aren't available for this search.
                    </div>);
        }   
        
        let rows = [];
                this.props.images.map(function (image , key) {
                    rows.push(<div key={key} className="w3-quarter w3-section" onClick={this.onClick.bind(this, image)}>
                           <img className="imagewidget--img  w3-hover-grayscale" src={image.thumb} />
                        </div>);
                }, this);
        return (
            <div>
                <div id="modal01" className="w3-modal" onClick={this.onModalClick.bind(this)}>
                    <div className="w3-modal-content w3-animate-zoom">
                        <img id="img01" style={{ "width" : "100%" }}/>
                    </div>
                </div>

                <div className="w3-row-padding">
                    {rows}
                </div>
                <a className="w3-theme w3-btn-block w3-round w3-margin-top">LOAD MORE</a>
            </div>
        );
    }
}
