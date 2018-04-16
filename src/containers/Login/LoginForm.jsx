import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { authenticate } from '../../actions/action_user';
import { Card, Form, Icon, Input, Button, Checkbox, Divider, message } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import '../../style/Login.css';
const FormItem = Form.Item;

// Setup Alert Message Configuration
message.config({
    top: window.innerHeight * 10 / 100,
    duration: 3,
});

class LoginForm extends Component {
    // Check to see if the entered username exists
    checkExistingUsername = (rule, value, callback) => {
        if (value) {
            axios.get(`https://aquagrow.life/api/user/${value.toLowerCase()}`)
                .then((res) => {
                    if (res.data.error) {
                        message.destroy();
                        callback(`${value} is not an existing user 😢`);
                    } else {
                        message.destroy();
                        message.success(`Hi, ${res.data.data.name}`);
                        callback();
                    }
                })
        } else {
            callback();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.authenticate(values, (authorized) => {
                    if (authorized) {
                        message.destroy();
                        message.success("Welcome back! 🎉");
                    } else {
                        message.destroy();
                        message.error("Your password is incorrect 😢");
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const validateUsername = _.debounce((rule, value, callback) => { this.checkExistingUsername(rule, value, callback) }, 300, {
            'leading': false,
            'trailing': true
        });

        return (
            <Card className="card-container">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem
                        hasFeedback
                    >
                        {getFieldDecorator('username', {
                            rules: [{
                                required: true, message: 'Please input your username!'
                            }, {
                                validator: validateUsername
                            }],
                        })(
                            <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">Forgot password?</a>
                        <Button size="large" type="primary" htmlType="submit" className="login-form-button">
                            Log in
          				</Button>
                    </FormItem>
                </Form>
                <div style={{ textAlign: 'center' }}>
                    <Divider />New to AquaGrow?<br></br>
                    <Link to="/register">Register now!</Link>
                </div>
            </Card>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ authenticate }, dispatch);
}

const WrappedLoginForm = Form.create()(LoginForm);

export default connect(null, mapDispatchToProps)(WrappedLoginForm);