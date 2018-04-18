import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Divider } from 'antd';

class Notifications extends Component {
    render() {
        return (
            <div>
                <Divider>Notifications</Divider>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Notifications);