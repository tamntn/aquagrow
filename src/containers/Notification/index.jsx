import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { fetchNotifications, deleteNotification, clearNotifications } from '../../actions/action_notification.js';
import { fetchUser } from '../../actions/action_user';
import { fetchSystemStatus, updateSystemStatus } from '../../actions/action_system.js';
import {
    Spin,
    Divider,
    Row,
    Col,
    List,
    Avatar,
    Icon,
    Button,
    Switch,
    Slider,
    notification
} from 'antd';
import airTempLogo from '../../images/png/airTemp.png';
import airHumidityLogo from '../../images/png/humidity.png';
import lightIntensityLogo from '../../images/png/growLight.png';
import waterTempLogo from '../../images/png/waterTemp.png';
import phLevelLogo from '../../images/png/pH.png';
import growBedLogo from '../../images/png/plantPot.png';
import fishTankLogo from '../../images/png/fishtank.png';
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

const airTempMarks = {
    0: {
        style: {
            color: '#40a9ff',
        },
        label: "0°C"
    },
    10: '10°C',
    20: '20°C',
    30: '30°C',
    40: '40°C',
    50: {
        style: {
            color: '#f50',
        },
        label: "50°C",
    }
}

const airHumidityMarks = {
    0: {
        style: {
            color: '#40a9ff',
        },
        label: "0%"
    },
    25: '25%',
    50: '50%',
    75: '35%',
    100: {
        style: {
            color: '#f50',
        },
        label: "100%",
    }
}

const lightIntensityMarks = {
    0: {
        style: {
            color: '#40a9ff',
        },
        label: "0 lux"
    },
    25000: '25k lux',
    50000: '50k lux',
    65000: {
        style: {
            color: '#f50',
        },
        label: "65k lux",
    }
}

const waterTempMarks = {
    0: {
        style: {
            color: '#40a9ff',
        },
        label: "0°C"
    },
    10: '10°C',
    20: '20°C',
    30: '30°C',
    40: '40°C',
    50: {
        style: {
            color: '#f50',
        },
        label: "50°C",
    }
}

