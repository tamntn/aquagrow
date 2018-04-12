import React, { Component } from 'react';
import { Icon } from 'antd';

class MessageList extends Component {
    render() {
        return (
            <div>
                <div className="notification-list-container">
                
                </div>
                <div className="clear-notification">
                    Clear everything&nbsp;&nbsp;<Icon type="close-circle" />
                </div>
            </div>
        )
    }
}

export default MessageList;