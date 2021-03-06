import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Icon, Avatar, Tooltip } from 'antd';
import moment from 'moment';
import { fetchNotifications, deleteNotification, clearNotifications } from '../../actions/action_notification';
import { fetchUser } from '../../actions/action_user';
// import errorLogo from '../../images/png/error.png';
// import warningLogo from '../../images/png/warning.png';
// import successLogo from '../../images/png/success.png';

// const logos = {
//     error: errorLogo,
//     warning: warningLogo,
//     success: successLogo
// }

const icons = {
    error: "close",
    warning: "exclamation",
    success: "check"
}

const iconBackground = {
    error: "#f5222d",
    warning: "#faad14",
    success: "#52c41a",
}

class NotificationList extends Component {
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
        this.props.fetchNotifications(currentUser);
    }

    componentDidUpdate() {
        if (this.state.loading === true) {
            this.setState({
                loading: false
            })
        }
    }

    onDeleteItemClick(key) {
        this.props.deleteNotification(localStorage.getItem('username'), key, () => {
            this.props.fetchUser(localStorage.getItem('username'));
        });
        this.setState({
            loading: true
        })
    }

    onClearAllClick() {
        this.props.clearNotifications(localStorage.getItem('username'), () => {
            this.props.fetchUser(localStorage.getItem('username'));
        });
    }

    render() {
        // const itemDelete = (
        //     <Popconfirm
        //         placement="bottomRight"
        //         title="Delete this item?"
        //         okText="Yes"
        //         cancelText="No"
        //     >
        //         <a><Icon type="close-circle-o" /></a>
        //     </Popconfirm>
        // )

        return (
            <div>
                {
                    !this.state.loading && this.props.notifications.length === 0 ?
                        (
                            <div className="empty-list-container">
                                <img src="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg" alt="empty" width="96" height="96" />
                                <p>You've got no notifications!</p>
                            </div>
                        )
                        :
                        (
                            <div>
                                <div className="notification-list-container">
                                    <List
                                        loading={this.state.loading}
                                        itemLayout="horizontal"
                                        dataSource={this.props.notifications}
                                        renderItem={item => (
                                            item.message.length > 75 ?
                                                (
                                                    <Tooltip placement="bottom" title={item.message} arrowPointAtCenter>
                                                        <List.Item actions={[<div onClick={() => this.onDeleteItemClick(item._id)}><Icon type="close-circle-o" /></div>]}>
                                                            <List.Item.Meta
                                                                avatar={<Avatar
                                                                    size="small"
                                                                    // src={logos[item.type]}
                                                                    style={{ backgroundColor: iconBackground[item.type], fontWeight: "900" }}
                                                                    icon={icons[item.type]}
                                                                />}
                                                                title={`[${item.aspect.toUpperCase()}] ${item.message.slice(0, 70)} .....`}
                                                                description={moment(item.createdAt).format("HH:mm:ss (ddd, MMM DD)")}
                                                            />
                                                        </List.Item>
                                                    </Tooltip>
                                                )
                                                :
                                                (
                                                    <List.Item actions={[<div onClick={() => this.onDeleteItemClick(item._id)}><Icon type="close-circle-o" /></div>]}>
                                                        <List.Item.Meta
                                                            avatar={<Avatar
                                                                size="small"
                                                                // src={logos[item.type]}
                                                                style={{ backgroundColor: iconBackground[item.type], fontWeight: "900" }}
                                                                icon={icons[item.type]}
                                                            />}
                                                            title={`[${item.aspect.toUpperCase()}] ${item.message}`}
                                                            description={moment(item.createdAt).format("HH:mm:ss (ddd, MMM DD)")}
                                                        />
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