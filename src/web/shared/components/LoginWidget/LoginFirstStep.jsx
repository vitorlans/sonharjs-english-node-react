import React, {Component} from 'react';

class LoginFirstStep extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: this.props.data.email
        };

        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onClick(e){
        e.preventDefault();

        if(this.props.onNext)
            this.props.onNext(this.state.email);
    }
    render() {
        return (
            <div>
                <form className="w3-container" onSubmit={(e) => {e.preventDefault();}}>
                    <p>
                    <label className="w3-label w3-text-theme"><b>Email: </b></label>
                        <input className="w3-input" type="email" name="email" 
                            onChange={this.onChange}
                            value={this.state.email}
                        />
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