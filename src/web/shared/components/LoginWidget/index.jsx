import React from 'react';
import LoginFirst from './LoginFirstStep';
import LoginSecond from './LoginSecondStep';

class LoginWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { step: 1, email: '', password: '' };

    this.onNext = this.onNext.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onNext(email){
    this.setState({step : this.state.step + 1, email: email});
  }

  onPrev(){
    this.setState({step : this.state.step - 1});
  }

  onLogin(password){
    this.setState({password: password});

    if(this.props.onLogin)
        this.props.onLogin({ credential: this.state.email, password: password});
  }

  showStep(){

    switch (this.state.step){
        case 1:
          return <LoginFirst onNext={this.onNext} data={this.state} />;
        
        case 2:
          return <LoginSecond onPrev={this.onPrev} data={this.state} onLogin={this.onLogin} />;
    }
      
  }

  render() {
    return (
      <div className="login-container w3-content">
        <h2 className="w3-center"><b>Log In</b></h2>
        {this.showStep()}
      </div>
    );
  }
}

export default LoginWidget;