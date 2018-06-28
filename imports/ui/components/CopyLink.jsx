import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Button,withStyles} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

const styles = theme => ({
  btnIcon: {
    marginRight: theme.spacing.unit
  }
});

class CopyLink extends Component {
  state = {
    copied: false
  };
  handleCopy = () => {
    clearTimeout(this.timer);
    this.setState({
      copied: true
    });
    this.timer = setTimeout(() => {
      this.setState({
        copied: false
      });
    },1000);
  };
  render() {
    const {classes,text} = this.props;
    return (
      <CopyToClipboard text={text} onCopy={this.handleCopy}>
        <Button variant={this.state.copied ? 'contained' : 'outlined'} color="primary">
          <LinkIcon className={classes.btnIcon}/>
          {this.state.copied ? 'Copied' : 'Copy link'}
        </Button>
      </CopyToClipboard>
    )
  }
}

export default withStyles(styles)(CopyLink);