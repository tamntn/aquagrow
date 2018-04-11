import React, { Component } from 'react';
import Dashboard from './Dashboard';
import Portfolio from './Portfolio';
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
                    this.props.location === "/portfolio"
                    &&
                    <Portfolio />
                }{
                    this.props.location === "/user"
                    &&
                    <Account />
                }
            </div>
        )
    }
}

export default AppContent;