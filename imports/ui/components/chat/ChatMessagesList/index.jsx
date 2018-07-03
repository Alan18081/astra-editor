import React from 'react';
import {withStyles,List} from '@material-ui/core';
import {Meteor} from 'meteor/meteor';

import ChatMessage from '../ChatMessage/index';

import styles from './styles';

const ChatMessagesList = ({classes,messages}) => (
  <List className={classes.bg}>
    {messages.map(message => (
      <ChatMessage
        key={message.sentAt}
        message={message}
        mine={message.sender._id === Meteor.userId()}
      />
    ))}
  </List>
);

export default withStyles(styles)(ChatMessagesList);