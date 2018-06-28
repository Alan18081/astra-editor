import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Link,withRouter} from 'react-router-dom';
import {
  Avatar,
  Typography,
  Badge,
  Button,
  Popover,
  MenuItem,
  ListItemText,
  ListItemIcon,
  withStyles
} from '@material-ui/core';
import {withTracker} from 'meteor/react-meteor-data';

import NotificationIcon from '@material-ui/icons/Notifications';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ExitIcon from '@material-ui/icons/ExitToApp';

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  block: {
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing.unit * 3
  },
  avatar: {
    marginRight: theme.spacing.unit
  },
  name: {
    color: '#fff'
  }
});

class UserBlock extends Component {
  state = {
    anchorEl: null
  };
  handleMenuOpen = event => {
    this.setState({
      anchorEl: event.currentTarget
    })
  };
  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  };
  handleLogout = () => {
    Meteor.logout();
    this.props.history.push('/login');
  };
  render() {
    const {classes,user} = this.props;
    let content = null;
    if(user) {
      content = (
        <div className={classes.container}>
          <Badge badgeContent={10}>
            <NotificationIcon/>
          </Badge>
          <Button className={classes.block} onClick={this.handleMenuOpen}>
            <Avatar src={user.profile.avatar} className={classes.avatar} />
            <Typography className={classes.name} variant="headline">{user.username}</Typography>
          </Button>
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
            <Link to="/profile">
              <MenuItem onClick={this.handleClose}>
                <ListItemIcon>
                  <AccountIcon/>
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
            </Link>
            <MenuItem onClick={this.handleLogout}>
              <ListItemIcon>
                <ExitIcon/>
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Popover>
        </div>
      );
    }
    return content;
  }
}

export default withTracker(() => ({
  user: Meteor.user()
}))(withStyles(styles)(withRouter(UserBlock)));