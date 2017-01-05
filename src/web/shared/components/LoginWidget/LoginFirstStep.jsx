import React, {Component} from 'react';

class LoginFirstStep extends Component {
    constructor(props) {
        super(props);
        
        this.onClick = this.onClick.bind(this);
    }
    

    onClick(e){
        e.preventDefault();

        if(this.props.onNext)
            this.props.onNext();
    }
    render() {
        return (
            <div>
                <form className="w3-container">
                    <p>
                    <label className="w3-label w3-text-theme"><b>Email: </b></label>
                        <input className="w3-input" type="email" name="email"/>
                    </p>
                    <p>
                        <button className="w3-btn-block w3-theme-l2" onClick={this.onClick}>Next</button>
                    </p>
                </form>
            </div>
        );
    }
}

export default LoginFirstStep;