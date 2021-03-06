import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import HttpsRedirect from 'react-https-redirect';

import './style/index.css';
import Register from './containers/Register/Register.jsx';
import Login from './containers/Login/Login.jsx';
import App from './containers/App.jsx';
import NotFound from './components/404.jsx';
import FontAwesomeTest from './components/FontAwesomeTest.jsx';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <HttpsRedirect>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" component={App} />
                    <Route path="/system" component={App} />
                    <Route path="/portfolio" component={App} />
                    <Route path="/notifications" component={App} />
                    <Route path="/reminders" component={App} />
                    <Route path="/user" component={App} />
                    <Route path="/fa" component={FontAwesomeTest} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </HttpsRedirect>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();