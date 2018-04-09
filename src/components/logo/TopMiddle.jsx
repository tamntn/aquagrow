import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo/small_01.png';
import '../../style/Logo.css';

const TopMiddleLogo = () => (
    <div className="top-middle-logo-container">
        <Link to="/">
            <img src={logo} alt="" height="54" width="54" />
            <span className="logo-text">&nbsp;AquaGrow</span>
        </Link>
    </div>
)

export default TopMiddleLogo;