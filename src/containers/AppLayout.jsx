import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { logout, fetchUser } from '../actions/action_user';
import { Popover, Spin, Layout, Menu, Icon, Avatar, Dropdown, Badge, message } from 'antd';
import logo from '../images/logo/small_01.png'
import AppContent from './AppContent.jsx';
import '../style/AppLayout.css';
const { Header, Sider, Content } = Layout;

// Setup Alert Message Configuration
message.config({
    top: window.innerHeight * 10 / 100,
    duration: 3,
});

class AppLayou extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            isMobile: true,
            selectedKeys: this.setInitialSelectedKeys()
        }

        this.isMobile = this.isMobile.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.onSelectSidebarMenuItem = this.onSelectSidebarMenuItem.bind(this);
        this.onSelectAvatarMenuItem = this.onSelectAvatarMenuItem.bind(this);
        this.handleMainContentClick = this.handleMainContentClick.bind(this);
    }

    componentWillMount() {
        this.isMobile();
        const currentUser = localStorage.getItem('username');
        if (currentUser) {
            this.props.fetchUser(currentUser);
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.isMobile);
    }

    componentWillUpdate() {
        this.setSelectedKeysFromHistoryLocation();
    }

    // If device is mobile, update collapsed width to 0
    isMobile() {
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

    // Set selected keys when page first loads 
    setInitialSelectedKeys() {
        switch (this.props.history.location.pathname) {
            case '/':
                return ["1"]
            case '/portfolio':
                return ["2"]
            case '/user':
                return ["3"]
            default:
                return ["1"]
        }
    }

    // Update selected keys when URL changes
    setSelectedKeysFromHistoryLocation() {
        switch (this.props.history.location.pathname) {
            case '/':
                if (this.state.selectedKeys[0] !== "1") {
                    this.setState({
                        selectedKeys: ["1"]
                    })
                }
                break;
            case '/portfolio':
                if (this.state.selectedKeys[0] !== "2") {
                    this.setState({
                        selectedKeys: ["2"]
                    })
                }
                break;
            case '/user':
                if (this.state.selectedKeys[0] !== "3") {
                    this.setState({
                        selectedKeys: ["3"]
                    })
                }
                break;
            default:
                break;
        }
    }

    // Logout and redirect to /login page
    handleLogout() {
        this.props.logout(() => {
            this.props.history.push('/login');
        });
    }

    onSelectSidebarMenuItem(values) {
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

    onSelectAvatarMenuItem(values) {
        if (values.key === "logout") {
            this.handleLogout();
        }
    }

    handleMainContentClick() {
        if (this.state.isMobile && !this.state.collapsed) {
            this.setState({
                collapsed: true
            })
        }
    }

    // getMainContentStyle() {
    //     if (this.state.isMobile && !this.state.collapsed) {
    //         return { filter: "brightness(70%)" }
    //     } else {
    //         return { filter: "brightness(100%)" }
    //     }
    // }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const avatarMenu = (
            <Menu className="avatar-menu" onClick={this.onSelectAvatarMenuItem}>
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
                    width={250}
                    className="sider-container"
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    collapsedWidth={this.state.isMobile ? 0 : 80}
                >
                    <div className="logo" >
                        <Link to="/">
                            <img src={logo} alt="" width="54" height="54" />
                            {/* {this.state.collapsed ? null : <span className="logo-text">&nbsp;AquaGrow</span>} */}
                        </Link>
                    </div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={this.state.selectedKeys}
                        selectedKeys={this.state.selectedKeys}
                        onClick={this.onSelectSidebarMenuItem}
                    // style={{ fontSize: "30px" }}
                    >
                        <Menu.Item key="1">
                            <Link to="/">
                                <Icon type="area-chart" />
                                <span>Dashboard</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/portfolio">
                                <Icon type="profile" />
                                <span>Your Portfolio</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/user">
                                <Icon type="user" />
                                <span>Your Profile</span>
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
                            <div className="header-notification">
                                {/* TODO: Implement notifications popover content */}
                                <Popover placement="bottomRight" content="Notifications Content" trigger="click">
                                    <Badge count={0} showZero>
                                        <Icon type="bell" style={{ fontSize: "24px" }} />
                                        <a href="#" className="head-example" />
                                    </Badge>
                                </Popover>
                            </div>
                            <div>
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
                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <AppContent location={this.props.history.location.pathname} />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logout, fetchUser }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppLayou));