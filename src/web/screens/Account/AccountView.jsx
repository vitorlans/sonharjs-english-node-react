import React, {Component, PropTypes} from 'react';
import Login  from 'shared/components/LoginWidget';
import SavedWordsWidget from 'shared/components/SavedWordsWidget';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class AccountView extends Component {
    constructor(props) {
        super(props);
        this.onWordClick = this.onWordClick.bind(this);
    }
    
    onWordClick(word){
        if(word) 
            this.props.router.push("/word?w="+ word);
    }

    render() {
        return (
            <div className="app--padding app--margin-top">
                <div className="w3-section">
                    <Login />
                </div>
                <div className="w3-section">
                    <SavedWordsWidget onWordClick={this.onWordClick}  />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(AccountView);
