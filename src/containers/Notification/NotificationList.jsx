import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Icon, Avatar, Popconfirm } from 'antd';
import { fetchNotifications, deleteNotification, clearNotifications } from '../../actions/action_notification';
import { fetchUser } from '../../actions/action_user';

class NotificationList extends Component {
    constructor(props) {
        super(props);
        this.onClearAllClick = this.onClearAllClick.bind(this);
        this.onDeleteItemClick = this.onDeleteItemClick.bind(this);
    }

    componentWillMount() {
        const currentUser = localStorage.getItem('username');
        this.props.fetchNotifications(currentUser);
    }

    onDeleteItemClick(key) {
        this.props.deleteNotification(localStorage.getItem('username'), key, () => {
            this.props.fetchUser(localStorage.getItem('username'));
        });
    }

    onClearAllClick() {
        this.props.clearNotifications(localStorage.getItem('username'), () => {
            this.props.fetchUser(localStorage.getItem('username'));
        });
    }

    render() {
        const itemDelete = (
            <Popconfirm
                placement="bottomRight"
                title="Delete this item?"
                okText="Yes"
                cancelText="No"
            >
                <a><Icon type="close-circle-o" /></a>
            </Popconfirm>
        )

        return (
            <div>
                <div className="notification-list-container">
                    <List
                        loading={this.props.notifications.length === 0}
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={this.props.notifications}
                        renderItem={item => (
                            <List.Item actions={[<div onClick={() => this.onDeleteItemClick(item._id)}><Icon type="close-circle-o" /></div>]}>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={item.message}
                                    description="testte aldjfkl adljf lakdlfkja ldkj glakjdlgk ajdglka lkgaksdj kjlkj"
                                />
                                {/* <div>content</div> */}
                            </List.Item>
                        )}
                    />
                </div>
                <div className="clear-notification" onClick={this.onClearAllClick}>
                    Clear everything&nbsp;&nbsp;<Icon type="close-circle" />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        notifications: state.notifications
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchNotifications,
        deleteNotification,
        clearNotifications,
        fetchUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);