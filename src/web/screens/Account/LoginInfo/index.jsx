import React, {Component} from 'react';

class LoginInfo extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.onLogout = this.onLogout.bind(this);
    }
    
    onLogout(e){
        e.preventDefault();

        if(this.props.onLogout)
            this.props.onLogout();
    }

    render() {
        return (
            <div className="w3-panel w3-content w3-card-2" style={{ "maxWidth": "463px"}}>
                <header className="w3-text-theme">
                    <h4>Who are you?</h4>
                    <hr/>
                </header>
                <section>
                    <p>
                        <b>Name: </b>
                        {this.props.data.name}
                    </p>
                    <p>
                        <b>Credential: </b>
                        {this.props.data.credential}
                    </p>
                </section>
                <footer className=" w3-margin-bottom w3-right">
                    <div className="">
                        <button className="w3-btn w3-theme-l4" onClick={this.onLogout}>Logout</button>
                    </div>
                </footer>
            </div>
        );
    }
}

LoginInfo.propTypes = {
    data: React.PropTypes.object.isRequired,
    onLogout: React.PropTypes.func
};
export default LoginInfo;
