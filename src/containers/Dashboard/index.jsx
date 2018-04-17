import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Divider } from 'antd';

class Dashboard extends Component {
    render() {
        return (
            <div>
                {this.props.user ? (
                    <div>
                        <Divider>Welcome, {this.props.user.name}</Divider>
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