import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import Schema from 'simpl-schema';
import moment from 'moment';
import saveFile from 'save-file';

const Projects = new Mongo.Collection('projects', {
  transform(project) {
    project.participants = project.participants.map(id => Meteor.users.findOne(id));
    return project;
  }
});

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

// Projects.helpers({
//   participants() {
//     console.log(this.participants);
//     return this.participants.map(id => Meteor.users.findOne(id));
//   }
// });

export default Projects;

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
      }
    }).validate({projectId});
    Projects.update(projectId,{
      $addToSet: {
        participants: Meteor.userId()
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
    let finalName = filename;
    const extReg = new RegExp(`.${ext}`);
    if(!filename.find(extReg)) {
      finalName = `${filename}.${ext}`;
    }
    saveFile(code,finalName,err => {
      if(err) throw new Meteor.Error(err.message);
    });
  },
  'projects.sendMessage'(id,text) {
    if(!Meteor.userId()) {
      throw new Meteor.Error(403,'unauthorized');
    }
    new Schema({
      id: {
        type: String,
        min: 1
      },
      text: {
        type: String,
        min: 1
      }
    });
    const sender = Meteor.user();
    const message = {
      text,
      sender: {
        avatar: sender.profile.avatar,
        username: sender.username,
        _id: sender._id
      },
      sentAt: moment().valueOf()
    };
    Projects.update(id,{
      $push: {messages: message}
    });
  }
});