const phLevelMarks = {
    0: {
        style: {
            color: '#f5222d',
        },
        label: "0"
    },
    1: {
        style: {
            color: '#fa541c',
        },
        label: "1"
    },
    2: {
        style: {
            color: '#fa8c16',
        },
        label: "2"
    },
    3: {
        style: {
            color: '#faad14',
        },
        label: "3"
    },
    4: {
        style: {
            color: '#fadb14',
        },
        label: "4"
    },
    5: {
        style: {
            color: '#a0d911',
        },
        label: "5"
    },
    6: {
        style: {
            color: '#a0d911',
        },
        label: "6"
    },
    7: {
        style: {
            color: '#52c41a',
        },
        label: "7"
    },
    8: {
        style: {
            color: '#237804',
        },
        label: "8"
    },
    9: {
        style: {
            color: '#13c2c2',
        },
        label: "9"
    },
    10: {
        style: {
            color: '#1890ff',
        },
        label: "10"
    },
    11: {
        style: {
            color: '#2f54eb',
        },
        label: "11"
    },
    12: {
        style: {
            color: '#1d39c4',
        },
        label: "12"
    },
    13: {
        style: {
            color: '#722ed1',
        },
        label: "13"
    },
    14: {
        style: {
            color: '#531dab',
        },
        label: "14"
    }
}

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingNotifications: true,
            loadingNotificationSettings: true,
            updatingNotificationSettings: false,
            airTempRange: [0, 0],
            airHumidityRange: [0, 0],
            lightIntensityRange: [0, 0],
            waterTempRange: [0, 0],
            phLevelRange: [0, 0]
        }
        this.onDeleteItemClick = this.onDeleteItemClick.bind(this);
        this.handleAirTempRangeChange = this.handleAirTempRangeChange.bind(this);
        this.handleAirHumidityChange = this.handleAirHumidityChange.bind(this);
        this.handleLightIntensityChange = this.handleLightIntensityChange.bind(this);
        this.handleWaterTempChange = this.handleWaterTempChange.bind(this);
        this.handlePhLevelChange = this.handlePhLevelChange.bind(this);
        this.handleClearButton = this.handleClearButton.bind(this);
        this.handleSaveButton = this.handleSaveButton.bind(this);
    }

    componentWillMount() {
        const currentUser = localStorage.getItem('username');
        this.props.fetchNotifications(currentUser);
        this.props.fetchSystemStatus(currentUser);
    }

    componentDidUpdate() {
        if (this.state.loadingNotifications === true) {
            this.setState({
                loadingNotifications: false
            })
        }
        if (this.state.loadingNotificationSettings === true && this.props.system) {
            this.setState({
                loadingNotificationSettings: false,
                airTempRange: this.props.system.airTempRange,
                airHumidityRange: this.props.system.airHumidityRange,
                lightIntensityRange: this.props.system.lightIntensityRange,
                waterTempRange: this.props.system.waterTempRange,
                phLevelRange: this.props.system.phLevelRange
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

    handleAirTempRangeChange(value) {
        this.setState({
            airTempRange: value
        })
    }

    handleAirHumidityChange(value) {
        this.setState({
            airHumidityRange: value
        })
    }

    handleLightIntensityChange(value) {
        this.setState({
            lightIntensityRange: value
        })
    }

    handleWaterTempChange(value) {
        this.setState({
            waterTempRange: value
        })
    }

    handlePhLevelChange(value) {
        this.setState({
            phLevelRange: value
        })
    }

    handleClearButton() {
        this.setState({
            airTempRange: this.props.system.airTempRange,
            airHumidityRange: this.props.system.airHumidityRange,
            lightIntensityRange: this.props.system.lightIntensityRange,
            waterTempRange: this.props.system.waterTempRange,
            phLevelRange: this.props.system.phLevelRange
        })
    }

    handleSaveButton() {
        this.setState({
            updatingNotificationSettings: true
        })

        const currentUser = localStorage.getItem('username');
        const updateValues = {
            airTempRange: this.state.airTempRange,
            airHumidityRange: this.state.airHumidityRange,
            lightIntensityRange: this.state.lightIntensityRange,
            waterTempRange: this.state.waterTempRange,
            phLevelRange: this.state.phLevelRange
        }

        this.props.updateSystemStatus(currentUser, updateValues, () => {
            this.props.fetchSystemStatus(currentUser);
            this.setState({
                updatingNotificationSettings: false
            })
            notification.success({
                message: "Successful 👏🏼",
                description: "Your notification settings have been updated 👨🏻‍💻"
            })
        })
    }

    render() {
        return (
            <div>
                <Divider>System Notifications</Divider>
                <Row>
                    <Col xs={0} sm={0} md={0} lg={0} xl={3} span={3} ></Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={18} span={18}>
                        <div className="notification-container">
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
                        </div>

                        <div className="notification-setting-container">
                            <br></br>
                            <h2>Notifications Settings</h2>
                            <Divider />
                            <span>Adjust the range of the following criteria. We will monitor the system and
                            send you notifications when the sensor data fall out of the set range.</span>
                            <List
                                itemLayout="horizontal"
                            >
                                {/* AIR TEMPERATURE RANGE */}
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            size="large"
                                            src={airTempLogo}
                                            style={{ fontWeight: "900" }}
                                        />}
                                        title={`Air temperature range`}
                                        description={
                                            <div>
                                                <span>Current set range is {this.props.system ? this.props.system.airTempRange[0] + "°C - " + this.props.system.airTempRange[1] + "°C" : <Spin></Spin>}</span>
                                                <Slider
                                                    min={0}
                                                    max={50}
                                                    range
                                                    step={0.1}
                                                    marks={airTempMarks}
                                                    value={this.state.airTempRange}
                                                    onChange={this.handleAirTempRangeChange}
                                                    tipFormatter={(value) => `${value}°C`}
                                                ></Slider>
                                            </div>
                                        }
                                    />
                                </List.Item>
                                {/* AIR HUMIDITY RANGE */}
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            size="large"
                                            src={airHumidityLogo}
                                            style={{ fontWeight: "900" }}
                                        />}
                                        title={"Air humidity range"}
                                        description={
                                            <div>
                                                <span>Current set range is {this.props.system ? this.props.system.airHumidityRange[0] + "% - " + this.props.system.airHumidityRange[1] + "%" : <Spin></Spin>}</span>
                                                <Slider
                                                    min={0}
                                                    max={100}
                                                    range
                                                    step={0.1}
                                                    marks={airHumidityMarks}
                                                    value={this.state.airHumidityRange}
                                                    onChange={this.handleAirHumidityChange}
                                                    tipFormatter={(value) => `${value}%`}
                                                ></Slider>
                                            </div>
                                        }
                                    />
                                </List.Item>
                                {/* LIGHT INTENSITY RANGE */}
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            size="large"
                                            src={lightIntensityLogo}
                                            style={{ fontWeight: "900" }}
                                        />}
                                        title={"Light intensity range"}
                                        description={
                                            <div>
                                                <span>Current set range is {this.props.system ? this.props.system.lightIntensityRange[0] + " lux - " + this.props.system.lightIntensityRange[1] + " lux" : <Spin></Spin>}</span>
                                                <Slider
                                                    min={0}
                                                    max={65000}
                                                    range
                                                    step={1000}
                                                    marks={lightIntensityMarks}
                                                    value={this.state.lightIntensityRange}
                                                    onChange={this.handleLightIntensityChange}
                                                    tipFormatter={(value) => `${value} lux`}
                                                ></Slider>
                                            </div>
                                        }
                                    />
                                </List.Item>
                                {/* WATER TEMPERATURE RANGE */}
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            size="large"
                                            src={waterTempLogo}
                                            style={{ fontWeight: "900" }}
                                        />}
                                        title={"Water temperature range"}
                                        description={
                                            <div>
                                                <span>Current set range is {this.props.system ? this.props.system.waterTempRange[0] + "°C - " + this.props.system.waterTempRange[1] + "°C" : <Spin></Spin>}</span>
                                                <Slider
                                                    min={0}
                                                    max={50}
                                                    range
                                                    step={0.1}
                                                    marks={waterTempMarks}
                                                    value={this.state.waterTempRange}
                                                    onChange={this.handleWaterTempChange}
                                                    tipFormatter={(value) => `${value}°C`}
                                                ></Slider>
                                            </div>
                                        }
                                    />
                                </List.Item>
                                {/* PH LEVEL RANGE */}
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            size="large"
                                            src={phLevelLogo}
                                            style={{ fontWeight: "900" }}
                                        />}
                                        title={"pH level range"}
                                        description={
                                            <div>
                                                <span>Current set range is {this.props.system ? this.props.system.phLevelRange[0] + " - " + this.props.system.phLevelRange[1] : <Spin></Spin>}</span>
                                                <Slider
                                                    min={0}
                                                    max={14}
                                                    range
                                                    step={0.1}
                                                    marks={phLevelMarks}
                                                    value={this.state.phLevelRange}
                                                    onChange={this.handlePhLevelChange}
                                                ></Slider>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            </List>
                            <div style={{ textAlign: "center", paddingTop: "24px" }}>
                                <Button
                                    size="large"
                                    type="danger"
                                    onClick={this.handleClearButton}
                                >
                                    Clear changes
                                </Button>
                                <Button
                                    size="large"
                                    type="primary"
                                    onClick={this.handleSaveButton}
                                    loading={this.state.updatingNotificationSettings}
                                >
                                    Save changes
                                </Button>
                            </div>
                        </div>

                        <div className="notification-control-container">
                            <br></br>
                            <h2>Notifications Control</h2>
                            <Divider />
                            <span>Control whether or not you want to receive notifications regarding each monitored criteria.</span>
                            <List
                                itemLayout="horizontal"
                            >
                                {/* AIR TEMPERATURE RANGE */}
                                <List.Item actions={[<Switch
                                // loading={this.props.system ? this.state.loadingLightSwitch : true}
                                // checked={this.props.system ? this.props.system.growLight : false}
                                // onChange={this.handleLightSwitch} 
                                />
                                ]}>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            size="large"
                                            src={airTempLogo}
                                            style={{ fontWeight: "900" }}
                                            icon="close"
                                        />}
                                        title={"Air temperature"}
                                    />
                                </List.Item>
                                {/* AIR HUMIDITY RANGE */}
                                <List.Item actions={[<Switch
                                // loading={this.props.system ? this.state.loadingLightSwitch : true}
                                // checked={this.props.system ? this.props.system.growLight : false}
                                // onChange={this.handleLightSwitch} 
                                />
                                ]}>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            size="large"
                                            src={airHumidityLogo}
                                            style={{ fontWeight: "900" }}
                                            icon="close"
                                        />}
                                        title={"Air humidity"}
                                    />
                                </List.Item>
                                {/* LIGHT INTENSITY RANGE */}
                                <List.Item actions={[<Switch
                                // loading={this.props.system ? this.state.loadingLightSwitch : true}
                                // checked={this.props.system ? this.props.system.growLight : false}
                                // onChange={this.handleLightSwitch} 
                                />
                                ]}>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            size="large"
                                            src={lightIntensityLogo}
                                            style={{ fontWeight: "900" }}
                                            icon="close"
                                        />}
                                        title={"Light intensity"}
                                    />
                                </List.Item>
                                {/* WATER TEMPERATURE RANGE */}
                                <List.Item actions={[<Switch
                                // loading={this.props.system ? this.state.loadingLightSwitch : true}
                                // checked={this.props.system ? this.props.system.growLight : false}
                                // onChange={this.handleLightSwitch} 
                                />
                                ]}>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            size="large"
                                            src={waterTempLogo}
                                            style={{ fontWeight: "900" }}
                                            icon="close"
                                        />}
                                        title={"Water temperature"}
                                    />
                                </List.Item>
                                {/* PH LEVEL RANGE */}
                                <List.Item actions={[<Switch
                                // loading={this.props.system ? this.state.loadingLightSwitch : true}
                                // checked={this.props.system ? this.props.system.growLight : false}
                                // onChange={this.handleLightSwitch} 
                                />
                                ]}>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            size="large"
                                            src={phLevelLogo}
                                            style={{ fontWeight: "900" }}
                                            icon="close"
                                        />}
                                        title={"pH level"}
                                    />
                                </List.Item>
                                {/* GROW BED WATER LEVEL */}
                                <List.Item actions={[<Switch
                                // loading={this.props.system ? this.state.loadingLightSwitch : true}
                                // checked={this.props.system ? this.props.system.growLight : false}
                                // onChange={this.handleLightSwitch} 
                                />
                                ]}>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            size="large"
                                            src={growBedLogo}
                                            style={{ fontWeight: "900" }}
                                            icon="close"
                                        />}
                                        title={"Grow bed water level"}
                                    />
                                </List.Item>
                                {/* FISH TANK WATER LEVEL */}
                                <List.Item actions={[<Switch
                                // loading={this.props.system ? this.state.loadingLightSwitch : true}
                                // checked={this.props.system ? this.props.system.growLight : false}
                                // onChange={this.handleLightSwitch} 
                                />
                                ]}>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            size="large"
                                            src={fishTankLogo}
                                            style={{ fontWeight: "900" }}
                                            icon="close"
                                        />}
                                        title={"Fish tank water level"}
                                    />
                                </List.Item>
                            </List>
                        </div>
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
        notifications: state.notifications,
        system: state.system
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchNotifications,
        deleteNotification,
        clearNotifications,
        fetchUser,
        fetchSystemStatus,
        updateSystemStatus
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);