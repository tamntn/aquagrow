export const apiRoutes = {
    rootUrl: 'https://aquagrow.life/api'
}

export const mainRoutes = {
    apiRoot: 'https://aquagrow.life/api',
    apiDocumentation: 'https://aquagrow.life/developers',
    landingPage: 'https://aquagrow.life/',
    appHomepage: 'https://app.aquagrow.life/'
}

export const actionTypes = {
    // User Action
    FETCH_USER: 'fetch_user',
    UPDATE_USER: 'update_user',
    DELETE_USER: 'delete_user',
    REGISTER: 'register',
    AUTHENTICATE: 'authenticate',
    LOGOUT: 'logout',
    // Notification Action
    FETCH_NOTIFICATIONS: 'fetch_notifications',
    DELETE_NOTIFICATION: 'delete_notification',
    CLEAR_NOTIFICATIONS: 'clear_notifiations',
    // Reminder Action
    FETCH_REMINDERS: 'fetch_reminders',
    DELETE_REMINDER: 'delete_reminder',
    CLEAR_REMINDERS: 'clear_reminders',
    // Reminder Setting Action
    FETCH_REMINDER_SETTING: 'fetch_reminderSetting',
    CREATE_REMINDER_SETTING: 'create_reminderSetting',
    DELETE_REMINDER_SETTING: 'delete_reminderSetting',
    CLEAR_REMINDER_SETTING: 'clear_reminderSetting',
    // Message Action
    FETCH_MESSAGES: 'fetch_messages',
    DELETE_MESSAGE: 'delete_message',
    CLEAR_MESSAGES: 'clear_messages',
}