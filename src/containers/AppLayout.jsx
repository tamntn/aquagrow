import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { logout, fetchUser } from '../actions/action_user';
import { Popover, Spin, Layout, Menu, Icon, Avatar, Dropdown, Badge, Card, message } from 'antd';
import logo from '../images/logo/small_01.png';
import HeaderNotifications from './Notification/HeaderNotifications.jsx';
import AppContent from './AppContent.jsx';
import '../style/AppLayout.css';
import tamAvatar from '../images/about/tam.jpg';
import sandipAvatar from '../images/about/sandip.jpg';
import erikAvatar from '../images/about/erik.jpg';
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

// Setup Alert Message Configuration
message.config({
    top: window.innerHeight * 10 / 100,
    duration: 3,
});

class AppLayout extends Component {
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
        this.getMainContentStyle = this.getMainContentStyle.bind(this);
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
            case '/system':
                return ["2"]
            case '/portfolio':
                return ["3"]
            case '/notifications':
                return ["4"]
            case '/reminders':
                return ["5"]
            case '/user':
                return ["6"]
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
            case '/system':
                if (this.state.selectedKeys[0] !== "2") {
                    this.setState({
                        selectedKeys: ["2"]
                    })
                }
                break;
            case '/portfolio':
                if (this.state.selectedKeys[0] !== "3") {
                    this.setState({
                        selectedKeys: ["3"]
                    })
                }
                break;
            case '/notifications':
                if (this.state.selectedKeys[0] !== "4") {
                    this.setState({
                        selectedKeys: ["4"]
                    })
                }
                break;
            case '/reminders':
                if (this.state.selectedKeys[0] !== "5") {
                    this.setState({
                        selectedKeys: ["5"]
                    })
                }
                break;
            case '/user':
                if (this.state.selectedKeys[0] !== "6") {
                    this.setState({
                        selectedKeys: ["6"]
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

    getMainContentStyle() {
        if (this.state.isMobile && !this.state.collapsed) {
            return {
                filter: "brightness(35%)",
                marginLeft: "0"
            }
        } else if (this.state.isMobile && this.state.collapsed) {
            return {
                filter: "brightness(100%)",
                marginLeft: "0"
            }
        } else if (!this.state.isMobile && this.state.collapsed) {
            return {
                marginLeft: "80px"
            }
        } else {
            return {
                marginLeft: "250px"
            }
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const avatarMenu = (
            <Menu onClick={this.onSelectAvatarMenuItem}>
                <Menu.Item>
                    <Link to="/user">
                        <Icon type="user" />
                        <span>Account Information</span>
                    </Link>
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

        const notificationsCount = this.props.user ? (
            this.props.user.notifications.length
            + this.props.user.reminders.length
            + this.props.user.messages.length
        ) : 0

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
                                <Icon type="line-chart" />
                                <span>Dashboard</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/system">
                                <Icon type="poweroff" />
                                <span>System Control</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/portfolio">
                                <Icon type="profile" />
                                <span>Garden Portfolio</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/notifications">
                                <Icon type="shake" />
                                <span>Notifications</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to="/reminders">
                                <Icon type="notification" />
                                <span>Reminders</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
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
                    style={this.getMainContentStyle()}
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
                            <div className="header-item">
                                <Popover
                                    popupClassName="header-notification-popover"
                                    placement="bottomRight"
                                    content={<HeaderNotifications />}
                                    trigger="click"
                                    arrowPointAtCenter
                                >
                                    <Badge count={notificationsCount}>
                                        <Icon type="bell" style={{ fontSize: "24px" }} />
                                    </Badge>
                                </Popover>
                            </div>
                            <div className="header-item">
                                <Dropdown overlay={avatarMenu}>
                                    <div>
                                        <Avatar
                                            src={this.props.user ? this.props.user.pictureUrl : null}
                                            style={{ backgroundColor: '#fff' }}
                                            size="large"
                                        >
                                            <Spin size="small" />
                                        </Avatar>
                                        {/* <span style={{ paddingLeft: "5px", color: "#595959", fontSize:"15px", fontWeight:"500" }}>
                                            {this.props.user.name}
                                        </span> */}
                                    </div>
                                </Dropdown>
                            </div>
                        </div>
                    </Header>
                    <Content className="inner-content-container">
                        <AppContent location={this.props.history.location.pathname} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        <h4>AquaGrow ©2018</h4>
                        <div className="footer-avatar-wrapper" >
                            {/* Tam Nguyen */}
                            <Popover
                                popupClassName="footer-avatar-popover"
                                placement="top"
                                arrowPointAtCenter
                                content={
                                    <Card
                                        style={{ maxWidth: 200 }}
                                        cover={<img alt="example" src={tamAvatar} />}
                                    >
                                        <Meta
                                            title="Tam Nguyen"
                                            description="Software Developer"
                                            style={{ textAlign: "center" }}
                                        />
                                    </Card>
                                }>
                                <Avatar
                                    src={tamAvatar}
                                ></Avatar>
                            </Popover>
                            {/* Erik Hodges */}
                            <Popover
                                popupClassName="footer-avatar-popover"
                                placement="top"
                                arrowPointAtCenter
                                content={
                                    <Card
                                        style={{ maxWidth: 200 }}
                                        cover={<img alt="example" src={erikAvatar} />}
                                    >
                                        <Meta
                                            title="Erik Hodges"
                                            description="Project Sponsor"
                                            style={{ textAlign: "center" }}
                                        />
                                    </Card>
                                }>
                                <Avatar
                                    src={erikAvatar}
                                ></Avatar>
                            </Popover>
                            {/* Sandip Gautam */}
                            <Popover
                                popupClassName="footer-avatar-popover"
                                placement="top"
                                arrowPointAtCenter
                                content={
                                    <Card
                                        style={{ maxWidth: 200 }}
                                        cover={<img alt="example" src={sandipAvatar} />}
                                    >
                                        <Meta
                                            title="Sandip Gautam"
                                            description="Hardware Developer"
                                            style={{ textAlign: "center" }}
                                        />
                                    </Card>
                                }>
                                <Avatar
                                    src={sandipAvatar}
                                ></Avatar>
                            </Popover>
                        </div>
                    </Footer>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppLayout));