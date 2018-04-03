import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import '../style/Register.css';
import logo from '../images/logo/small_01.png';
import RegisterForm from './RegisterForm.jsx';

class RegisterCarousel extends Component {
    render() {
        return (
            <div className="register-container">
                <div className="register-left">
                    <Carousel effect="fade" autoplay>
                        <div className="slide1"></div>
                        <div className="slide2"></div>
                        <div className="slide3"></div>
                    </Carousel>
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

export default RegisterCarousel;