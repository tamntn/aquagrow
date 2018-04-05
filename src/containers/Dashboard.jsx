import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout, fetchUser } from '../actions/action_user';
import { Button, Spin, message } from 'antd';

// Setup Alert Message Configuration
message.config({
    top: window.innerHeight * 10 / 100,
    duration: 3,
});

class DashBoard extends Component {
    componentWillMount() {
        const currentUser = localStorage.getItem('username');
        if (currentUser) {
            this.props.fetchUser(currentUser);
        }
    }

    // Logout and redirect to /login page
    handleLogout = () => {
        this.props.logout(() => {
            this.props.history.push('/login');
        });
    }

    render() {
        // Prevent error when user is not loaded yet
        if (this.props.user) {
            return (
                <div>
                    <h1>Welcome to AquaGrow, {this.props.user.name}</h1>
                    <Button type="danger" onClick={this.handleLogout}>Log out</Button>
                </div>
            )
        } else {
            return (
                <Spin size="large" />
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logout, fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);