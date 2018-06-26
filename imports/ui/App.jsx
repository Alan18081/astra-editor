import React, {Fragment} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {MuiThemeProvider} from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';

import Landing from './components/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';

const theme = createMuiTheme({});

const App = ({isAuth}) => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <Route path="/" exact component={Landing}/>
      {isAuth
        ? <Fragment>
            <Route path="/dashboard" component={Dashboard}/>
          </Fragment>
        : <Fragment>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
          </Fragment>
      }
    </MuiThemeProvider>
  </BrowserRouter>
);

export default withTracker(() => ({
  isAuth: Meteor.userId()
}))(App);