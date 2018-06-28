import {Meteor} from 'meteor/meteor';
import Schema from 'simpl-schema';

Schema.defineValidationErrorTransform(({message}) => {
  return new Meteor.Error(400,message);
});
