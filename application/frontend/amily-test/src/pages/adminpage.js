import * as React from "react";
import PropTypes from "prop-types";
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import withContext from 'recompose/withContext'; // You should add recompose/withContext to your dependencies
import { AuthContext, DataProviderContext, TranslationProvider, Resource, Notification } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import defaultMessages from 'ra-language-english';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import createAdminStore from './createAdminStore';
import messages from './i18n';
import authProvider from './myAuthProvider';

// your app components
import Dashboard from './Dashboard';
import { PostList, PostCreate, PostEdit, PostShow } from './Post';
import { CommentList, CommentEdit, CommentCreate } from './Comment';
import { UserList, UserEdit, UserCreate } from './User';

// dependency injection
const dataProvider = restProvider('http://path.to.my.api/');
const i18nProvider = polyglotI18nProvider(locale => {
    if (locale !== 'en') {
        return messages[locale];
    }
    return defaultMessages;
});
const history = createHashHistory();
const theme = createMuiTheme();

const App = () => (
    <Provider
        store={createAdminStore({
            authProvider,
            dataProvider,
            history,
        })}
    >

       <AuthContext.Provider value={authProvider}>
       <DataProviderContext.Provider value={dataProvider}>
       <TranslationProvider
           locale="en"
           i18nProvider={i18nProvider}
       >
           <ThemeProvider>
               <Resource name="posts" intent="registration" />
               <Resource name="comments" intent="registration" />
               <Resource name="users" intent="registration" />
               <AppBar position="static" color="default">
                   <Toolbar>
                       <Typography variant="h6" color="inherit">
                           My admin
                       </Typography>
                   </Toolbar>
               </AppBar>
               <ConnectedRouter history={history}>
                   <Switch>
                       <Route exact path="/" component={Dashboard} />
                       <Route exact path="/posts" render={(routeProps) => <PostList hasCreate resource="posts" basePath={routeProps.match.url} {...routeProps} />} />
                       <Route exact path="/posts/create" render={(routeProps) => <PostCreate resource="posts" basePath={routeProps.match.url} {...routeProps} />} />
                       <Route exact path="/posts/:id" render={(routeProps) => <PostEdit hasShow resource="posts" basePath={routeProps.match.url} id={decodeURIComponent((routeProps.match).params.id)} {...routeProps} />} />
                       <Route exact path="/posts/:id/show" render={(routeProps) => <PostShow hasEdit resource="posts" basePath={routeProps.match.url} id={decodeURIComponent((routeProps.match).params.id)} {...routeProps} />} />
                       <Route exact path="/comments" render={(routeProps) => <CommentList hasCreate resource="comments" basePath={routeProps.match.url} {...routeProps} />} />
                       <Route exact path="/comments/create" render={(routeProps) => <CommentCreate resource="comments" basePath={routeProps.match.url} {...routeProps} />} />
                       <Route exact path="/comments/:id" render={(routeProps) => <CommentEdit resource="comments" basePath={routeProps.match.url} id={decodeURIComponent((routeProps.match).params.id)} {...routeProps} />} />
                       <Route exact path="/users" render={(routeProps) => <UsersList hasCreate resource="users" basePath={routeProps.match.url} {...routeProps} />} />
                       <Route exact path="/users/create" render={(routeProps) => <UsersCreate resource="users" basePath={routeProps.match.url} {...routeProps} />} />
                       <Route exact path="/users/:id" render={(routeProps) => <UsersEdit resource="users" basePath={routeProps.match.url} id={decodeURIComponent((routeProps.match).params.id)} {...routeProps} />} />
                   </Switch>
               </ConnectedRouter>
               <Notification />
           </ThemeProvider>
       </TranslationProvider>
       </DataProviderContext.Provider>
       </AuthContext.Provider>
    </Provider>
);


export default withContext(
   {
       authProvider: PropTypes.object,
   },
   () => ({ authProvider })
)(App);