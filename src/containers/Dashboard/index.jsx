import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import socketIoClient from 'socket.io-client';
import {
    Spin,
    Divider,
    List,
    Card,
    Avatar
} from 'antd';
import { fetchLatestSensorData } from '../../actions/action_sensor_data.js';
import airTempLogo from '../../images/png/airTemp.png';
import airHumidityLogo from '../../images/png/humidity.png';
import lightIntensityLogo from '../../images/png/growLight.png';
import waterTempLogo from '../../images/png/waterTemp.png';
import phLevelLogo from '../../images/png/pH.png';
import growBedLogo from '../../images/png/plantPot.png';
import fishTankLogo from '../../images/png/fishtank.png';
import notificationLogo from '../../images/png/bell.png';
import './Dashboard.css';
const { Meta } = Card;
const io = socketIoClient('https://aquagrow.life');

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingData: true,
            latestData: null
        }
    }

    componentWillMount() {
        this.setState({
            loadingData: true
        })
        const currentUser = localStorage.getItem('username');
        this.props.fetchLatestSensorData(currentUser);
        this.subscribeToNewData();
    }

    componentDidUpdate() {
        if (this.state.loadingData === true && this.props.sensorData) {
            setInterval(() => {
                this.setState({
                    loadingData: false
                })
            }, 500);
        }
    }

    subscribeToNewData() {
        const currentUser = localStorage.getItem('username');
        io.on('newData', () => {
            this.props.fetchLatestSensorData(currentUser)
        });
    }

    getTimeDifference(time) {
        const currentTime = moment();
        if (currentTime.diff(time, 'seconds') < 60) {
            return `${currentTime.diff(time, 'seconds')} seconds ago`
        } else {
            return `${currentTime.diff(time, 'minutes')} ${currentTime.diff(time, 'minutes') > 1 ? 'minutes' : 'minute'} ago`
        }
    }

    render() {
        const notificationsCount = this.props.user ? (
            this.props.user.notifications.length
            + this.props.user.reminders.length
            + this.props.user.messages.length
        ) : 0

        return (
            <div className="dashboard-container">
                {this.props.user ? (
                    <div>
                        <Divider>Welcome back, {this.props.user.name.split(' ')[0]}</Divider>
                        <div className="sensor-update-time">
                            <span>{this.state.loadingData ? <Spin></Spin> : "Data updated " + this.getTimeDifference(this.props.sensorData.timestamp)}</span>
                        </div>
                        <List
                            grid={{ xs: 1, sm: 1, md: 2, lg: 4, xl: 4, xxl: 4 }}
                        >
                            <List.Item>
                                <Card
                                    loading={this.state.loadingData}
                                    hoverable
                                >
                                    <Meta
                                        avatar={<Avatar size="large" src={airTempLogo} />}
                                        title="Air temperature"
                                    />
                                    <div className="dashboard-card-content">
                                        <Divider />
                                        {this.props.sensorData ? this.props.sensorData.airTemp : null}
                                        <span> °C</span>
                                    </div>
                                </Card>
                            </List.Item>
                            <List.Item>
                                <Card
                                    loading={this.state.loadingData}
                                    hoverable
                                >
                                    <Meta
                                        avatar={<Avatar size="large" src={airHumidityLogo} />}
                                        title="Air humidity"
                                    />
                                    <div className="dashboard-card-content">
                                        <Divider />
                                        {this.props.sensorData ? this.props.sensorData.airHumidity : null}
                                        <span> %</span>
                                    </div>
                                </Card>
                            </List.Item>
                            <List.Item>
                                <Card
                                    loading={this.state.loadingData}
                                    hoverable
                                >
                                    <Meta
                                        avatar={<Avatar size="large" src={lightIntensityLogo} />}
                                        title="Grow light intensity"
                                    />
                                    <div className="dashboard-card-content">
                                        <Divider />
                                        {this.props.sensorData ? Math.round(this.props.sensorData.lightIntensity) : null}
                                        <span> lux</span>
                                    </div>
                                </Card>
                            </List.Item>
                            <List.Item>
                                <Card
                                    loading={this.state.loadingData}
                                    hoverable
                                >
                                    <Meta
                                        avatar={<Avatar size="large" src={waterTempLogo} />}
                                        title="Water temperature"
                                    />
                                    <div className="dashboard-card-content">
                                        <Divider />
                                        {this.props.sensorData ? this.props.sensorData.waterTemp : null}
                                        <span> °C</span>
                                    </div>
                                </Card>
                            </List.Item>
                            <List.Item>
                                <Card
                                    loading={this.state.loadingData}
                                    hoverable
                                >
                                    <Meta
                                        avatar={<Avatar size="large" src={phLevelLogo} />}
                                        title="pH level"
                                    />
                                    <div className="dashboard-card-content">
                                        <Divider />
                                        {this.props.sensorData ? this.props.sensorData.pH : null}
                                        <span> pH</span>
                                    </div>
                                </Card>
                            </List.Item>
                            <List.Item>
                                <Card
                                    loading={this.state.loadingData}
                                    hoverable
                                >
                                    <Meta
                                        avatar={<Avatar size="large" src={growBedLogo} />}
                                        title="Grow bed water level"
                                    />
                                    <div className="dashboard-card-content">
                                        <Divider />
                                        {this.props.sensorData && this.props.sensorData.upperWaterLevel ? "High" : "Good"}
                                    </div>
                                </Card>
                            </List.Item>
                            <List.Item>
                                <Card
                                    loading={this.state.loadingData}
                                    hoverable
                                >
                                    <Meta
                                        avatar={<Avatar size="large" src={fishTankLogo} />}
                                        title="Fish tank water level"
                                    />
                                    <div className="dashboard-card-content">
                                        <Divider />
                                        {this.props.sensorData && this.props.sensorData.lowerWaterLevel ? "Low" : "Good"}
                                    </div>
                                </Card>
                            </List.Item>
                            <List.Item>
                                <Card
                                    loading={this.state.loadingData}
                                    hoverable
                                >
                                    <Meta
                                        avatar={<Avatar size="large" src={notificationLogo} />}
                                        title="Total notifcations"
                                    />
                                    <div className="dashboard-card-content">
                                        <Divider />
                                        {notificationsCount}
                                    </div>
                                </Card>
                            </List.Item>
                        </List>
                    </div>
                ) : (
                        <Spin size="large" />
                    )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        sensorData: state.sensorData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchLatestSensorData
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);