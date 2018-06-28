import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';

if(Meteor.isServer) {
  Accounts.onCreateUser((options,user) => {
    console.log('Options',options);
    console.log('User',user);
    user.profile = {
      avatar: 'images/default.jpg'
    };
    return user;
  });
}