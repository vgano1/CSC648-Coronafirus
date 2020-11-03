import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

// redux, react-router, redux-form, saga, and material-ui
// form the 'kernel' on which admin-on-rest runs
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

// prebuilt admin-on-rest features
import {
    adminReducer,
    localeReducer,
    crudSaga,
    simpleRestClient,
    Delete,
    TranslationProvider,
    declareResources,
} from 'admin-on-rest';

// your app components
import Dashboard from './Dashboard';
import { PostList, PostCreate, PostEdit, PostShow } from './Post';
import { CommentList, CommentEdit, CommentCreate } from './Comment';
import { UserList, UserEdit, UserCreate } from './User';
// your app labels
import messages from './i18n';

// create a Redux app
const reducer = combineReducers({
    admin: adminReducer,
    locale: localeReducer(),
    form: formReducer,
    routing: routerReducer,
});
const sagaMiddleware = createSagaMiddleware();
const history = createHistory();
const store = createStore(reducer, undefined, compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
));
store.dispatch(declareResources([{ name: 'posts' }, { name: 'comments' }, { name: 'users' }]));
const restClient = simpleRestClient('http://path.to.my.api/');
sagaMiddleware.run(crudSaga(restClient));

// bootstrap redux and the routes
const App = () => (
    <Provider store={store}>
        <TranslationProvider messages={messages}>
            <ConnectedRouter history={history}>
                <MuiThemeProvider>
                    <AppBar title="My Admin" />
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/posts" hasCreate render={(routeProps) => <PostList resource="posts" {...routeProps} />} />
                        <Route exact path="/posts/create" render={(routeProps) => <PostCreate resource="posts" {...routeProps} />} />
                        <Route exact path="/posts/:id" hasShow hasDelete render={(routeProps) => <PostEdit resource="posts" {...routeProps} />} />
                        <Route exact path="/posts/:id/show" hasEdit render={(routeProps) => <PostShow resource="posts" {...routeProps} />} />
                        <Route exact path="/posts/:id/delete" render={(routeProps) => <Delete resource="posts" {...routeProps} />} />
                        <Route exact path="/comments" hasCreate render={(routeProps) => <CommentList resource="comments" {...routeProps} />} />
                        <Route exact path="/comments/create" render={(routeProps) => <CommentCreate resource="comments" {...routeProps} />} />
                        <Route exact path="/comments/:id" hasDelete render={(routeProps) => <CommentEdit resource="comments" {...routeProps} />} />
                        <Route exact path="/comments/:id/delete" render={(routeProps) => <Delete resource="comments" {...routeProps} />} />
                        <Route exact path="/users" hasCreate render={(routeProps) => <UsersList resource="users" {...routeProps} />} />
                        <Route exact path="/users/create" render={(routeProps) => <UsersCreate resource="users" {...routeProps} />} />
                        <Route exact path="/users/:id" hasDelete render={(routeProps) => <UsersEdit resource="users" {...routeProps} />} />
                        <Route exact path="/users/:id/delete" render={(routeProps) => <Delete resource="users" {...routeProps} />} />
                    </Switch>
                </MuiThemeProvider>
            </ConnectedRouter>
        </TranslationProvider>
    </Provider>
);