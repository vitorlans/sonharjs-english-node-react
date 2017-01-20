import React, {Component, PropTypes} from 'react';
import Login  from 'shared/components/LoginWidget';
import SavedWordsWidget from 'shared/components/SavedWordsWidget';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { fetchMyWords } from 'actions/word-action';
import { login } from 'actions/user-action';



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
                    {isAuthenticated ? <div className="w3-panel w3-card-2">
                        <header className="w3-container w3-text-theme">
                        <h3>Who are you?</h3>
                        </header>
                        <section className="w3-container">
                        <p><b>Name:</b> {user.name} </p>
                        <p><b>Credential:</b> {user.credential} </p>
                        </section>
                        </div> : <Login onLogin={this.onLogin}/>} 
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
   return bindActionCreators({ "login": login, "fetchMyWords" :fetchMyWords }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AccountView);
