import React, {Component} from 'react';
import {Card,CardContent, withStyles,Input,IconButton} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {Meteor} from 'meteor/meteor';

import styles from './styles';

class SendMessage extends Component {
  state = {
    value: ''
  };
  handleChange = ({target: {value}}) => {
    this.setState({
      value
    });
  };
  handleSend = () => {
    if(!this.state.value.trim()) {
      return false;
    }
    Meteor.call('projects.sendMessage', this.props.projectId,this.state.value, err => {
      if(err) {

      }
      else {
        this.setState({
          value: ''
        });
      }
    });
  };
  render() {
    const {classes} = this.props;
    return (
      <Card>
        <CardContent className={classes.content}>
          <Input
            placeholder="Message"
            onChange={this.handleChange}
            value={this.state.value}
            className={classes.input}
          />
          <IconButton onClick={this.handleSend}>
            <SendIcon/>
          </IconButton>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(SendMessage);