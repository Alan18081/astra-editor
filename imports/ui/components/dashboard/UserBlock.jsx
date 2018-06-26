import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router-dom';
import {
  Avatar,
  Typography,
  Badge,
  Button,
  Popover,
  MenuItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import {withTracker} from 'meteor/react-meteor-data';
import jss from 'react-jss';

import NotificationIcon from '@material-ui/icons/Notifications';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ExitIcon from '@material-ui/icons/ExitToApp';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  block: {
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    margin: {
      left: 20
    }
  },
  avatar: {
    margin: {
      right: 10
    }
  },
  name: {
    color: '#fff'
  },
  menu: {
    margin: {
      top: 20
    }
  }
};

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
            <Avatar src={user.avatar} className={classes.avatar} />
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
            <MenuItem onClick={() => Meteor.logout()}>
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
  user: Meteor.users.findOne(Meteor.userId())
}))(jss(styles)(UserBlock));