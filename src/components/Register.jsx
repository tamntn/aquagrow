import React, { Component } from 'react';
import { Carousel } from 'antd';
import '../style/Register.css';
import logo from '../images/logo/small_01.png';

class RegisterCarousel extends Component {
    render() {
        return (
            <div className="register-container">
                <div className="left">
                    <Carousel effect="fade" autoplay>
                        <div className="slide1"></div>
                        <div className="slide2"></div>
                        <div className="slide3"></div>
                    </Carousel>
                </div>
                <div className="right">
                    <div className="register-logo-container">
                        <img src={logo} height="64" width="64" />
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterCarousel;