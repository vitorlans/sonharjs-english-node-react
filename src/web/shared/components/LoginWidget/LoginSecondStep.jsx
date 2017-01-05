import React, {Component} from 'react';

class LoginSecondStep extends Component {
    constructor(props) {
        super(props);
        
        this.onClickPrev = this.onClickPrev.bind(this);
    }
    
    onClickPrev(e){
        e.preventDefault();

        if(this.props.onPrev)
            this.props.onPrev();

    }
    
    render() {
        return (
            <div>
                <form className="w3-container">
                    <p className="w3-center">
                        <label className="w3-text-theme">Enter password for vitor_hs@live.com</label>
                        <input className="w3-input" type="email" name="email" style={{"display":"none"}}/>
                    </p>
                    <p>
                        <label className="w3-label w3-text-theme"><b>Password: </b></label>
                        <input className="w3-input" type="password" name="password"/>
                    </p>
                    
                    <div className="w3-row">
                        <div className="w3-col s6 padding-right-2">
                            <button className="w3-btn-block w3-theme-l4" onClick={this.onClickPrev} >Previous</button>
                        </div>
                        <div className="w3-col s6 padding-left-2">
                            <button className="w3-btn-block w3-theme-l2">Log In</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginSecondStep;