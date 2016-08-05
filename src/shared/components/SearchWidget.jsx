import React, {Component} from 'react';

export class SearchWidget extends Component {
    render() {
        return (
            <div className="">
                    <div className="w3-row">
                        <div className="w3-col s7">
                             <input type="text" title="" className="w3-input w3-border w3-round" placeholder="SEARCH"/>
                        </div>
                        <div className="w3-rest">
                             <input type="button" className="w3-btn w3-round w3-large w3-teal" value="GO" />
                        </div>
                    </div>
            </div>
        );
    }
}
