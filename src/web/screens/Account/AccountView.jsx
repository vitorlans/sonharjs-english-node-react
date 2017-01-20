import React, {Component, PropTypes} from 'react';
import Login  from 'shared/components/LoginWidget';
import SavedWordsWidget from 'shared/components/SavedWordsWidget';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { fetchMyWords } from 'actions/word-action';
import { login, logout } from 'actions/user-action';

import LoginInfo from './LoginInfo'


class AccountView extends Component {
    constructor(props) {
        super(props);       
        this.onWordClick = this.onWordClick.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    componentDidMount(){
        // this.fetchWords();
    }
    
    onWordClick(word){
        if(word) 
            this.props.router.push("/word?w="+ word);
    }

    fetchWords(){
        const { isAuthenticated } = this.props.user;

        if(isAuthenticated){
            if(this.props.fetchMyWords)
                this.props.fetchMyWords();
        }
    } 

    onLogin(data){
        if(this.props.login){
            this.props.login(data).then(() => {
               this.fetchWords();
            });
        }
    }

    render() {
        const { isAuthenticated, user } = this.props.user;

        return (
            <div className="app--padding app--margin-top">
                <div className="w3-section">
                    {isAuthenticated ? <LoginInfo data={user} onLogout={this.props.logout} /> : <Login onLogin={this.onLogin}/>} 
                </div>
                { isAuthenticated ? <div className="w3-section">
                    <SavedWordsWidget onWordClick={this.onWordClick} wordList={this.props.account.wordList}  />
                </div> : ""}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        account: state.account,
        user: state.user
    };
}

function matchDispatchToProps(dispatch){
   return bindActionCreators({ "login": login, "fetchMyWords" :fetchMyWords, logout }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AccountView);
