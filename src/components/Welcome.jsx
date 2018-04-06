import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Card, Steps, Button, Icon, Input, Upload, message } from 'antd';
import axios from 'axios';
import BackgroundImage from '../components/BackgroundImage.jsx';
import '../style/Welcome.css';
const Step = Steps.Step;
const FormItem = Form.Item;

// Setup Alert Message Configuration
message.config({
    top: window.innerHeight * 10 / 100,
    duration: 3,
});

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            disabled: true,
            zipCode: '',
            growZone: '',
            phone: '',
            picture: '',
        };
        this.checkGrowZone = this.checkGrowZone.bind(this);
    }

    componentDidUpdate() {
        const current = this.state.current;
        let actionButton;

        // Get the correct button (Next or Submit)
        if (current != 3) {
            actionButton = document.querySelector('#nextButton');
        } else {
            actionButton = document.querySelector('#submitButton');
        }

        if (current == 0) {
            actionButton.removeAttribute("disabled");
        } else {
            actionButton.setAttribute("disabled", "");
            switch (current) {
                case 1:
                    if (this.state.zipCode) {
                        actionButton.removeAttribute("disabled");
                    }
                case 2:
                    if (this.state.phone) {
                        actionButton.removeAttribute("disabled");
                    }
                case 3:
                    if (this.state.picture) {
                        actionButton.removeAttribute("disabled");
                    }
            }
        }
    }

    checkGrowZone(rule, value, callback) {
        if (value && value.length == 5) {
            axios.get(`https://aquagrow.life/api/zone/${value}`)
                .then((res) => {
                    if (res.data.error) {
                        this.setState({
                            disabled: true,
                            zipCode: '',
                            growZone: ''
                        });
                        callback(`We can't determine a grow zone with ${value} 😳`);
                    } else {
                        const growZone = res.data.data.zone;
                        this.setState({
                            disabled: false,
                            zipCode: value,
                            growZone
                        });
                        callback();
                    }
                })
        } else if (value.length > 5) {
            this.setState({
                disabled: true,
                zipCode: '',
                growZone: ''
            });
            callback('Please provide a 5-letter zip code!');
        } else {
            this.setState({
                disabled: true,
                zipCode: '',
                growZone: ''
            });
            callback();
        }
    }

    checkPhoneNumber() {
        let phone;
        setTimeout(() => {
            phone = this.props.form.getFieldValue('phone');
            if (phone.length === 10) {
                this.setState({
                    disabled: false,
                    phone
                })
            } else {
                this.setState({
                    disabled: true,
                    phone: ''
                })
            }
        }, 100);
    }

    next() {
        const current = this.state.current + 1;
        this.setState({
            current,
            disabled: true
        });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({
            current,
            disabled: true
        });
    }

    render() {
        const { current } = this.state;
        const { getFieldDecorator } = this.props.form;
        const growZone = this.state.growZone ? (
            <h4>✅ Your grow zone is: {this.state.growZone}</h4>
        ) : (
                <h4></h4>
            )
        const currentJWT = localStorage.getItem('jwt');

        const steps = [{
            title: 'Welcome',
            content: (
                <div className="steps-content-wrapper">
                    <div className="welcome-left-container">
                        <h2>Welcome to AquaGrow</h2>
                        <div className="welcome-description">
                            <p>We know you're excited and wanting to jump right in using your smart aquaponics system.
                            But first, we'll need some more information in order to provide you with the best experience and all available features.</p>
                        </div>
                    </div>
                    <div className="welcome-right-container">
                        <div className="welcome-picture"></div>
                    </div>
                </div>
            ),
            icon: (<div className="welcome-icon-container"><Icon type="message" /></div>)
        }, {
            title: 'Location',
            content: (
                <div className="steps-content-wrapper">
                    <div className="welcome-left-container">
                        <h3>Provide your zipcode</h3>
                        <FormItem>
                            {getFieldDecorator('zipCode', {
                                rules: [{
                                    required: true, message: 'Please input your zip code!'
                                }, {
                                    validator: this.checkGrowZone
                                }],
                                initialValue: this.state.zipCode
                            })(
                                <Input size="large" placeholder="Zip Code" />
                            )}
                        </FormItem>
                        <div className="welcome-description">
                            <p>We're using your zipcode to determine your grow zone.
                            Different plants strive in different places,
                            so we want to let you know which ones will grow best in your area!</p>
                        </div>
                        <div className="growzone-text">
                            {growZone}
                        </div>
                    </div>
                    <div className="welcome-right-container">
                        <div className="location-picture"></div>
                    </div>
                </div>
            ),
            icon: (<div className="welcome-icon-container"><Icon type="compass" /></div>)
        }, {
            title: 'Notifications',
            content: (
                <div className="steps-content-wrapper">
                    <div className="welcome-left-container">
                        <h3>Provide your phone number</h3>
                        <FormItem>
                            {getFieldDecorator('phone', {
                                rules: [{
                                    required: true, message: 'Please input your phone number!'
                                }, {
                                    len: 10, message: 'Please provide a 10-digit phone number'
                                }],
                                initialValue: this.state.phone
                            })(
                                <Input onChange={() => this.checkPhoneNumber()} size="large" placeholder="Cellphone" />
                            )}
                        </FormItem>
                        <div className="welcome-description">
                            <p>AquaGrow helps you monitor your aquaponics system from
                            anywhere. By enabling notifications via text messages, we'll
                            keep you up to date with your system even when you're not
                            connected to the Internet.</p>
                        </div>
                    </div>
                    <div className="welcome-right-container">
                        <div className="notifications-picture"></div>
                    </div>
                </div>
            ),
            icon: (<div className="welcome-icon-container"><Icon type="notification" /></div>)
        }, {
            title: 'Profile',
            content: (
                <div className="steps-content-wrapper">
                    <div className="welcome-left-container">
                        <h3>Upload your profile picture</h3>
                        <Upload>
                            <Button>
                                <Icon type="upload" /> Click to Upload
                            </Button>
                        </Upload>
                        <div className="welcome-description">
                            <p>Let's personalize your account and have fun!</p>
                        </div>
                    </div>
                    <div className="welcome-right-container">
                    </div>
                </div>
            ),
            icon: (<div className="welcome-icon-container"><Icon type="user" /></div>)
        }];

        const stepsComponent = (
            <div>
                <h2>Getting Started</h2>
                <Steps size="small" current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} icon={item.icon} />)}
                </Steps>
            </div >
        )

        // Redirect back to login page if not logged in
        if (!currentJWT) {
            message.destroy();
            message.error('Please log in first to access your AquaGrow account 😇');
            return <Redirect to='/login' />;
        }

        return (
            <div>
                <BackgroundImage />
                <div className="welcome-container">
                    <Card loading={false} title={stepsComponent} className="welcome-card">
                        <Form onSubmit={this.handleSubmit}>
                            <div className="steps-content">{steps[this.state.current].content}</div>
                            <div className="steps-action">
                                {
                                    this.state.current === 0
                                    &&
                                    <div className="button-previous">
                                    </div>
                                }
                                {
                                    this.state.current > 0
                                    &&
                                    <div className="button-previous">
                                        <Button size="large" onClick={() => this.prev()}><Icon type="left" />Go Back</Button>
                                    </div>
                                }
                                {
                                    this.state.current < steps.length - 1
                                    &&
                                    <div className="button-next">
                                        <Button id="nextButton" size="large" type="primary" onClick={() => this.next()}>Continue<Icon type="right" /></Button>
                                    </div>
                                }
                                {
                                    this.state.current === steps.length - 1
                                    &&
                                    <div className="button-next">
                                        <Button id="submitButton" size="large" type="primary" onClick={() => message.success('Processing complete!')}>Go To Your AquaGrow!</Button>
                                    </div>
                                }
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>
        );
    }
}

const WrappedWelcomeForm = Form.create()(Welcome);

export default WrappedWelcomeForm;