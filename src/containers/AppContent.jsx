import React, { Component } from 'react';
import Dashboard from './Dashboard';
import System from './System';
import Portfolio from './Portfolio';
import Notifications from './Notification';
import Reminders from './Reminders';
import Account from './Account';

class AppContent extends Component {
    render() {
        return (
            <div>
                {
                    this.props.location === "/"
                    &&
                    <Dashboard />
                }
                {
                    this.props.location === "/system"
                    &&
                    <System />
                }
                {
                    this.props.location === "/portfolio"
                    &&
                    <Portfolio />
                }
                {
                    this.props.location === "/notifications"
                    &&
                    <Notifications />
                }
                {
                    this.props.location === "/reminders"
                    &&
                    <Reminders />
                }
                {
                    this.props.location === "/user"
                    &&
                    <Account />
                }
            </div>
        )
    }
}

export default AppContent;