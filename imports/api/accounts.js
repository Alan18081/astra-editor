import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import {ServiceConfiguration} from 'meteor/service-configuration';
import config from '../config';

if(Meteor.isServer) {
  Accounts.onCreateUser((options,user) => {
    if(user.services.google) {
      user.avatar = user.services.google.picture;
      user.username = user.services.google.name;
    }
    else {
      user.avatar = '/images/default.jpg';
    }
    return user;
  });

  ServiceConfiguration.configurations.remove({
    service: 'google'
  });

  ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: config.googleClientId,
    secret: config.googleClientSecret
  });

  ServiceConfiguration.configurations.remove({
    service: 'github'
  });

  ServiceConfiguration.configurations.insert({
    service: 'github',
    clientId: config.githubClientId,
    secret: config.githubClientSecret
  });
}

