import React, { Component } from 'react';
import { Tabs } from 'antd';
import './HeaderNotifications.css';
const TabPane = Tabs.TabPane;

class HeaderNotifications extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="1" className="notification-tab">
                <TabPane tab="System Notice" key="1">
                    <div className="notification-list-container">
                        <h1>You have reviewed all notifications</h1>
                        <h1>You have reviewed all notifications</h1>
                        <h1>You have reviewed all notifications</h1>
                        <h1>You have reviewed all notifications</h1>
                    </div>
                    <div className="clear-notification">
                        Clear everything
                    </div>
                </TabPane>
                <TabPane tab="Reminders" key="2">
                    <h1>You have no reminders</h1>
                </TabPane>
                <TabPane tab="Messages" key="3">
                    <h1>You have no messages</h1>
                </TabPane>
            </Tabs>
        )
    }
}

export default HeaderNotifications;