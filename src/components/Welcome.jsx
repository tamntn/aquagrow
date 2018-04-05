import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Steps, Button, Icon, message } from 'antd';
import BackgroundImage from '../components/BackgroundImage.jsx';
import '../style/Welcome.css';
import WelcomeFirstContent from './WelcomeFirst';
import WelcomeSecondContent from './WelcomeLocation';
const Step = Steps.Step;

// Setup Alert Message Configuration
message.config({
    top: window.innerHeight * 10 / 100,
    duration: 3,
});

const steps = [{
    title: 'Welcome',
    content: (<WelcomeFirstContent />),
    icon: (<div className="welcome-icon-container"><Icon type="message" /></div>)
}, {
    title: 'Location',
    content: (<WelcomeSecondContent />),
    icon: (<div className="welcome-icon-container"><Icon type="compass" /></div>)
}, {
    title: 'Notifications',
    content: 'Third-content',
    icon: (<div className="welcome-icon-container"><Icon type="notification" /></div>)
}, {
    title: 'Profile',
    content: 'Last-content',
    icon: (<div className="welcome-icon-container"><Icon type="user" /></div>)
}];

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    render() {
        const { current } = this.state;
        const currentJWT = localStorage.getItem('jwt');
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
                    <Card title={stepsComponent} className="welcome-card">
                        <div className="steps-content">{steps[this.state.current].content}</div>
                        <div className="steps-action">
                            {
                                this.state.current < steps.length - 1
                                &&
                                <Button type="primary" onClick={() => this.next()}>Next</Button>
                            }
                            {
                                this.state.current === steps.length - 1
                                &&
                                <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                            }
                            {
                                this.state.current > 0
                                &&
                                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                    Previous
                                </Button>
                            }
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Welcome;