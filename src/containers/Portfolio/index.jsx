import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {
    Spin,
    Divider,
    Col,
    List,
    Card,
    Icon,
    Select
} from 'antd';
import { fetchSystemStatus } from '../../actions/action_system.js';
import { apiRoutes } from '../../config';
import './Portfolio.css';
const { Meta } = Card;
const { rootUrl } = apiRoutes;
const Option = Select.Option;

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBK7k74kf-aG3TQhvXxckv2YAbVIoVhpbY',
    Promise: Promise
});

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            growZone: null,
            location: null,
            loadingFishData: true,
            fishData: [],
            plantsMain: [],
            searchPlants: []
        }

        this.handlePlantSearchByMainType = this.handlePlantSearchByMainType.bind(this);
    }

    componentWillMount() {
        const currentUser = localStorage.getItem('username');
        this.props.fetchSystemStatus(currentUser);
        this.getCurrentGrowZone();
        this.getLocationFromZipcode(this.props.user.zipCode);
        this.getFishData();
        this.getPlantMainTypes();
    }

    getCurrentGrowZone() {
        axios.get(`${rootUrl}/zone/zip/${this.props.user.zipCode}`)
            .then((res) => {
                this.setState({
                    growZone: res.data.data.zone
                })
            })
            .catch((err) => {
                this.setState({
                    growZone: "Error 😳"
                })
            })
    }

    getLocationFromZipcode(zipCode) {
        googleMapsClient.geocode({ address: zipCode })
            .asPromise()
            .then((response) => {
                this.setState({
                    location: response.json.results[0].formatted_address
                })
            })
            .catch((err) => {
                this.setState({
                    location: null
                })
            });
    }

    getFishData() {
        axios.get(`${rootUrl}/fish`)
            .then((res) => {
                this.setState({
                    fishData: res.data.data,
                    loadingFishData: false
                })
            })
            .catch((err) => {
                this.setState({
                    loadingFishData: false
                })
            })
    }

    getPlantMainTypes() {
        axios.get(`${rootUrl}/plants/main`)
            .then((res) => {
                this.setState({
                    plantsMain: res.data.data
                })
            })
            .catch((err) => {

            })
    }

    convertFtoC(value) {
        return Math.round((parseInt(value) - 32) * 5 / 9);
    }

    handlePlantSearchByMainType(value) {
        axios.get(`${rootUrl}/plants/main/${value}`)
            .then((res) => {
                this.setState({
                    searchPlants: res.data.data
                })
            })
            .catch((err) => {

            })
    }

    render() {
        const options = this.state.plantsMain.map(d => <Option key={d}>{d}</Option>);

        return (
            <div className="portfolio-container">
                <Divider>Garden Portfolio</Divider>
                {/* <Col xs={0} sm={0} md={0} lg={0} xl={3} span={3} ></Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={18} span={18} className="portfolio-container"> */}
                <div style={{ textAlign: "center", fontSize: "16px" }}>
                    <h2>{this.props.system ? this.props.system.name : <Spin></Spin>}</h2>
                    <span>{this.state.location ? this.state.location : <Spin></Spin>}</span>
                    <br></br>
                    <span>{this.state.growZone ? <div>Current grow zone: <strong>{this.state.growZone}</strong></div> : <Spin></Spin>}</span>
                </div>
                <Divider />
                <div style={{ textAlign: "center" }}>
                    <h1>Aquaponics Fish</h1>
                </div>
                <List
                    grid={{ xs: 1, sm: 1, md: 2, lg: 4, xl: 4, xxl: 6 }}
                    dataSource={this.state.fishData}
                    loading={this.state.loadingFishData}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                hoverable
                                cover={<img alt="example" src={item.picture} style={{ maxHeight: "225px" }} />}
                                actions={[<Icon type="plus-circle-o" />]}
                            >
                                <Meta
                                    title={item.name}
                                    description={
                                        <div>
                                            <p>{item.type} - {item.feeding}</p>
                                            <p>Ideal temperature: {this.convertFtoC(item.tempLow)} - {this.convertFtoC(item.tempHigh)}°C</p>
                                            <p>Harvest range: {item.harvestRange ? item.harvestRange + " months" : "N/A"}</p>
                                        </div>
                                    }
                                />
                            </Card>
                        </List.Item>
                    )}
                />
                <Divider />
                <div style={{ textAlign: "center" }}>
                    <h1>What to grow?</h1>
                    <Select
                        style={{ width: "200px" }}
                        showSearch
                        placeholder="Choose a plant type"
                        onChange={this.handlePlantSearchByMainType}
                    // mode="combobox"
                    // value={this.state.value}
                    // placeholder={this.props.placeholder}
                    // style={this.props.style}
                    // defaultActiveFirstOption={false}
                    // showArrow={false}
                    // filterOption={false}
                    >
                        {options}
                    </Select>
                </div>
                <div style={{ minHeight: "500px" }}>
                    <div style={{ padding: "12px", textAlign: "center" }}>
                        {
                            this.state.searchPlants.length > 0 && this.state.searchPlants[0].main_pic !== "N/A"
                            &&
                            <img src={this.state.searchPlants[0].main_pic} alt="MainPlant" width="100%"></img>
                        }
                        <div style={{ paddingTop: "12px" }}>
                            <h2>{this.state.searchPlants.length > 0 ? "Category: " + this.state.searchPlants[0].category : ""}</h2>
                        </div>
                    </div>
                    <List
                        grid={{ xs: 1, sm: 1, md: 2, lg: 4, xl: 4, xxl: 6 }}
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={this.state.searchPlants}
                        renderItem={item => (
                            <List.Item
                                style={{ paddingLeft: "24px", paddingRight: "24px" }}
                                key={item._id}
                            >
                                <List.Item.Meta
                                    // avatar={<Avatar src={item.avatar} />}
                                    title={<h3><a href={item.product_url} target="_blank">{item.product}</a></h3>}
                                    description={
                                        <div>
                                            <p>Grow zones: {item.zones ? item.zones.toString().trim().replace('', ', ').slice(2) : "N/A"}</p>
                                            <p>Sun: {item.sun ? item.sun : "N/A"}</p>
                                            <p>pH range: {item.pH_range ? item.pH_range.toString().replace(',', ' - ') : "N/A"}</p>
                                            <p>Days to maturity: {item.daysToMaturity ? item.daysToMaturity.split(',')[0] + " days" : "N/A"}</p>
                                            <p>Life cycle: {item.lifeCycle ? item.lifeCycle : "N/A"}</p>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
                {/* </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={3} span={3} ></Col> */}
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
        fetchSystemStatus
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);