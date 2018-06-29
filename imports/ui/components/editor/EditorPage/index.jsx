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
    saved: false,
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
      this.setState({
        saving: true
      });
      Meteor.call(
        'projects.saveCode',
        this.props.projectId,this.props.type,this.props.code,
        err => {
          this.setState({
            saving: false
          });
          if(err) {

          }
          else {
            this.setState({
              saved: true
            });
          }
        }
      )
    }
  };
  handleSnackClose = () => {
    this.setState({
      saved: false
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
      <Grid item md={4} sm={12} xs={12} className={classes.column}>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.saved}
          autoHideDuration={2000}
          onClose={this.handleSnackClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Code successfully saved</span>}
        />
        <FilenameForm open={this.state.filenameChoosing} save={this.handleDownloadFile}/>
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