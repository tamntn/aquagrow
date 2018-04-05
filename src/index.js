import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import './style/index.css';
import Register from './containers/Register.jsx';
import Login from './containers/Login.jsx';
import Welcome from './components/Welcome.jsx';
import App from './containers/App.jsx';
import NotFound from './components/404.jsx';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/welcome" component={Welcome} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();