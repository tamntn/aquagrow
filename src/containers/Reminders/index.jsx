/*
** TODO:
** - Edit Reminder Setting
** - Sort/Filter Table Column
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import titleCase from 'title-case';
import {
    Row,
    Col,
    Spin,
    Divider,
    List,
    Icon,
    Avatar,
    Table,
    Button,
    Modal,
    Form,
    Input,
    DatePicker,
    TimePicker,
    Select,
    notification
} from 'antd';
import { fetchReminders, deleteReminder, clearReminders } from '../../actions/action_reminder.js';
import { fetchReminderSetting, createReminderSetting, updateReminderSetting, deleteReminderSetting } from '../../actions/action_reminderSetting.js';
import { fetchUser } from '../../actions/action_user';
import './Reminder.css';
const { Column, ColumnGroup } = Table;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

notification.config({
    placement: 'topRight',
    top: 72,
    duration: 7,
});

class Reminders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingReminders: true,
            loadingReminderSettings: true,
            addModalVisible: false,
            editModalVisible: false,
            reminderSettingToBeEdited: null
        }
        this.onClearAllRemindersClick = this.onClearAllRemindersClick.bind(this);
        this.onDeleteReminderClick = this.onDeleteReminderClick.bind(this);
        this.onDeleteReminderSetting = this.onDeleteReminderSetting.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.handleAddNewReminder = this.handleAddNewReminder.bind(this);
        this.handleUpdateReminderSetting = this.handleUpdateReminderSetting.bind(this);
    }

    componentWillMount() {
        const currentUser = localStorage.getItem('username');
        this.props.fetchReminders(currentUser);
        this.props.fetchReminderSetting(currentUser);
    }

    componentDidUpdate() {
        if (this.state.loadingReminders === true) {
            this.setState({
                loadingReminders: false
            })
        }
        if (this.state.loadingReminderSettings === true) {
            this.setState({
                loadingReminderSettings: false
            })
        }
    }

    onDeleteReminderClick(key) {
        this.setState({
            loadingReminders: true
        })
        this.props.deleteReminder(localStorage.getItem('username'), key, () => {
            this.props.fetchUser(localStorage.getItem('username'));
        });
    }

    onClearAllRemindersClick() {
        this.props.clearReminders(localStorage.getItem('username'), () => {
            this.props.fetchUser(localStorage.getItem('username'));
        });
    }

    onDeleteReminderSetting(key) {
        this.setState({
            loadingReminderSettings: true
        })
        this.props.deleteReminderSetting(localStorage.getItem('username'), key);
    }

    showEditModal(record) {
        this.setState({
            editModalVisible: true,
            reminderSettingToBeEdited: record
        })
    }

    showAddModal() {
        this.setState({
            addModalVisible: true
        })
    }

    cancelModal() {
        this.setState({
            addModalVisible: false,
            editModalVisible: false,
            reminderSettingToBeEdited: null
        })
    }

    disabledDate(current) {
        // Can not select days before today
        return current && current < moment().startOf('day');
    }

    handleAddNewReminder() {
        this.props.form.validateFields(['time', 'date', 'timezone', 'repeat', 'message'], (err, values) => {
            if (!err) {
                this.setState({
                    loadingReminderSettings: true
                })
                const time = `${moment(values.date).format("MM-DD-YYYY")} ${moment(values.time).format("hh:mm a")}`;
                const newReminder = {
                    username: this.props.user.username,
                    name: this.props.user.name,
                    phoneNumber: this.props.user.phone,
                    message: values.message,
                    timeZone: values.timezone,
                    time: time,
                    repeat: values.repeat === "No" ? false : true,
                    repeatDuration: values.repeat === "No" ? null : values.repeat
                }

                this.props.createReminderSetting(localStorage.getItem('username'), newReminder);
                this.setState({
                    addModalVisible: false
                })
                notification.success({
                    message: "Successful 👏🏼",
                    description: `Your reminder for ${moment(values.time).format("hh:mm a")} will be sent ${values.repeat.toLowerCase() === "no" ? "on" : values.repeat.toLowerCase() + ",starting on "} ${moment(values.date).format("MMM Do")} ⏰`
                })
            }
        })
        this.props.form.resetFields();
    }

    handleUpdateReminderSetting() {
        this.props.form.validateFields(['editTime', 'editDate', 'editTimezone', 'editRepeat', 'editMessage'], (err, values) => {
            this.setState({
                loadingReminderSettings: true
            })
            const time = `${moment(values.editDate).format("MM-DD-YYYY")} ${moment(values.editTime).format("hh:mm a")}`;
            const updateValues = {
                message: values.editMessage,
                timeZone: values.editTimezone,
                time: time,
                repeat: values.editRepeat === "No" ? false : true,
                repeatDuration: values.editRepeat === "No" ? null : values.editRepeat
            }

            this.props.updateReminderSetting(localStorage.getItem('username'), this.state.reminderSettingToBeEdited._id, updateValues);
            this.setState({
                editModalVisible: false
            })
            notification.success({
                message: "Successful 👏🏼",
                description: "Your reminder setting has been updated! ⏰"
            })
        })
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Divider>Reminders</Divider>
                <Row>
                    <Col xs={0} sm={0} md={0} lg={0} xl={3} span={3} ></Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={18} span={18} className="reminder-container">
                        <h2>Reminders ({this.props.reminders.length})</h2>
                        <Divider />
                        <List
                            loading={this.state.loadingReminders}
                            itemLayout="horizontal"
                            dataSource={this.props.reminders}
                            renderItem={item => (
                                <List.Item actions={[<div onClick={() => this.onDeleteReminderClick(item._id)}><Icon type="close-circle-o" /></div>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            style={{ backgroundColor: "#096dd9" }}
                                            icon="bell"
                                        />}
                                        title={item.message}
                                        description={`Sent at ${moment(item.createdAt).format("hh:mm a (ddd, MMM DD)")}`}
                                    />
                                </List.Item>
                            )}
                        />
                        <br></br>
                        <h2>Reminder Settings ({this.props.reminderSetting.length})</h2>
                        <Divider />
                        <Table
                            pagination={false}
                            loading={this.state.loadingReminderSettings}
                            dataSource={this.props.reminderSetting}
                            rowKey="_id"
                            scroll={{ x: 800 }}
                        >
                            <Column
                                title="Time"
                                width={95}
                                fixed="left"
                                dataIndex="time"
                                key="time"
                                render={(text, record) => (
                                    <span>
                                        {momentTimezone(text).tz(record.timeZone).format("hh:mm a")}
                                    </span>
                                )}
                            />
                            <Column
                                title="Date"
                                width={90}
                                dataIndex="time"
                                key="date"
                                render={(text, record) => (
                                    <span>
                                        {moment(text).format('MM/DD/YY')}
                                    </span>
                                )}
                            />
                            <Column
                                title="Timezone"
                                width={155}
                                dataIndex="timeZone"
                                key="timeZone"
                            />
                            <Column
                                title="Repeat"
                                width={90}
                                dataIndex="repeatDuration"
                                key="repeat"
                                render={(text, record) => (
                                    <span>
                                        {text ? titleCase(text) : "No"}
                                    </span>
                                )}
                            />
                            <Column
                                title="Reminder Message"
                                dataIndex="message"
                                key="message"
                            />
                            <Column
                                title="Action"
                                fixed="right"
                                width={80}
                                key="action"
                                render={(text, record) => (
                                    <span>
                                        <a onClick={() => this.showEditModal(record)} ><Icon type="edit" /></a>
                                        <Divider type="vertical" />
                                        <a onClick={() => this.onDeleteReminderSetting(record._id)}><Icon type="close-circle-o" /></a>
                                    </span>
                                )}
                            />
                        </Table>
                        <div style={{ textAlign: "center", paddingTop: "24px" }}>
                            <Button
                                size="large"
                                type="primary"
                                onClick={this.showAddModal
                                }
                            >
                                Add a new reminder
                            </Button>
                        </div>
                        <Modal
                            title="Add a new reminder"
                            okText="Add new reminder"
                            okType="primary"
                            visible={this.state.addModalVisible}
                            onOk={this.handleAddNewReminder}
                            confirmLoading={this.state.modalConfirmLoading}
                            onCancel={this.cancelModal}
                        >
                            <Form
                                layout="vertical"
                                hideRequiredMark
                            >
                                <Row gutter={24}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} span={12}>
                                        <FormItem
                                            hasFeedback
                                            label="Reminder time"
                                        >
                                            {getFieldDecorator('time', {
                                                rules: [{
                                                    required: true, message: 'Please select reminder time!',
                                                }]
                                            })(
                                                <TimePicker
                                                    style={{ width: "100%" }}
                                                    placeholder="Select time"
                                                    defaultOpenValue={moment("00:00 am", "hh:mm a")}
                                                    format="hh:mm a"
                                                    size="large"
                                                />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} span={12}>
                                        <FormItem
                                            hasFeedback
                                            label="Reminder date"
                                        >
                                            {getFieldDecorator('date', {
                                                rules: [{
                                                    required: true, message: 'Please select reminder date!',
                                                }]
                                            })(
                                                <DatePicker
                                                    style={{ width: "100%" }}
                                                    disabledDate={this.disabledDate}
                                                    allowClear
                                                    placeholder="Select date"
                                                    format="MM-DD-YYYY"
                                                    size="large"
                                                />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <FormItem
                                    hasFeedback
                                    label="Timezone"
                                >
                                    {getFieldDecorator('timezone', {
                                        rules: [{
                                            required: true, message: 'Please pick your timezone!',
                                        }]
                                    })(
                                        <Select size="large" placeholder="Select your timezone">
                                            <Option value="America/New_York" disabled>America/New York</Option>
                                            <Option value="America/Chicago">America/Chicago</Option>
                                            <Option value="America/Los_Angeles" disabled>America/Los Angeles</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    hasFeedback
                                    label="Repeat"
                                >
                                    {getFieldDecorator('repeat', {
                                        rules: [{
                                            required: true, message: 'Please pick your repeat duration!',
                                        }]
                                    })(
                                        <Select size="large" placeholder="How often?">
                                            <Option value="No">No Repeat</Option>
                                            <Option value="Hourly">Hourly</Option>
                                            <Option value="Daily">Daily</Option>
                                            <Option value="Weekly">Weekly</Option>
                                            <Option value="Biweekly">Biweekly</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    hasFeedback
                                    label="Reminder message"
                                >
                                    {getFieldDecorator('message', {
                                        rules: [{
                                            required: true, message: 'Please provide your reminder message!',
                                        }]
                                    })(
                                        <TextArea size="large" rows={3} />
                                    )}
                                </FormItem>
                            </Form>
                        </Modal>
                        <Modal
                            title="Edit your reminder"
                            okText="Save"
                            okType="primary"
                            visible={this.state.editModalVisible}
                            onOk={this.handleUpdateReminderSetting}
                            onCancel={this.cancelModal}
                        >
                            <Form
                                layout="vertical"
                                hideRequiredMark
                            >
                                <Row gutter={24}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} span={12}>
                                        <FormItem
                                            hasFeedback
                                            label="Reminder time"
                                        >
                                            {getFieldDecorator('editTime', {
                                                initialValue: this.state.reminderSettingToBeEdited ? moment(this.state.reminderSettingToBeEdited.time) : null,
                                                rules: [{
                                                    required: true, message: 'Please select reminder time!',
                                                }]
                                            })(
                                                <TimePicker
                                                    style={{ width: "100%" }}
                                                    placeholder="Select time"
                                                    defaultOpenValue={moment("00:00 am", "hh:mm a")}
                                                    format="hh:mm a"
                                                    size="large"
                                                />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} span={12}>
                                        <FormItem
                                            hasFeedback
                                            label="Reminder date"
                                        >
                                            {getFieldDecorator('editDate', {
                                                initialValue: this.state.reminderSettingToBeEdited ? moment(this.state.reminderSettingToBeEdited.time) : null,
                                                rules: [{
                                                    required: true, message: 'Please select reminder date!',
                                                }]
                                            })(
                                                <DatePicker
                                                    style={{ width: "100%" }}
                                                    disabledDate={this.disabledDate}
                                                    allowClear
                                                    placeholder="Select date"
                                                    format="MM-DD-YYYY"
                                                    size="large"
                                                />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <FormItem
                                    hasFeedback
                                    label="Timezone"
                                >
                                    {getFieldDecorator('editTimezone', {
                                        initialValue: this.state.reminderSettingToBeEdited ? this.state.reminderSettingToBeEdited.timeZone : "Loading",
                                        rules: [{
                                            required: true, message: 'Please pick your timezone!',
                                        }]
                                    })(
                                        <Select size="large" placeholder="Select your timezone">
                                            <Option value="America/New_York" disabled>America/New York</Option>
                                            <Option value="America/Chicago">America/Chicago</Option>
                                            <Option value="America/Los_Angeles" disabled>America/Los Angeles</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    hasFeedback
                                    label="Repeat"
                                >
                                    {getFieldDecorator('editRepeat', {
                                        initialValue: this.state.reminderSettingToBeEdited && this.state.reminderSettingToBeEdited.repeatDuration ? this.state.reminderSettingToBeEdited.repeatDuration : "No",
                                        rules: [{
                                            required: true, message: 'Please pick your repeat duration!',
                                        }]
                                    })(
                                        <Select size="large" placeholder="How often?">
                                            <Option value="No">No Repeat</Option>
                                            <Option value="Hourly">Hourly</Option>
                                            <Option value="Daily">Daily</Option>
                                            <Option value="Weekly">Weekly</Option>
                                            <Option value="Biweekly">Biweekly</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    hasFeedback
                                    label="Reminder message"
                                >
                                    {getFieldDecorator('editMessage', {
                                        initialValue: this.state.reminderSettingToBeEdited ? this.state.reminderSettingToBeEdited.message : "Loading",
                                        rules: [{
                                            required: true, message: 'Please provide your reminder message!',
                                        }]
                                    })(
                                        <TextArea size="large" rows={3} />
                                    )}
                                </FormItem>
                            </Form>
                        </Modal>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={0} xl={3} span={3} ></Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        reminders: state.reminders,
        reminderSetting: state.reminderSetting
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchReminders,
        deleteReminder,
        clearReminders,
        fetchReminderSetting,
        createReminderSetting,
        updateReminderSetting,
        deleteReminderSetting,
        fetchUser
    }, dispatch);
}

const WrappedRemindersForm = Form.create()(Reminders);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRemindersForm);