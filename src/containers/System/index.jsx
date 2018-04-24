import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {
    Spin,
    Divider,
    Row,
    Col,
    List,
    Switch,
    Avatar,
    Slider,
    Button,
    Icon,
    InputNumber
} from 'antd';
import { fetchSystemStatus, updateSystemStatus } from '../../actions/action_system.js';
import growLightLogo from '../../images/png/growLight.png';
import waterPumpLogo from '../../images/png/waterPump.png';
import heatingMatLogo from '../../images/png/heatingMat.png';
import './System.css';

class System extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingLightSwitch: false,
            loadingPumpSwitch: false,
            loadingAcidSwitch: false,
            loadingBaseSwitch: false,
            loadingMatSwitch: false,
            pumpIntensityPercent: null,
            updatingIntensityButton: false,
        }
        this.handleLightSwitch = this.handleLightSwitch.bind(this);
        this.handleWaterPumpSwitch = this.handleWaterPumpSwitch.bind(this);
        this.handleAcidPumpSwitch = this.handleAcidPumpSwitch.bind(this);
        this.handleBasePumpSwitch = this.handleBasePumpSwitch.bind(this);
        this.handleHeatingMatSwitch = this.handleHeatingMatSwitch.bind(this);
        this.handleUpdatePumpIntensity = this.handleUpdatePumpIntensity.bind(this);
    }

    componentWillMount() {
        const currentUser = localStorage.getItem('username');
        this.props.fetchSystemStatus(currentUser);
    }

    componentDidUpdate() {
        if (this.props.system && !this.state.pumpIntensityPercent) {
            this.setState({
                pumpIntensityPercent: this.convertIntensityValueToPercent(this.props.system.waterPumpSetIntensity)
            })
        }
    }

    convertPercentToIntensityValue(percent) {
        return (125 - percent / 2);
    }

    convertIntensityValueToPercent(value) {
        return (125 - value) * 2;
    }

    handleLightSwitch() {
        this.setState({
            loadingLightSwitch: true
        })

        const currentUser = localStorage.getItem('username');
        const growLight = !this.props.system.growLight;
        const updateValues = {
            growLight
        }

        this.props.updateSystemStatus(currentUser, updateValues, () => {
            this.props.fetchSystemStatus(currentUser);
            this.setState({
                loadingLightSwitch: false
            })
        })
    }

    handleWaterPumpSwitch() {
        this.setState({
            loadingPumpSwitch: true
        })

        const currentUser = localStorage.getItem('username');
        const waterPump = this.props.system.waterPump === 255 ? this.convertPercentToIntensityValue(this.state.pumpIntensityPercent) : 255;
        const updateValues = {
            waterPump
        }

        this.props.updateSystemStatus(currentUser, updateValues, () => {
            this.props.fetchSystemStatus(currentUser);
            this.setState({
                loadingPumpSwitch: false
            })
        })
    }

    handleAcidPumpSwitch() {
        this.setState({
            loadingAcidSwitch: true
        })

        const currentUser = localStorage.getItem('username');
        const phPumpLow = !this.props.system.phPumpLow;
        const updateValues = {
            phPumpLow
        }

        this.props.updateSystemStatus(currentUser, updateValues, () => {
            this.props.fetchSystemStatus(currentUser);
            this.setState({
                loadingAcidSwitch: false
            })
        })
    }

    handleBasePumpSwitch() {
        this.setState({
            loadingBaseSwitch: true
        })

        const currentUser = localStorage.getItem('username');
        const phPumpHigh = !this.props.system.phPumpHigh;
        const updateValues = {
            phPumpHigh
        }

        this.props.updateSystemStatus(currentUser, updateValues, () => {
            this.props.fetchSystemStatus(currentUser);
            this.setState({
                loadingBaseSwitch: false
            })
        })
    }

    handleHeatingMatSwitch() {
        this.setState({
            loadingMatSwitch: true
        })

        const currentUser = localStorage.getItem('username');
        const heatingMat = !this.props.system.heatingMat;
        const updateValues = {
            heatingMat
        }

        this.props.updateSystemStatus(currentUser, updateValues, () => {
            this.props.fetchSystemStatus(currentUser);
            this.setState({
                loadingMatSwitch: false
            })
        })
    }

    handlePumpPercentageChange = (pumpIntensityPercent) => {
        this.setState({ pumpIntensityPercent });
    }

    handleUpdatePumpIntensity() {
        this.setState({
            updatingIntensityButton: true
        })

        const currentUser = localStorage.getItem('username');
        const waterPumpSetIntensity = this.convertPercentToIntensityValue(this.state.pumpIntensityPercent);
        const waterPump = this.props.system.waterPump === 255 ? 255 : waterPumpSetIntensity;
        const updateValues = {
            waterPump,
            waterPumpSetIntensity
        }

        this.props.updateSystemStatus(currentUser, updateValues, () => {
            this.props.fetchSystemStatus(currentUser);
            this.setState({
                updatingIntensityButton: false
            })
        })
    }

    render() {
        const { pumpIntensityPercent } = this.state;
        return (
            <div>
                <Divider>System Control</Divider>
                <Col xs={0} sm={0} md={0} lg={0} xl={3} span={3} ></Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} span={18} className="system-container">
                    <h2>Manual Control</h2>
                    <Divider />
                    <div className="manual-controller-list-container">
                        <List
                            itemLayout="horizontal"
                        >
                            {/* GROWING LIGHT */}
                            <List.Item actions={[<Switch
                                loading={this.props.system ? this.state.loadingLightSwitch : true}
                                checked={this.props.system ? this.props.system.growLight : false}
                                onChange={this.handleLightSwitch} />
                            ]}>
                                <List.Item.Meta
                                    avatar={<Avatar
                                        size="large"
                                        src={growLightLogo}
                                        style={{ fontWeight: "900" }}
                                        icon="close"
                                    />}
                                    title={"Growing Light"}
                                />
                            </List.Item>
                            {/* WATER PUMP */}
                            <List.Item actions={[<Switch
                                loading={this.props.system ? this.state.loadingPumpSwitch : true}
                                checked={this.props.system && this.props.system.waterPump !== 255 ? true : false}
                                onChange={this.handleWaterPumpSwitch} />
                            ]}>
                                <List.Item.Meta
                                    avatar={<Avatar
                                        size="large"
                                        src={waterPumpLogo}
                                        style={{ fontWeight: "900" }}
                                        icon="close"
                                    />}
                                    title={"Water Pump"}
                                />
                            </List.Item>
                            {/* WATER PUMP INTENSITY */}
                            <List.Item>
                                <List.Item.Meta
                                    description={
                                        <div className="pump-intensity-container">
                                            <p>Adjust water pump intensity</p>
                                            <div className="slider-wrapper">
                                                <Icon type="down-circle" />
                                                <Slider
                                                    min={0}
                                                    max={100}
                                                    step={2}
                                                    onChange={this.handlePumpPercentageChange}
                                                    value={pumpIntensityPercent}
                                                    tipFormatter={null} />
                                                <Icon type="up-circle" />
                                            </div>
                                            <InputNumber
                                                min={0}
                                                max={100}
                                                step={2}
                                                style={{ marginRight: "12px" }}
                                                formatter={value => {
                                                    if (value) {
                                                        return `${value} %`;
                                                    } else {
                                                        return "Loading..."
                                                    }
                                                }}
                                                value={pumpIntensityPercent}
                                                onChange={this.handlePumpPercentageChange}
                                            />
                                            <Button
                                                loading={this.state.updatingIntensityButton}
                                                onClick={this.handleUpdatePumpIntensity}
                                                type="primary"
                                            >Update</Button>
                                        </div>
                                    }
                                />
                            </List.Item>
                            {/* PH PUMP - ACID */}
                            <List.Item actions={[<Switch
                                disabled
                                loading={this.props.system ? this.state.loadingAcidSwitch : true}
                                checked={this.props.system ? this.props.system.phPumpLow : false}
                                onChange={this.handleAcidPumpSwitch} />
                            ]}>
                                <List.Item.Meta
                                    avatar={<Avatar
                                        size="large"
                                        style={{ fontWeight: "900", color: "#fa8c16", backgroundColor: "#fff" }}
                                    >H+</Avatar>}
                                    title={"pH Pump [Acid - Lower]"}
                                />
                            </List.Item>
                            {/* PH PUMP - BASE */}
                            <List.Item actions={[<Switch
                                disabled
                                loading={this.props.system ? this.state.loadingBaseSwitch : true}
                                checked={this.props.system ? this.props.system.phPumpHigh : false}
                                onChange={this.handleBasePumpSwitch} />
                            ]}>
                                <List.Item.Meta
                                    avatar={<Avatar
                                        size="large"
                                        style={{ fontWeight: "900", color: "#722ed1", backgroundColor: "#fff" }}
                                    >OH-</Avatar>}
                                    title={"pH Pump [Base - Higher]"}
                                />
                            </List.Item>
                            {/* HEATING MAT */}
                            <List.Item actions={[<Switch
                                loading={this.props.system ? this.state.loadingMatSwitch : true}
                                checked={this.props.system ? this.props.system.heatingMat : false}
                                onChange={this.handleHeatingMatSwitch} />
                            ]}>
                                <List.Item.Meta
                                    avatar={<Avatar
                                        size="large"
                                        src={heatingMatLogo}
                                        style={{ fontWeight: "900" }}
                                    />}
                                    title={"Heating Mat"}
                                />
                            </List.Item>
                        </List>
                    </div>

                    <br></br>
                    <h2>Automatic Control</h2>
                    <Divider />
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={3} span={3} ></Col>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        system: state.system
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchSystemStatus,
        updateSystemStatus
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(System);