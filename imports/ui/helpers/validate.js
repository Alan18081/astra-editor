import * as EmailValidator from 'email-validator';
import {Meteor} from 'meteor/meteor';

export const validateLogin = ({email,password}) => {
  const errors = {};

  if(!email) {
    errors.email = 'You should provide email';
  }
  else if(!EmailValidator.validate(email)) {
    errors.email = 'You should provide proper email'
  }

  if(!password) {
    errors.password = 'You should provide password';
  }
  else if(password.length < 4) {
    errors.password = 'Your password should be at least 4 characters';
  }
  return errors;
};

export const validateRegister = ({email,name,password,confirmPassword}) => {
  const errors = {};

  if(!name) {
    errors.name = 'You should provide name';
  }
  else if(Meteor.users.findOne({username: name})) {
    errors.name = 'User with this name is already exists';
  }

  if(!email) {
    errors.email = 'You should provide email';
  }
  else if(!EmailValidator.validate(email)) {
    errors.email = 'You should provide valid email'
  }

  if(!password) {
    errors.password = 'You should provide password';
  }
  else if(password.length < 4) {
    errors.password = 'Your password should be at least 4 characters';
  }
  else if(password !== confirmPassword) {
    errors.password = 'Your passwords should match';
  }

  if(!confirmPassword) {
    errors.confirmPassword = 'You should provide password';
  }
  else if(confirmPassword.length < 4) {
    errors.confirmPassword = 'Your password should be at least 4 characters';
  }
  else if(password !== confirmPassword) {
    errors.confirmPassword = 'Your passwords should match';
  }

  return errors;
};

export const validateProject = ({title}) => {
  const errors = {};
  if(!title) {
    errors.name = 'You should provide title for project';
  }
  return errors;
};

export const validateFilename = ({name}) => {
  const errors = {};
  if(!name) {
    errors.name = 'You should provide name for your file';
  }
  return errors;
};