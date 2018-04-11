import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

class Dashboard extends Component {
    render() {
        return (
            <div>
                {this.props.user ? (
                    <div>
                        <h1>Welcome, {this.props.user.name}</h1>
                    </div>
                ) : (
                        <Spin size="large" />
                    )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Dashboard);