import { combineReducers } from 'redux';
import AuthenticationReducer from './reducer_authentication';
import UserReducer from './reducer_user';
import NotificationsReducer from './reducer_notification';
import RemindersReducer from './reducer_reminder';
import ReminderSettingReducer from './reducer_reminderSetting';
import MessagesReducer from './reducer_message';
import SystemReducer from './reducer_system';
import SensorDataReducer from './reducer_sensor_data';

const rootReducer = combineReducers({
    loggedIn: AuthenticationReducer,
    user: UserReducer,
    notifications: NotificationsReducer,
    reminders: RemindersReducer,
    reminderSetting: ReminderSettingReducer,
    messages: MessagesReducer,
    system: SystemReducer,
    sensorData: SensorDataReducer
});

export default rootReducer;
