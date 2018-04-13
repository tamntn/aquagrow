import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Icon, Avatar, Tooltip } from 'antd';
import moment from 'moment';
import { fetchMessages, deleteMessage, clearMessages } from '../../actions/action_message';
import { fetchUser } from '../../actions/action_user';
import messageLogo from '../../images/png/message.png';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        this.onClearAllClick = this.onClearAllClick.bind(this);
        this.onDeleteItemClick = this.onDeleteItemClick.bind(this);
    }

    componentWillMount() {
        const currentUser = localStorage.getItem('username');
        this.props.fetchMessages(currentUser);
    }

    componentDidUpdate() {
        if (this.state.loading === true) {
            this.setState({
                loading: false
            })
        }
    }

    onDeleteItemClick(key) {
        this.props.deleteMessage(localStorage.getItem('username'), key, () => {
            this.props.fetchUser(localStorage.getItem('username'));
        });
        this.setState({
            loading: true
        })
    }

    onClearAllClick() {
        this.props.clearMessages(localStorage.getItem('username'), () => {
            this.props.fetchUser(localStorage.getItem('username'));
        });
    }

    render() {
        return (
            <div>
                {
                    !this.state.loading && this.props.messages.length === 0 ?
                        (
                            <div className="empty-list-container">
                                <img src="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg" alt="empty" width="96" height="96" />
                                <p>You've got no messages!</p>
                            </div>
                        )
                        :
                        (
                            <div>
                                <div className="notification-list-container">
                                    <List
                                        loading={this.state.loading}
                                        itemLayout="horizontal"
                                        dataSource={this.props.messages}
                                        renderItem={item => (
                                            item.message.length > 70 ?
                                                (
                                                    <Tooltip placement="bottom" title={item.message} arrowPointAtCenter>
                                                        <List.Item actions={[<div onClick={() => this.onDeleteItemClick(item._id)}><Icon type="close-circle-o" /></div>]}>
                                                            <List.Item.Meta
                                                                avatar={<Avatar size="small" style={{ backgroundColor: '#52c41a' }}>{item.sender[0]}</Avatar>}
                                                                title={item.sender}
                                                                description={`${item.message.slice(0, 70)} .....`}
                                                            />
                                                            <div>{moment(item.createdAt).format("MM/DD HH:mm")}</div>
                                                        </List.Item>
                                                    </Tooltip>
                                                )
                                                :
                                                (
                                                    <List.Item actions={[<div onClick={() => this.onDeleteItemClick(item._id)}><Icon type="close-circle-o" /></div>]}>
                                                        <List.Item.Meta
                                                            avatar={<Avatar size="small" style={{ backgroundColor: '#52c41a' }}>{item.sender[0]}</Avatar>}
                                                            title={item.sender}
                                                            description={item.message}
                                                        />
                                                        <div>{moment(item.createdAt).format("MM/DD HH:mm")}</div>
                                                    </List.Item>
                                                )
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
        messages: state.messages
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchMessages,
        deleteMessage,
        clearMessages,
        fetchUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);