import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticate, register } from '../actions/action_user';
import axios from 'axios';
import _ from 'lodash';
import { Card, Form, Input, Tooltip, Icon, Checkbox, Button } from 'antd';
const FormItem = Form.Item;

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // const validationOptions = {
        //     first: true,
        //     force: true
        // }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.register(values, () => {
                    this.props.authenticate(values.username, values.password);
                });
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    // Check to see if the entered username already exists
    checkUniqueUsername(rule, value, callback) {
        if (value) {
            axios.get(`https://aquagrow.life/api/user/${value}`)
                .then((res) => {
                    if (res.data.error) {
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

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
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

    render() {
        const { getFieldDecorator } = this.props.form;
        const validateUsername = _.debounce((rule, value, callback) => { this.checkUniqueUsername(rule, value, callback) }, 500, {
            'leading': false,
            'trailing': true
        });

        return (
            <Card className="card-container">
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        hasFeedback
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: 'Please input your full name!'
                            }, {
                                max: 50, message: 'Please keep your input less than 50 characters!'
                            }],
                        })(
                            <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />} placeholder="Full Name" />
                        )}
                    </FormItem>
                    <FormItem
                        hasFeedback
                    >
                        {getFieldDecorator('username', {
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
                            <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem
                        hasFeedback
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.validateToNextPassword,
                            }, {
                                whitespace: true, message: 'Please don\'t include whitespaces!'
                            }],
                        })(
                            <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem
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
                            <Input size="large" onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />} type="password" placeholder="Confirm Password" />
                        )}
                    </FormItem>
                    {/* <FormItem
                        label={(
                            <span>
                                Nickname&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                    >
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                        })(
                            <Input size="large" />
                        )}
                    </FormItem> */}
                    {/* <FormItem>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(
                            <Input size="large" addonBefore="+1" prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.5)' }} />} placeholder="Phone" />
                        )}
                    </FormItem> */}
                    {/* <FormItem>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                        )}
                    </FormItem> */}
                    <FormItem>
                        <Button size="large" type="primary" htmlType="submit" className="register-form-button">Register</Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ register, authenticate }, dispatch);
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default connect(null, mapDispatchToProps)(WrappedRegistrationForm);