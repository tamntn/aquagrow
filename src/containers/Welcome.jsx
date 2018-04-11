import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Form, Card, Steps, Button, Icon, Input, Upload, message } from 'antd';
import axios from 'axios';
import BackgroundImage from '../components/BackgroundImage.jsx';
import { logout, fetchUser } from '../actions/action_user';
import { apiRoutes } from '../config';
import '../style/Welcome.css';
const { rootUrl } = apiRoutes;
const Step = Steps.Step;
const FormItem = Form.Item;

// Setup Alert Message Configuration
message.config({
    top: window.innerHeight * 10 / 100,
    duration: 5,
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
            pictureUrl: '',
            fileList: [],
            systemName: '',
            submitting: false,
        };
        this.validateGrowZone = this.validateGrowZone.bind(this);
        this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
        this.validateSystemName = this.validateSystemName.bind(this);
    }

    componentWillMount() {
        const currentUser = localStorage.getItem('username');
        if (currentUser) {
            this.props.fetchUser(currentUser);
        }
    }

    componentDidUpdate() {
        const current = this.state.current;
        let actionButton;

        // Get the correct button (Next or Submit)
        if (current !== 3) {
            actionButton = document.querySelector('#nextButton');
        } else {
            actionButton = document.querySelector('#submitButton');
        }

        if (current === 0) {
            actionButton.removeAttribute("disabled");
        } else {
            actionButton.setAttribute("disabled", "");
            switch (current) {
                case 1:
                    if (this.state.zipCode) {
                        actionButton.removeAttribute("disabled");
                    }
                    break;
                case 2:
                    if (this.state.phone) {
                        actionButton.removeAttribute("disabled");
                    }
                    break;
                case 3:
                    if (this.state.fileList.length === 1 && this.state.systemName) {
                        actionButton.removeAttribute("disabled");
                    }
                    break;
                default:
                    break;
            }
        }
    }

    handleSubmit() {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });

        this.setState({
            submitting: true,
        });

        axios.post(`${rootUrl}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            // We need to update user info
            const pictureUrl = res.data.secure_url;
            const updateValues = {
                zipCode: this.state.zipCode,
                zone: this.state.growZone,
                phone: this.state.phone,
                pictureUrl
            }

            return axios.put(`${rootUrl}/user/${localStorage.getItem('username')}`, updateValues)
        }).then((res) => {
            // Send welcome message to the provided message
            return axios.post(`${rootUrl}/sms/welcome`, {
                phone: this.state.phone,
                name: this.props.user.name
            })
        }).then((res) => {
            // And create a new system and push that system into the user
            message.success('User information has successfully updated 🎉');
            return axios.post(`${rootUrl}/system`, {
                username: localStorage.getItem('username'),
                systemName: this.state.systemName
            })
        }).then((res) => {
            // Wait a second for better user experience
            setTimeout(() => {
                message.success('New system has been initiated 🐟☘️');
                this.setState({
                    submitting: false,
                });
                this.props.setUserInitialSetupToTrue();
            }, 1500)
        }).catch((err) => {
            this.setState({
                submitting: false,
            });
            message.error('Failed to submit form. Please try again 🤭');
            message.error(err);
        })
    }

    // Logout and redirect to /login page
    handleLogout() {
        this.props.logout(() => {
            this.props.history.push('/login');
        });
    }

    validateGrowZone(rule, value, callback) {
        if (value && value.length === 5) {
            axios.get(`${rootUrl}/zone/zip/${value}`)
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
        } else if (value) {
            this.setState({
                disabled: true,
                zipCode: '',
                growZone: ''
            });
            callback('Please provide a 5-digit zip code!');
        } else {
            callback();
        }
    }

    validatePhoneNumber(rule, value, callback) {
        if (value.length === 10) {
            this.setState({
                disabled: false,
                phone: value
            })
            callback();
        } else if (value) {
            this.setState({
                disabled: true,
                phone: ''
            })
            callback('Please provide a 10-digit phone number');
        } else {
            callback();
        }
    }

    validateSystemName(rule, value, callback) {
        if (value && value.length > 5) {
            this.setState({
                disabled: false,
                systemName: value
            })
            callback();
        } else if (value) {
            this.setState({
                disabled: true,
                systemName: ''
            })
            callback('System name is too short!');
        } else {
            callback();
        }
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
        const { submitting } = this.state;
        const { getFieldDecorator } = this.props.form;
        const growZone = this.state.growZone ? (
            <h4><span role="img">✅</span> Your grow zone is: {this.state.growZone}</h4>
        ) : (
                <h4>&nbsp;</h4>
            )

        const uploadProps = {
            action: `${rootUrl}/upload`,
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
            type: "file",
            accept: "image/*",
            multiple: false
        };

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
                        <FormItem
                            hasFeedback
                        >
                            {getFieldDecorator('zipCode', {
                                rules: [{
                                    required: true, message: 'Please input your zip code!'
                                }, {
                                    validator: this.validateGrowZone
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
                        <FormItem
                            hasFeedback
                        >
                            {getFieldDecorator('phone', {
                                rules: [{
                                    required: true, message: 'Please input your phone number!'
                                }, {
                                    validator: this.validatePhoneNumber
                                }],
                                initialValue: this.state.phone
                            })(
                                <Input addonBefore="+1" size="large" placeholder="Cellphone" />
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
            icon: (<div className="welcome-icon-container"><Icon type="bell" /></div>)
        }, {
            title: 'Profile',
            content: (
                <div className="steps-content-wrapper">
                    <div className="welcome-left-container">
                        <h3>Customize your profile</h3>
                        <FormItem>
                            <Upload {...uploadProps}>
                                <Button
                                    size="large"
                                    disabled={this.state.fileList.length === 1}
                                >
                                    <Icon type="upload" /> Select Profile Picture
                            </Button>
                            </Upload>
                        </FormItem>
                        <FormItem
                            hasFeedback
                        >
                            {getFieldDecorator('systemName', {
                                rules: [{
                                    required: true, message: 'Please name your aquaponics system!'
                                }, {
                                    validator: this.validateSystemName
                                }],
                                initialValue: this.state.systemName
                            })(
                                <Input size="large" placeholder="System Name" />
                            )}
                        </FormItem>
                        <div className="welcome-description">
                            <p>Final step to make the system truly yours. You can always edit the these information later.</p>
                        </div>
                    </div>
                    <div className="welcome-right-container">
                        <div className="profile-setup-picture"></div>
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
            </div>
        )

        if (!currentJWT) {
            message.destroy();
            message.error('Please log in first to access your AquaGrow account 😇');
        }

        return (
            <div>
                {currentJWT ? (
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
                                                <Button size="large" type="danger" onClick={() => this.handleLogout()}>
                                                    <Icon type="logout" />Log out
                                                </Button>
                                            </div>
                                        }
                                        {
                                            this.state.current > 0
                                            &&
                                            <div className="button-previous">
                                                <Button size="large" onClick={() => this.prev()}>
                                                    <Icon type="left" />Go back
                                                </Button>
                                            </div>
                                        }
                                        {
                                            this.state.current < steps.length - 1
                                            &&
                                            <div className="button-next">
                                                <Button id="nextButton" size="large" type="primary" onClick={() => this.next()}>
                                                    Continue<Icon type="right" />
                                                </Button>
                                            </div>
                                        }
                                        {
                                            this.state.current === steps.length - 1
                                            &&
                                            <div className="button-next">
                                                <Button id="submitButton" size="large" type="primary" onClick={() => this.handleSubmit()} loading={submitting}>
                                                    {submitting ? 'Processing' : 'Finish!'}
                                                </Button>
                                            </div>
                                        }
                                    </div>
                                </Form>
                            </Card>
                        </div>
                    </div>
                ) : (
                        <Redirect to='/login' />
                    )}
            </div>
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

const WrappedWelcomeForm = Form.create()(Welcome);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedWelcomeForm));