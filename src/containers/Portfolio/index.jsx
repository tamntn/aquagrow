import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

class Portfolio extends Component {
    render() {
        return (
            <div>
                <h1>Portfolio</h1>
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