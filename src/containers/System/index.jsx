import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Divider } from 'antd';

class System extends Component {
    render() {
        return (
            <div>
                <Divider>System Control</Divider>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(System);