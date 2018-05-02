import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Spin, Card, Divider, Form, Input, Upload, Button, notification, Icon, Modal } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import { fetchUser, updateUser, deleteUser } from '../../actions/action_user';
import { apiRoutes } from '../../config';
import './Account.css';
const { rootUrl } = apiRoutes;
const FormItem = Form.Item;
const { Meta } = Card;

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBK7k74kf-aG3TQhvXxckv2YAbVIoVhpbY',
    Promise: Promise
});

notification.config({
    placement: 'topRight',
    top: 72,
    duration: 5,
});

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            currentGrowZone: null,
            newGrowZone: null,
            isUpdatingProfile: false,
            isChangingPassword: false,
            location: null,
            modalVisible: false,
            modalConfirmLoading: false,
            deleteValidationStatus: null
        }
        this.validateGrowZone = this.validateGrowZone.bind(this);
        this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleModalCancel = this.handleModalCancel.bind(this);
        this.handleUserDelete = this.handleUserDelete.bind(this);
    }

    componentWillMount() {
        this.getCurrentGrowZone();
        this.getLocationFromZipcode(this.props.user.zipCode);
    }

    handleUpdateProfile = (e) => {
        e.preventDefault();
        this.props.form.validateFields(['username', 'name', 'phone', 'zipCode'], (err, values) => {
            if (!err) {
                this.setState({
                    isUpdatingProfile: true,
                    location: null
                })

                const updateValues = {
                    username: values.username,
                    name: values.name,
                    phone: values.phone,
                    zipCode: values.zipCode,
                    zone: this.state.newGrowZone ? this.state.newGrowZone : this.state.currentGrowZone,
                    pictureUrl: this.props.user.pictureUrl
                }

                this.props.updateUser(localStorage.getItem('username'), updateValues, () => {
                    this.props.fetchUser(localStorage.getItem('username'));
                    this.getLocationFromZipcode(values.zipCode);
                    this.setState({
                        isUpdatingProfile: false
                    })
                    notification.success({
                        message: "Successful 👏🏼",
                        description: "User profile has been updated 👨🏻‍💻"
                    });
                });
            }
        })
    }

    handleChangePassword = (e) => {
        e.preventDefault();
        this.props.form.validateFields(['old', 'new', 'confirm'], (err, values) => {
            if (!err) {
                this.setState({
                    isChangingPassword: true
                })
                const updateValues = {
                    username: this.props.user.username,
                    oldPassword: values.old,
                    newPassword: values.new
                }
                axios.put(`${rootUrl}/password/update`, updateValues)
                    .then((response) => {
                        if (response.data.error) {
                            notification.error({
                                message: "Cannot change your wassword ☠️",
                                description: "Your provided old password is not correct!"
                            })
                            this.setState({
                                isChangingPassword: false
                            })
                            this.props.form.resetFields(['old', 'new', 'confirm']);
                        } else {
                            notification.success({
                                message: "Successful 👏🏼",
                                description: "Your password has been changed! 🔐"
                            })
                            this.setState({
                                isChangingPassword: false
                            })
                            this.props.form.resetFields(['old', 'new', 'confirm']);
                        }
                    })
                    .catch((err) => {
                        notification.error({
                            message: "Cannot change your wassword ☠️",
                            description: "There's a problem with the server, please try again..."
                        })
                        this.setState({
                            isChangingPassword: false
                        })
                        this.props.form.resetFields(['old', 'new', 'confirm']);
                    })
            }
        })
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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

    getZipcodeExtra() {
        if (this.state.newGrowZone) {
            return `Your new grow zone will be: ${this.state.newGrowZone}`;
        } else {
            return `Your current grow zone is: ${this.state.currentGrowZone ? this.state.currentGrowZone : '...loading'}`
        }
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

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('new')) {
            callback('Two passwords that you enter are inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    showModal() {
        this.setState({
            modalVisible: true
        })
    }

    handleModalCancel() {
        this.setState({
            modalVisible: false
        })
    }

    handleUserDelete() {
        const form = this.props.form;
        if (form.getFieldValue('delete') === this.props.user.username) {
            this.props.deleteUser(this.props.user._id, function () {
                notification.success({
                    message: "Successful 👋🏻",
                    description: "Your account has been deleted 💔"
                })
            })
        } else {
            this.setState({
                deleteValidationStatus: "error"
            })
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
                    <Col xs={24} sm={24} md={24} lg={10} xl={10} span={10} className="account-left-column">
                        <Card
                            // loading={this.state.loading}
                            // hoverable
                            style={{ maxWidth: 280 }}
                            cover={<img alt="example" src={this.props.user.pictureUrl} />}
                            actions={[
                                <Upload
                                    type="file"
                                    accept="image/*"
                                    multiple={false}
                                >
                                    {/* <Button size="large" style={{ maxWidth: 280 }}> */}
                                    <Icon type="upload" /> Change profile picture
                                    {/* </Button> */}
                                </Upload>
                            ]}
                        >
                            <Meta
                                title={this.props.user.name}
                                description={this.state.location ? this.state.location : <Spin size="small"></Spin>}
                                style={{ textAlign: "center" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={14} xl={14} span={14} className="account-right-column">
                        <Form
                            layout="vertical"
                            style={{ maxWidth: "425px", minWidth: "300px" }}
                            hideRequiredMark
                        >
                            <h2>User profile</h2>
                            <Divider />
                            <FormItem
                                label="Username"
                                extra="You can't change your username at this moment."
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
                                extra="You can't change your phone number at this moment."
                            >
                                {getFieldDecorator('phone', {
                                    initialValue: this.props.user.phone,
                                    rules: [{
                                        required: true, message: 'Please input your phone number!'
                                    }, {
                                        validator: this.validatePhoneNumber
                                    }],
                                })(
                                    <Input addonBefore="+1" size="large" disabled />
                                )}
                            </FormItem>
                            <FormItem
                                label="Zip Code"
                                hasFeedback
                                extra={this.getZipcodeExtra()}
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
                            <FormItem>
                                <Button
                                    size="large"
                                    type="primary"
                                    onClick={this.handleUpdateProfile}
                                    loading={this.state.isUpdatingProfile}
                                >Update profile</Button>
                            </FormItem>
                            <br></br>
                            <h2>Change password</h2>
                            {/* TODO: Implement Update Password Feature */}
                            <Divider />
                            <FormItem
                                label="Old password"
                            >
                                {getFieldDecorator('old', {
                                    rules: [{
                                        required: true, message: 'Please input your old password!',
                                    }, {
                                        whitespace: true, message: 'Please don\'t include whitespaces!'
                                    }],
                                })(
                                    <Input size="large" type="password" placeholder="Old password" />
                                )}
                            </FormItem>
                            <FormItem
                                label="New password"
                            >
                                {getFieldDecorator('new', {
                                    rules: [{
                                        required: true, message: 'Please input your new password!',
                                    }, {
                                        validator: this.validateToNextPassword,
                                    }, {
                                        whitespace: true, message: 'Please don\'t include whitespaces!'
                                    }],
                                })(
                                    <Input size="large" type="password" placeholder="New password" />
                                )}
                            </FormItem>
                            <FormItem
                                label="Confirm new password"
                                hasFeedback
                            >
                                {getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true, message: 'Please confirm your password!',
                                    }, {
                                        validator: this.compareToFirstPassword,
                                    }, {
                                        whitespace: true, message: 'Please don\'t include whitespaces!'
                                    }],
                                })(
                                    <Input size="large" onBlur={this.handleConfirmBlur} type="password" placeholder="Confirm new password" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button
                                    size="large"
                                    type="primary"
                                    onClick={this.handleChangePassword}
                                    loading={this.state.isChangingPassword}
                                >Update password</Button>
                            </FormItem>
                            <br></br>
                            <h2 style={{ color: "red" }}>Delete account</h2>
                            <Divider />
                            <p>Once you delete your account, all information will be deleted and there's no going back. Please be certain!</p>
                            <FormItem>
                                <Button
                                    size="large"
                                    type="danger"
                                    onClick={this.showModal}
                                >Delete your account</Button>
                            </FormItem>
                            <Modal
                                title="Delete your account"
                                okText="Delete"
                                okType="danger"
                                visible={this.state.modalVisible}
                                onOk={this.handleUserDelete}
                                confirmLoading={this.state.modalConfirmLoading}
                                onCancel={this.handleModalCancel}
                            >
                                <p>Please type your username and press <strong>Delete</strong> to proceed. We're sad to see you go ☹️</p>
                                <FormItem
                                    hasFeedback
                                    validateStatus={this.state.deleteValidationStatus}
                                >
                                    {getFieldDecorator('delete', {
                                        rules: [{
                                            required: true, message: 'Please enter your username!',
                                        }]
                                    })(
                                        <Input size="large" placeholder={this.props.user.username} />
                                    )}
                                </FormItem>
                            </Modal>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUser, updateUser, deleteUser }, dispatch);
}

const WrappedAccountForm = Form.create()(Account)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedAccountForm);