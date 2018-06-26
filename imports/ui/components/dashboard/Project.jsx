import React, {Component} from 'react';
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
  MenuItem
} from '@material-ui/core';
import moment from 'moment';
import jss from 'react-jss';

import PeopleIcon from '@material-ui/icons/People';
import MessageIcon from '@material-ui/icons/Message';
import CodeIcon from '@material-ui/icons/Code';

const styles = {
  head: {
    marginBottom: 15,
    display: 'flex',
    alignItems: 'center'
  },
  menu: {

  },
  caption: {
    flexGrow: 1
  }
};

class Project extends Component {
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
    const {classes,project: {title,lastVisited,participants,lines,messages}} = this.props;
    return (
      <Card>
        <CardContent>
          <div className={classes.head}>
            <div className={classes.caption}>
              <Typography variant="headline" color="primary">{title}</Typography>
              <Typography variant="caption">
                Last visited {moment(lastVisited).fromNow()}
              </Typography>
            </div>
            <div>
              <IconButton>
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
                <MenuItem onClick={this.handleClose}>
                  <ListItemIcon>
                    {/*<AccountIcon/>*/}
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    {/*<ExitIcon/>*/}
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
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
                {lines} {lines === 1 ? 'line' : 'lines'}
              </ListItemText>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    )
  }
};

export default jss(styles)(Project);