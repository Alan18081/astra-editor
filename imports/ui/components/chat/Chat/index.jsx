import React from 'react';
import {Paper,withStyles} from '@material-ui/core';

import ChatMessagesList from '../ChatMessagesList/index';
import SendMessage from '../SendMessage/index';

import styles from './styles';

const Chat = ({classes,messages,projectId}) => (
  <Paper className={classes.chat}>
    <ChatMessagesList messages={messages}/>
    <SendMessage projectId={projectId}/>
  </Paper>
);

export default withStyles(styles)(Chat);
