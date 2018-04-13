import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Icon, Avatar } from 'antd';
import { fetchReminders, deleteReminder, clearReminders } from '../../actions/action_reminder';
import { fetchUser } from '../../actions/action_user';

class ReminderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // loading: true
            loading: false
        }
        this.onClearAllClick = this.onClearAllClick.bind(this);
        this.onDeleteItemClick = this.onDeleteItemClick.bind(this);
    }

    componentWillMount() {
        const currentUser = localStorage.getItem('username');
        this.props.fetchReminders(currentUser);
    }

    componentDidUpdate() {
        if (this.state.loading === true) {
            this.setState({
                loading: false
            })
        }
    }

    onDeleteItemClick(key) {
        this.props.deleteReminder(localStorage.getItem('username'), key, () => {
            this.props.fetchUser(localStorage.getItem('username'));
        });
        this.setState({
            loading: true
        })
    }

    onClearAllClick() {
        this.props.clearReminders(localStorage.getItem('username'), () => {
            this.props.fetchUser(localStorage.getItem('username'));
        });
    }

    render() {
        return (
            <div>
                {
                    !this.state.loading && this.props.reminders.length === 0 ?
                        (
                            <div className="empty-list-container">
                                <img src="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg" alt="empty" width="96" height="96" />
                                <p>You've got no reminders!</p>
                            </div>
                        )
                        :
                        (
                            <div>
                                <div className="notification-list-container">
                                    <List
                                        loading={this.state.loading}
                                        itemLayout="horizontal"
                                        dataSource={this.props.reminders}
                                        renderItem={item => (
                                            <List.Item actions={[<div onClick={() => this.onDeleteItemClick(item._id)}><Icon type="close-circle-o" /></div>]}>
                                                <List.Item.Meta
                                                    avatar={<Avatar src="http://icons.iconarchive.com/icons/martz90/circle/512/messages-icon.png" />}
                                                    title={item.sender}
                                                    description={item.message}
                                                />
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        reminders: state.reminders
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchReminders,
        deleteReminder,
        clearReminders,
        fetchUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderList);