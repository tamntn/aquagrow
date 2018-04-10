import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../actions/action_user';
import { Redirect } from 'react-router-dom';
import { Spin, message } from 'antd';
import DashBoard from './Dashboard.jsx';
import Welcome from './Welcome.jsx';
import '../style/App.css';

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
        this.setUserInitialSetupToTrue = this.setUserInitialSetupToTrue.bind(this);
    }

    componentWillMount() {
        const currentUser = localStorage.getItem('username');
        if (currentUser) {
            this.props.fetchUser(currentUser);
        }
    }

    componentDidUpdate() {
        if (this.state.userInitialSetup === "Unknown") {
            if (this.props.user.zipCode && this.props.user.phone) {
                this.setState({ userInitialSetup: true })
            } else {
                this.setState({ userInitialSetup: false })
            }
        }
    }

    setUserInitialSetupToTrue() {
        this.setState({ userInitialSetup: true });
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

        return (
            <div>
                {
                    userInitialSetup === "Unknown"
                    &&
                    <div className="spinner-center">
                        <Spin size="large" />
                    </div>
                }
                {
                    userInitialSetup === false
                    &&
                    <Welcome setUserInitialSetupToTrue={this.setUserInitialSetupToTrue} />
                }
                {
                    userInitialSetup === true
                    &&
                    <DashBoard />
                }
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);