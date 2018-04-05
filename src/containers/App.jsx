import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import DashBoard from './Dashboard.jsx';

// Setup Alert Message Configuration
message.config({
    top: window.innerHeight * 10 / 100,
    duration: 3,
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInitialSetup: "Unknown"
        }
    }

    componentDidUpdate() {
        if (this.props.user.zipCode && this.props.user.phone) {
            this.setState({ userInitialSetup: true })
        } else {
            this.setState({ userInitialSetup: false })
        }
    }

    render() {
        const { userInitialSetup } = this.state;
        const currentJWT = localStorage.getItem('jwt');

        // Redirect back to login page if not logged in
        if (!currentJWT) {
            message.destroy();
            message.error('Please log in first to access your AquaGrow account 😇');
            return <Redirect to='/login' />;
        }

        // render Redirect to /welcome page if user initial setup is not done
        const componentsToRender = userInitialSetup ? (
            <DashBoard />
        ) : (
                <Redirect to='/welcome' />
            )

        return (
            <div>
                {componentsToRender}
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

export default connect(mapStateToProps)(App);