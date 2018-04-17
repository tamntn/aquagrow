import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Spin, Card, Divider, Form, Input, Button, message, Icon } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import { apiRoutes } from '../../config';
import './Account.css';
const { rootUrl } = apiRoutes;
const FormItem = Form.Item;
const { Meta } = Card;

// Setup Alert Message Configuration
message.config({
    top: window.innerHeight * 10 / 100,
    duration: 3,
});

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentGrowZone: null,
            newGrowZone: null
        }
        this.validateGrowZone = this.validateGrowZone.bind(this);
    }

    componentWillMount() {
        this.getCurrentGrowZone();
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    // Check to see if the entered username already exists
    // Unlike Register Form, if username is equal the user's own username
    // Validation will pass
    checkUniqueUsername(rule, value, callback) {
        if (value) {
            axios.get(`https://aquagrow.life/api/user/${value.toLowerCase()}`)
                .then((res) => {
                    if (res.data.error) {
                        callback();
                    } else if (res.data.data.username === this.props.user.username) {
                        callback();
                    } else {
                        callback('Username is not available');
                    };
                })
                .catch((err) => {
                    callback();
                })
        } else {
            callback();
        }
    }

    getCurrentGrowZone() {
        axios.get(`${rootUrl}/zone/zip/${this.props.user.zipCode}`)
            .then((res) => {
                this.setState({
                    currentGrowZone: res.data.data.zone
                })
            })
            .catch((err) => {
                this.setState({
                    currentGrowZone: "Error 😳"
                })
            })
    }

    validateGrowZone(rule, value, callback) {
        if (value && value.length === 5) {
            axios.get(`${rootUrl}/zone/zip/${value}`)
                .then((res) => {
                    if (res.data.error) {
                        this.setState({
                            newGrowZone: null
                        });
                        callback(`We can't determine a grow zone with ${value} 😳`);
                    } else {
                        const growZone = res.data.data.zone;
                        this.setState({
                            newGrowZone: growZone
                        });
                        callback();
                    }
                })
        } else if (value) {
            this.setState({
                newGrowZone: null
            });
            callback('Please provide a 5-digit zip code!');
        } else {
            this.setState({
                newGrowZone: null
            });
            callback();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const validateUsername = _.debounce((rule, value, callback) => { this.checkUniqueUsername(rule, value, callback) }, 500, {
            'leading': false,
            'trailing': true
        });

        return (
            <div>
                <Divider>Account Information</Divider>
                <Row gutter={{ xs: 0, sm: 16, md: 24, lg: 48 }}>
                    <Col xs={24} sm={24} md={9} lg={9} xl={9} span={9} className="account-left-column">
                        <Card
                            // loading={this.state.loading}
                            hoverable
                            style={{ maxWidth: 250 }}
                            cover={<img alt="example" src={this.props.user.pictureUrl} />}
                        >
                            <Meta
                                title={this.props.user.name}
                                description={this.props.user.username}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={15} lg={15} xl={15} span={15} className="account-right-column">
                        <Form
                            layout="vertical"
                            style={{ maxWidth: "425px", minWidth: "300px" }}
                            onSubmit={this.handleSubmit}
                        >
                            <FormItem
                                label="Username"
                            >
                                {getFieldDecorator('username', {
                                    initialValue: this.props.user.username,
                                    rules: [{
                                        required: true, message: 'Please input your username!'
                                    }, {
                                        max: 20, message: 'Please keep your input less than 20 characters!'
                                    }, {
                                        whitespace: true, message: 'Please don\'t include whitespaces!'
                                    }, {
                                        validator: validateUsername,
                                    }],
                                })(
                                    <Input size="large" disabled />
                                )}
                            </FormItem>
                            <FormItem
                                label="Full Name"
                            >
                                {getFieldDecorator('name', {
                                    initialValue: this.props.user.name,
                                    rules: [{
                                        required: true, message: 'Please input your full name!'
                                    }, {
                                        max: 50, message: 'Please keep your input less than 50 characters!'
                                    }],
                                })(
                                    <Input size="large" />
                                )}
                            </FormItem>
                            <FormItem
                                label="Phone Number"
                            >
                                {getFieldDecorator('phone', {
                                    initialValue: this.props.user.phone,
                                    rules: [{
                                        required: true, message: 'Please input your phone number!'
                                    }, {
                                        validator: this.validatePhoneNumber
                                    }],
                                })(
                                    <Input addonBefore="+1" size="large" disabled/>
                                )}
                            </FormItem>
                            <FormItem
                                label="Zip Code"
                                hasFeedback
                            >
                                {getFieldDecorator('zipCode', {
                                    initialValue: this.props.user.zipCode,
                                    rules: [{
                                        required: true, message: 'Please input your zip code!'
                                    }, {
                                        validator: this.validateGrowZone
                                    }],
                                })(
                                    <Input size="large" />
                                )}
                            </FormItem>
                            <div className="growzone-text">
                                {
                                    this.state.newGrowZone
                                    &&
                                    <h4>Your New Grow Zone Will Be: {this.state.newGrowZone}</h4>
                                }
                                {
                                    !this.state.newGrowZone
                                    &&
                                    <h4>Your Current Grow Zone Is: {this.state.currentGrowZone ? this.state.currentGrowZone : <Spin size="small" />}</h4>
                                }
                            </div>
                            <br></br>
                            <FormItem>
                                <Button size="large" type="primary">Update</Button>
                            </FormItem>
                            <Divider />
                        </Form>
                    </Col>
                </Row>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

const WrappedAccountForm = Form.create()(Account)

export default connect(mapStateToProps)(WrappedAccountForm);