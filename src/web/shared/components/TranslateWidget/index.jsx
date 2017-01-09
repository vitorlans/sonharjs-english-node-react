import React, {Component} from 'react';

export class TranslateWidget extends Component {

    render() {
        let rows = [];
        if(this.props.translates !== undefined && this.props.translates.length > 0){
            this.props.translates.map(function (trans , key) {
                rows.push(<p key={key}>{key + 1}. {trans}</p>);
            }, this);
        }else {
            return <div>
                It doesn't found any translation for this search.
            </div>;
         }
        return (
            <div className="w3-card-2 w3-round">

                <div className="w3-container">
                    {rows}
                </div>

            </div>

        );
    }
}
