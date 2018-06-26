import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Redirect} from 'react-router-dom';

export default (ChildComponent) => {
  const AuthComponent = ({isAuth}) => isAuth
    ? <ChildComponent/>
    : <Redirect to="/login"/>
  return withTracker(() => ({
    isAuth: Meteor.userId()
  }))(AuthComponent);
};