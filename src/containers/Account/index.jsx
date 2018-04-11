import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

class Account extends Component {
    render() {
        return (
            <div>
                <h1>Account Information</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Account);