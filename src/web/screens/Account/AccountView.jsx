import React, {Component, PropTypes} from 'react';
import Login  from 'shared/components/LoginWidget';
import SavedWordsWidget from 'shared/components/SavedWordsWidget';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { fetchMyWords, removeWord  } from 'actions/word-action';
import { login, logout } from 'actions/user-action';

import LoginInfo from './LoginInfo';


class AccountView extends Component {
    constructor(props) {
        super(props);       
        this.onWordClick = this.onWordClick.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onRemoveWord =  this.onRemoveWord.bind(this);
    }

    componentDidMount(){
        this.fetchWords();
    }
    
    onWordClick(word){
        if(word) 
            this.props.router.push("/word?w="+ word);
    }

    fetchWords(){
        const { isAuthenticated } = this.props.user;
        const { wordList } = this.props.account;
        if(isAuthenticated && wordList.length === 0){
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

    onRemoveWord(objWord){

        if(this.props.removeWord)
            this.props.removeWord(objWord.sentence);
    }

    render() {
        const { isAuthenticated, user } = this.props.user;

        return (
            <div className="app--padding app--margin-top">
                <div className="w3-section">
                    {isAuthenticated ? <LoginInfo data={user} onLogout={this.props.logout} /> :<div className="w3-display-middle" style={{width:"100%"}}> <Login onLogin={this.onLogin}/> </div>} 
                </div>
                <div className="w3-section">
                {isAuthenticated ? <SavedWordsWidget onWordClick={this.onWordClick} onRemove={this.onRemoveWord} wordList={this.props.account.wordList} /> : ""}
                </div> 
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
   return bindActionCreators({ "login": login, "fetchMyWords" :fetchMyWords, logout, removeWord }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AccountView);
