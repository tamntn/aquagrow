import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DashBoard extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to AquaGrow</h1>
                <Link to='/register'>Register</Link>
                <br></br>
                <Link to='/login'>Log in</Link>
            </div>
        )
    }
}

export default DashBoard;