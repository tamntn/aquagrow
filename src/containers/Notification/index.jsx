import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { fetchNotifications, deleteNotification, clearNotifications } from '../../actions/action_notification.js';
import { fetchUser } from '../../actions/action_user';
import {
    Spin,
    Divider,
    Row,
    Col,
    List,
    Avatar,
    Icon
} from 'antd';
import './Notification.css';

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

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingNotifications: true
        }
        this.onDeleteItemClick = this.onDeleteItemClick.bind(this);
    }

    componentWillMount() {
        const currentUser = localStorage.getItem('username');
        this.props.fetchNotifications(currentUser);
    }

    componentDidUpdate() {
        if (this.state.loadingNotifications === true) {
            this.setState({
                loadingNotifications: false
            })
        }
    }

    onDeleteItemClick(key) {
        this.props.deleteNotification(localStorage.getItem('username'), key, () => {
            this.props.fetchUser(localStorage.getItem('username'));
        });
        this.setState({
            loadingNotifications: true
        })
    }

    render() {
        return (
            <div>
                <Divider>System Notifications</Divider>
                <Row>
                    <Col xs={0} sm={0} md={0} lg={0} xl={3} span={3} ></Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={18} span={18} className="notification-container">
                        <h2>Notifications ({this.props.notifications.length})</h2>
                        <Divider />
                        <List
                            loading={this.state.loadingNotifications}
                            itemLayout="horizontal"
                            dataSource={this.props.notifications}
                            renderItem={item => (
                                <List.Item actions={[<div onClick={() => this.onDeleteItemClick(item._id)}><Icon type="close-circle-o" /></div>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            style={{ backgroundColor: iconBackground[item.type], fontWeight: "900" }}
                                            icon={icons[item.type]}
                                        />}
                                        title={`[${item.aspect.toUpperCase()}] ${item.message}`}
                                        description={moment(item.createdAt).format("HH:mm:ss (ddd, MMM DD)")}
                                    />
                                </List.Item>
                            )}
                        />

                        <br></br>
                        <h2>Notifications Settings</h2>
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
        user: state.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);