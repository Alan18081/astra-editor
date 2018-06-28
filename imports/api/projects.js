import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import Schema from 'simpl-schema';
import moment from 'moment';

const Projects = new Mongo.Collection('projects');

if(Meteor.isServer) {
  Meteor.publish('projects', function() {
    return Projects.find({
      participants: {
        $elemMatch: {
          $eq: this.userId
        }
      }
    });
  });
}

export default Projects;

Projects.helpers({
  participants() {
    return this.participants.map(id => Meteor.users.findOne(id));
  }
});

Meteor.methods({
  'projects.create'(title) {
    if(!Meteor.userId()) {
      throw new Meteor.Error(403,'unauthorized');
    }

    new Schema({
      title: {
        type: String,
        min: 1
      }
    }).validate({title});

    Projects.insert({
      title,
      lastVisited: moment().valueOf(),
      messages: [],
      participants: [Meteor.userId()],
      authorId: Meteor.userId(),
      html: '',
      css: '',
      javascript: ''
    });
  },
  'projects.join'(projectId,userId) {
    if(!Meteor.userId()) {
      throw new Meteor.Error(403,'unauthorized');
    }
    new Schema({
      projectId: {
        type: String,
        min: 1
      },
      userId: {
        type: String,
        min: 1
      }
    }).validate({projectId,userId});
    Projects.update(projectId,{
      $push: {
        participants: userId
      }
    });
  },
  'projects.findOne'(selector) {
    if(!Meteor.userId()) {
      throw new Meteor.Error(403,'unauthorized');
    }
    return Projects.findOne(selector);
  }
});