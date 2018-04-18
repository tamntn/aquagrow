import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Spin, Divider } from 'antd';
import { fetchReminders, deleteReminder, clearReminders } from '../../actions/action_reminder.js';
import './Reminder.css';

class Reminders extends Component {
    componentWillMount() {
        const currentUser = localStorage.getItem('username');
        this.props.fetchReminders(currentUser);
    }

    render() {
        return (
            <div>
                <Divider>Reminders</Divider>
                <Row>
                    <Col xs={0} sm={0} md={0} lg={0} xl={3} span={3} ></Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={18} span={18} className="reminder-container">
                        <h2>Notified reminders</h2>
                        <Divider />
                        <h2>Current set reminders</h2>
                        <Divider />
                        <h2>Add a new reminder</h2>
                        <Divider />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={3} span={3} ></Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchReminders,
        deleteReminder,
        clearReminders
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Reminders);