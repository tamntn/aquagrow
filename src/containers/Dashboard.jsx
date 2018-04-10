import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { logout, fetchUser } from '../actions/action_user';
import { Button, Spin, Layout, Menu, Icon, Avatar, Dropdown, message } from 'antd';
import logo from '../images/logo/small_01.png'
import '../style/Dashboard.css';
// Test
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import FontAwesomeTest from '../components/FontAwesomeTest.jsx';
import NotFound from '../components/404.jsx';
const { Header, Sider, Content } = Layout;

// Setup Alert Message Configuration
message.config({
    top: window.innerHeight * 10 / 100,
    duration: 3,
});

class SiderDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            isMobile: true,
            selectedKeys: ["1"]
        }

        this.updateCollapsedWidth = this.updateCollapsedWidth.bind(this);
        this.selectMenuItem = this.selectMenuItem.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleMainContentClick = this.handleMainContentClick.bind(this);
        this.handleMainContentClick = this.handleMainContentClick.bind(this);
        this.handleAvatarMenuClick = this.handleAvatarMenuClick.bind(this);
    }

    componentWillMount() {
        this.updateCollapsedWidth();

        const currentUser = localStorage.getItem('username');
        if (currentUser) {
            this.props.fetchUser(currentUser);
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateCollapsedWidth);
    }

    // Logout and redirect to /login page
    handleLogout() {
        this.props.logout(() => {
            this.props.history.push('/login');
        });
    }

    // If device is mobile, update collapsed width to 0
    updateCollapsedWidth() {
        const deviceWidth = window.innerWidth;
        if (deviceWidth <= 576) {
            this.setState({
                isMobile: true,
                collapsed: true
            })
        } else {
            this.setState({
                isMobile: false
            })
        }
    }

    selectMenuItem(values) {
        if (this.state.isMobile) {
            this.setState({
                collapsed: this.state.isMobile,
                selectedKeys: [values.key]
            })
        } else {
            this.setState({
                selectedKeys: [values.key]
            })
        }
    }

    handleMainContentClick() {
        if (this.state.isMobile && !this.state.collapsed) {
            this.setState({
                collapsed: true
            })
        }
    }

    handleAvatarMenuClick(values) {
        if (values.key === "logout") {
            this.handleLogout();
        }
    }

    getMainContentStyle() {
        if (this.state.isMobile && !this.state.collapsed) {
            return { filter: "brightness(70%)" }
        } else {
            return { filter: "brightness(100%)" }
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const avatarMenu = (
            <Menu className="avatar-menu" onClick={this.handleAvatarMenuClick}>
                <Menu.Item disabled>
                    <Icon type="user" />Account Information
                </Menu.Item>
                <Menu.Item disabled>
                    <Icon type="setting" />Account Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout" style={{ color: "red" }} >
                    <Icon type="logout" />Log out
                </Menu.Item>
            </Menu>
        );

        return (
            <Layout className="layout-container">
                <Sider
                    className="sider-container"
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    collapsedWidth={this.state.isMobile ? 0 : 80}
                >
                    <div className="logo" >
                        <Link to="/">
                            <img src={logo} alt="" width="54" height="54" />
                        </Link>
                    </div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={this.state.selectedKeys}
                        selectedKeys={this.state.selectedKeys}
                        onClick={this.selectMenuItem}
                    // style={{ fontSize: "30px" }}
                    >
                        <Menu.Item key="1">
                            <Link to="/">
                                <Icon type="area-chart" />
                                <span>Dashboard</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/">
                                <Icon type="video-camera" />
                                <span>Portfolio</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/">
                                <Icon type="upload" />
                                <span>Notifications</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout
                    className="content-container"
                    onClick={this.handleMainContentClick}
                    //TODO: update layout color based on state
                    style={this.state.isMobile && !this.state.collapsed ? {
                        filter: "brightness(70%)"
                    } : {
                            filter: "brightness(100%)"
                        }}
                >
                    <Header className="header-container">
                        <div className="header-left">
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </div>
                        <div className="header-right">
                            <Dropdown overlay={avatarMenu}>
                                <Avatar
                                    src={this.props.user ? this.props.user.pictureUrl : null}
                                    style={{ backgroundColor: '#fff' }}
                                    size="large"
                                >
                                    <Spin size="small" />
                                </Avatar>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <div>
                            {this.props.user ? (
                                <div>
                                    <h1>Welcome, {this.props.user.name}</h1>
                                </div>
                            ) : (
                                    <Spin size="large" />
                                )}
                        </div>
                    </Content>
                </Layout>
            </Layout >
        );
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logout, fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SiderDemo));