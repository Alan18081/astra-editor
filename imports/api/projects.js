import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import Schema from 'simpl-schema';
import moment from 'moment';
import saveFile from 'save-file';

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
  },
  'projects.saveCode'(id,type,code) {
    new Schema({
      id: {
        type: String,
        min: 1
      },
      type: {
        type: String,
        min: 1
      },
      code: {
        type: String,
        min: 1
      }
    }).validate({id,type,code});
    Projects.update(id, {
      $set: {
        [type]: code
      }
    });
  },
  'projects.saveFile'(filename = 'index',ext,code) {
    new Schema({
      ext: {
        type: String,
        min: 1
      },
      code: {
        type: String,
        min: 1
      }
    }).validate({ext,code});
    saveFile(code,`${filename}.${ext}`,err => {
      if(err) throw new Meteor.Error(err.message);
    });
  }
});