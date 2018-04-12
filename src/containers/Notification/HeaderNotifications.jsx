import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Icon } from 'antd';
import NotificationList from './NotificationList.jsx';
import ReminderList from './ReminderList.jsx';
import MessageList from './MessageList.jsx';
import './HeaderNotifications.css';
const TabPane = Tabs.TabPane;

class HeaderNotifications extends Component {
    render() {
        const tabs = {
            notifications: `Notifications (${this.props.notifications.length})`,
            reminders: `Reminders (${this.props.reminders.length})`,
            messages: `Messages (${this.props.messages.length})`,
        }
        return (
            <Tabs defaultActiveKey="1" className="notification-tab">
                <TabPane tab={tabs.notifications} key="1">
                    <NotificationList />
                </TabPane>
                <TabPane tab={tabs.reminders} key="2">
                    <ReminderList />
                </TabPane>
                <TabPane tab={tabs.messages} key="3">
                    <MessageList />
                </TabPane>
            </Tabs>
        )
    }
}

function mapStateToProps(state) {
    return {
        notifications: state.notifications,
        reminders: state.reminders,
        messages: state.messages
    };
}

export default connect(mapStateToProps)(HeaderNotifications);