import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Divider } from 'antd';

class Portfolio extends Component {
    render() {
        return (
            <div>
                <Divider>Portfolio</Divider>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Portfolio);