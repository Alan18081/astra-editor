import React, {Component} from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import {Meteor} from 'meteor/meteor';
import {
  withStyles,
  Grid,
  IconButton,
  Popover,
  MenuList,
  ListItemIcon,
  MenuItem,
  ListItemText,
  Paper,
  CircularProgress,
  Snackbar
} from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import styles from './styles';
import FilenameForm from "../FilenameForm/index";

class EditorPage extends Component {
  state = {
    anchorEl: null,
    saving: false,
    snackOpened: null,
    filenameChoosing: false
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
  handleSave = (editor,event) => {
    if(event.ctrlKey && event.key === 's') {
      event.preventDefault();
      const {projectId,type,code} = this.props;
      this.setState({
        saving: true
      });
      Meteor.call(
        'projects.saveCode',
        projectId,type,code,
        err => {
          this.setState({
            saving: false
          });
          if(err) {

          }
          else {
            this.setState({
              snackOpened: 'Code successfully saved'
            });
          }
        }
      )
    }
  };
  handleSnackClose = () => {
    this.setState({
      snackOpened: null
    });
  };
  handleDownloadFile = (filename = this.props.prevName) => {
    Meteor.call(
      'projects.saveFile',
      filename,this.props.ext,this.props.code,
      err => {
        if(err) {

        }
        else {
          console.log('Successfully downloaded');
        }
      })
  };
  showFilenameForm = () => {
    this.setState({
      filenameChoosing: true
    });
  };
  render() {
    const {classes,options,mode,fileTypes,handleChange,code} = this.props;
    const {anchorEl, saving} = this.state;
    return (
      <Grid item md={6} sm={12} xs={12} className={classes.column}>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={Boolean(this.state.snackOpened)}
          autoHideDuration={2000}
          onClose={this.handleSnackClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackOpened}</span>}
        />
        <FilenameForm
          open={this.state.filenameChoosing}
          save={this.handleDownloadFile}
          close={this.handleSnackClose}
        />
        <IconButton onClick={this.handleMenuOpen} className={classes.settings}>
          <SettingsIcon/>
        </IconButton>
        <Popover
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <MenuList>
            <MenuItem onClick={this.downloadFile}>
              <ListItemIcon>
                <CloudUploadIcon/>
              </ListItemIcon>
              <ListItemText>
                Upload file
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={this.handleDownloadFile}>
              <ListItemIcon>
                <CloudDownloadIcon/>
              </ListItemIcon>
              <ListItemText>
                Download file
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={this.showFilenameForm}>
              <ListItemIcon>
                <CloudDownloadIcon/>
              </ListItemIcon>
              <ListItemText>
                Download file as
              </ListItemText>
            </MenuItem>
          </MenuList>
        </Popover>
        <Paper>
          {saving && <CircularProgress className={classes.loader}/>}
          <CodeMirror
            value={code}
            onBeforeChange={handleChange}
            options={{
              ...options,
              mode,
              allowDropFileTypes: fileTypes
            }}
            onKeyDown={this.handleSave}
            className={classes.editor}
          />
        </Paper>
      </Grid>
    );
  }
}
export default withStyles(styles)(EditorPage);