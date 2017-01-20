import React, {Component} from 'react';
import { keyCodes } from '../../utils/keyCodes';

class LoginSecondStep extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: ''
        };
        this.onClickPrev = this
            .onClickPrev
            .bind(this);
        this.onChange = this
            .onChange
            .bind(this);
        this.onLogin = this
            .onLogin
            .bind(this);
        this.onKeyDown = this
            .onKeyDown
            .bind(this);
    }

    onClickPrev(e) {
        e.preventDefault();

        if (this.props.onPrev) 
            this.props.onPrev();
        }
    
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onLogin(e) {
        e.preventDefault();

        if (this.props.onLogin) 
            this.props.onLogin(this.state.password);
        }
    
    onKeyDown(e) {
        const key = e.which || e.keyCode;
        switch (key) {
            case keyCodes.ENTER:
                this.onLogin(e);
                break;
        }
    }
    render() {
        return (
            <div>
                <form className="w3-container" onSubmit={(e) => {e.preventDefault();}}>
                    <p className="w3-center">
                        <label className="w3-text-theme">Enter password for {this.props.data.email}</label>
                    </p>
                    <p>
                        <label className="w3-label w3-text-theme">
                            <b>Password:
                            </b>
                        </label>
                        <input
                            className="w3-input"
                            type="password"
                            name="password"
                            autoFocus="true"
                            tabIndex="1"
                            onChange={this.onChange}
                            onKeyDown={this.onKeyDown}
                            value={this.state.password}/>
                    </p>

                    <div className="w3-row">
                        <div className="w3-col s6 padding-right-2">
                            <button className="w3-btn-block w3-theme-l4" tabIndex="3" onClick={this.onClickPrev}>Previous</button>

                        </div>
                        <div className="w3-col s6 padding-left-2">
                            <button className="w3-btn-block w3-theme-l2" tabIndex="2" onClick={this.onLogin}>Log In</button>

                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginSecondStep;