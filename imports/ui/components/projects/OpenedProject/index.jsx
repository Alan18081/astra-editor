import React, {Component,Fragment} from 'react';
import {Meteor} from 'meteor/meteor';
import {
  CircularProgress,
  withStyles,
  DialogContent,
  DialogTitle,
  Dialog,
  Button
} from '@material-ui/core';
import jss from 'react-jss';

import ProjectControls from '../ProjectControls/index';
import Layout from '../../Layout/index';
import Editor from '../../editor/Editor/index';

import styles from './styles';

class OpenedProject extends Component {
  state = {
    fontSize: 14,
    authorized: false,
    project: null
  };
  componentDidMount() {
    Meteor.call('projects.findOne',{_id: this.props.match.params.id}, (err,project) => {
      if(err) {

      }
      else if(project) {
        const authorized = project.participants.find(id => id === Meteor.userId());
        this.setState({
          authorized: !!authorized,
          project
        });
      }
    });

  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  joinProject = () => {
    Meteor.call('projects.join',Meteor.userId(),err => {
      if(err) {

      }
      else {
        this.setState({
          authorized: true
        });
      }
    });
  };
  render() {
    const {project} = this.state;
    const {classes} = this.props;
    let content = (
      <div className={classes.loader}>
        <CircularProgress size={100}/>
      </div>
    );
    if(project) {
      content = (
        <Fragment>
          <ProjectControls
            fontSize={this.state.fontSize}
            changeFontSize={this.handleChange}
          />
          <Editor
            fontSize={this.state.fontSize}
            projectId={this.props.match.params.id}
          />
          <Dialog
            open={!this.state.authorized}
            className={classes.dialog}
          >
            <DialogTitle>{project.title}</DialogTitle>
            <DialogContent>
              <Button onClick={this.joinProject} variant="contained" color="primary" fullWidth>Join</Button>
            </DialogContent>
          </Dialog>
        </Fragment>
      );
    }
    return (
      <Layout>
        {content}
      </Layout>
    );
  }
}

export default jss(styles)(OpenedProject);