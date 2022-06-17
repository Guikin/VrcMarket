import React from 'react'
import './AuthPage.css';
import LoginForm from '../../components/api/LoginForm/LoginForm';
import SignUpForm from '../../components/api/SignUpForm/SignUpform';

export default class AuthPage extends React.Component {
    state = {
      showLogin: true,
    }
  
    render() {
      return (
        <main className="AuthPage d-flex align-items-center justify-content-evenly vh-100 ">
          
          {/* Another ternary operator! */}
          {/* If showLogin is true, show the login form. If false, show the signup form */}

          <iframe className='mx-5' src='https://my.spline.design/interactivespherescopy-b2a4d6c2b798c62e8e5942f4164f4091/' frameborder='0' width='40%' height='70%'></iframe>

           <h3 onClick={() => this.setState({ showLogin: !this.state.showLogin })}>
              {this.state.showLogin ? <p className='display-4'>SIGN UP</p> : <p className='display-4'>LOG IN</p>}
            </h3>

          {this.state.showLogin ? 
          <LoginForm setUserInState={this.props.setUserInState}/> : 
          <SignUpForm setUserInState={this.props.setUserInState} />}
          
           
        
        </main>
      );
    }
  }