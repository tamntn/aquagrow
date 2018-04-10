import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { logout, fetchUser } from '../actions/action_user';
import { Button, Spin, Layout, Menu, Icon, message } from 'antd';
import logo from '../images/logo/small_01.png'
import '../style/Dashboard.css';
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
    handleLogout = () => {
        this.props.logout(() => {
            this.props.history.push('/login');
        });
    }

    // If device is mobile, update collapsed width to 0
    updateCollapsedWidth() {
        const deviceWidth = window.screen.width;
        if (deviceWidth <= 576) {
            this.setState({
                isMobile: true
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

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
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
                        <img src={logo} width="48" height="48" />
                        {/* <span>AquaGrow</span> */}
                    </div>
                    <Menu
                        mode="vertical"
                        defaultSelectedKeys={this.state.selectedKeys}
                        selectedKeys={this.state.selectedKeys}
                        onClick={this.selectMenuItem}
                    >
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <div>
                            {this.props.user ? (
                                <div>
                                    <h1>Welcome to AquaGrow, {this.props.user.name}</h1>
                                    <Button type="danger" onClick={this.handleLogout}>Log out</Button>
                                </div>
                            ) : (
                                    <Spin size="large" />
                                )}
                        </div>
                    </Content>
                </Layout>
            </Layout>
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