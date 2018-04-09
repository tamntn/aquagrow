import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Carousel, Spin } from 'antd';
import '../style/Register.css';
import RegisterForm from './RegisterForm.jsx';
import TopMiddleLogo from '../components/logo/TopMiddle.jsx';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 1000);
    }

    render() {
        // If user is loged in (JWT stored in localStorage), redirect to homepage
        if (localStorage.getItem('jwt')) {
            return <Redirect to='/' />;
        }

        // Show a Spinner before images are loaded
        const leftColumn = this.state.isLoading ? (
            <div className="register-spin-container">
                <Spin size="large" />
            </div>
        ) : (
                <Carousel effect="fade" autoplay>
                    <div className="slide1"></div>
                    <div className="slide2"></div>
                    <div className="slide3"></div>
                </Carousel>
            )

        return (
            <div className="register-container">
                <div className="register-left">
                    {leftColumn}
                </div>
                <div className="register-right">
                    <TopMiddleLogo />
                    <div className="register-form-container">
                        <h1>Create your account</h1>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn
    };
}

export default connect(mapStateToProps)(Register);