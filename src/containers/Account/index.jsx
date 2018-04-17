import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Spin, Card } from 'antd';
const { Meta } = Card;

class Account extends Component {
    render() {
        return (
            <div>
                <h1>Account Information</h1>
                <Row>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} span={8}>
                        <Card
                            // loading
                            hoverable
                            style={{ width: 250, maxWidth: 300 }}
                            cover={<img alt="example" src={this.props.user.pictureUrl} />}
                        >
                            <Meta
                                title={this.props.user.name}
                                description={this.props.user.username}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16} span={16}>
                        <Card
                            // loading
                            hoverable
                            style={{ width: 250, maxWidth: 300 }}
                            cover={<img alt="example" src={this.props.user.pictureUrl} />}
                        >
                            <Meta
                                title={this.props.user.name}
                                description={this.props.user.username}
                            />
                        </Card>
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

export default connect(mapStateToProps)(Account);