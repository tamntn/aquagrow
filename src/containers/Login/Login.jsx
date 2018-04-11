import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BackgroundImage from '../../components/BackgroundImage.jsx';
import TopMiddleLogo from '../../components/logo/TopMiddle.jsx';
import LoginForm from './LoginForm.jsx';
import '../../style/Login.css';

class Login extends Component {
    render() {
        // If user is loged in (JWT stored in localStorage), redirect to homepage
        if (localStorage.getItem('jwt')) {
            return <Redirect to='/' />;
        }

        return (
            <div className="login-container">
                <BackgroundImage />
                <TopMiddleLogo />
                <div className='login-form-container'>
                    <h1>Log in with your account</h1>
                    <LoginForm />
                </div>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn
    };
}

export default connect(mapStateToProps)(Login);