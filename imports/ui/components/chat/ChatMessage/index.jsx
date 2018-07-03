import React from 'react';
import moment from 'moment';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  withStyles,
  Paper
} from '@material-ui/core';

import styles from './styles';

const ChatMessage = ({classes,mine,message: {text,sentAt,sender}}) => (
  <ListItem className={[classes.message,mine ? classes.mine : classes.strange].join(' ')}>
      <ListItemAvatar className={[classes.avatar, mine ? classes.avatarLast : ''].join(' ')}>
        <Avatar src={sender.avatar}/>
      </ListItemAvatar>
      <Paper className={classes.content}>
        <ListItemText>
          <Typography variant="subheading" color="secondary">{sender.username}</Typography>
          <Typography variant="body1">{text}</Typography>
          <Typography variant="caption">{moment(sentAt).format('D.MM.Y')}</Typography>
        </ListItemText>
      </Paper>
  </ListItem>
);

export default withStyles(styles)(ChatMessage);