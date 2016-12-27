import React from 'react';
import LoginFirst from './LoginFirstStep';
import LoginSecond from './LoginSecondStep';

class LoginWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { step: 1, email: '', password: '', passwordConfirmation: '' };


    this.onNext = this.onNext.bind(this);
    this.onPrev = this.onPrev.bind(this);
  }

  onNext(){
    this.setState({step : this.state.step + 1});
  }

  onPrev(){
    this.setState({step : this.state.step - 1});
  }

  showStep(){

    switch (this.state.step){
        case 1:
          return <LoginFirst onNext={this.onNext} />;
        
        case 2:
          return <LoginSecond onPrev={this.onPrev} />;
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