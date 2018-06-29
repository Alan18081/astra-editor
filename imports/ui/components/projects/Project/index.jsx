import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Popover,
  Avatar,
  ListItemAvatar,
  withStyles
} from '@material-ui/core';
import moment from 'moment';
import {Meteor} from 'meteor/meteor';

import PeopleIcon from '@material-ui/icons/People';
import MessageIcon from '@material-ui/icons/Message';
import CodeIcon from '@material-ui/icons/Code';

import styles from './styles';

class Project extends Component {
  state = {
    anchorEl: null,
    participants: []
  };
  handleMenuOpen = event => {
    this.setState({
      anchorEl: event.currentTarget
    })
  };
  async componentDidMount() {
    const participants = this.props.project.participants.map(id => {
      return Meteor.users.findOne(id);
    });
    this.setState({
      participants
    });
  }
  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  };
  render() {
    const {
      classes,
      project: {
        _id,title,lastVisited,lines,messages
      }} = this.props;
    return (
      <Link to={`/projects/${_id}`}>
        <Card className={classes.container}>
          <CardContent>
            <div className={classes.head}>
              <div className={classes.caption}>
                <Typography variant="headline" color="primary">{title}</Typography>
                <Typography variant="caption">
                  Last visited {moment(lastVisited).fromNow()}
                </Typography>
              </div>
              <div>
                <IconButton onClick={this.handleMenuOpen}>
                  <PeopleIcon/>
                </IconButton>
                <Popover
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  <List>
                    {this.state.participants.map(({username,profile: {avatar}}) => (
                      <ListItem onClick={this.handleClose}>
                        <ListItemAvatar>
                          <Avatar src={avatar}/>
                        </ListItemAvatar>
                        <ListItemText>{username}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Popover>
              </div>
            </div>
            <List>
              <ListItem>
                <ListItemIcon>
                  <MessageIcon/>
                </ListItemIcon>
                <ListItemText>
                  {messages.length} {messages.length === 1 ? 'message' : 'messages'}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon/>
                </ListItemIcon>
                <ListItemText>
                  {lines} {lines === 1 ? 'line' : 'lines'} of code
                </ListItemText>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Link>
    )
  }
};

export default withStyles(styles)(Project);