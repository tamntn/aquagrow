import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Carousel, Spin } from 'antd';
import '../style/Register.css';
import logo from '../images/logo/small_01.png';
import RegisterForm from './RegisterForm.jsx';

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
                    <div className="register-logo-container">
                        <Link to="/">
                            <img src={logo} alt="" height="64" width="64" />
                        </Link>
                    </div>
                    <div className="register-form-container">
                        <h1>Welcome to AquaGrow</h1>
                        <br></br>
                        <RegisterForm />
                        Already have an account? <Link to="/login">Log in</Link>
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn,
        user: state.user
    };
}

export default connect(mapStateToProps)(Register);