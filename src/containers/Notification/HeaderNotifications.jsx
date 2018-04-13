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
        console.log(this.props.user);
        const tabs = {
            notifications: `Notifications (${this.props.user.notifications.length})`,
            reminders: `Reminders (0)`,
            messages: `Messages (${this.props.user.messages.length})`,
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
        user: state.user
    };
}

export default connect(mapStateToProps)(HeaderNotifications);