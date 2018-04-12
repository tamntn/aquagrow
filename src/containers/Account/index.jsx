import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Spin, Card } from 'antd';
const { Meta } = Card;

class Account extends Component {
    render() {
        return (
            <div>
                <h1>Account Information</h1>
                <Row
                    type="flex" justify="center" align="middle"
                >
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} span={12}>
                        <Card
                            // loading
                            hoverable
                            style={{ maxWidth: 300 }}
                            cover={<img alt="example" src={this.props.user.pictureUrl} />}
                        >
                            <Meta
                                title={this.props.user.name}
                                description={this.props.user.username}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} span={12}>

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