import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import './style/index.css';
import Register from './components/Register.jsx';
import Login from './containers/Login.jsx';
import Dashboard from './containers/Dashboard.jsx';
import NotFound from './components/404.jsx';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();