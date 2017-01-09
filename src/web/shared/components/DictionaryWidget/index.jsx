import React, {Component} from 'react';

export class DictionaryWidget extends Component {
    render() {
        let rows = [];
        if(this.props.definitions !== undefined && this.props.definitions.length > 0){
            this.props.definitions.map(function (def , key) {
                rows.push(<p key={key}>{key + 1}. {def}</p>);
            }, this);
        }else {
            return <div>
                It doesn't found any definition for this search.
            </div>;
         }
        return (
            <div className="w3-panel w3-leftbar w3-light-grey ">
                {rows}
            </div> 
        );
    }
}
