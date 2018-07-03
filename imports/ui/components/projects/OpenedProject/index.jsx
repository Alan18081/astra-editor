import React, {Component,Fragment} from 'react';
import {Meteor} from 'meteor/meteor';
import Projects from '../../../../api/projects';
import {withTracker} from 'meteor/react-meteor-data';
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
    authorized: false
  };
  static getDerivedStateFromProps({project},state) {
    const userId = Meteor.userId();
    if (project) {
      const authorized = !!project.participants.find(({_id}) => _id === userId);
      return {
        ...state,
        authorized
      }
    }
    return state;
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  joinProject = () => {
    Meteor.call('projects.join',this.props.match.params.id,Meteor.userId(),err => {
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
    const {classes,project} = this.props;
    let content = (
      <div className={classes.loader}>
        <CircularProgress size={100}/>
      </div>
    );
    if(project) {
      content = (
        <Fragment>
          {/*<ProjectControls*/}
            {/*fontSize={this.state.fontSize}*/}
            {/*changeFontSize={this.handleChange}*/}
          {/*/>*/}
          <Editor
            fontSize={this.state.fontSize}
            project={project}
          />
        </Fragment>
      );
    }
    return (
      <Layout>
        {content}
        {/*<Dialog*/}
          {/*open={!this.state.authorized}*/}
          {/*className={classes.dialog}*/}
        {/*>*/}
          {/*<DialogTitle>Join project</DialogTitle>*/}
          {/*<DialogContent>*/}
            {/*<Button onClick={this.joinProject} variant="contained" color="primary" fullWidth>Join</Button>*/}
          {/*</DialogContent>*/}
        {/*</Dialog>*/}
      </Layout>
    );
  }
}

export default withTracker(({match}) => {
  Meteor.subscribe('projects');
  Meteor.subscribe('users');
  const project = Projects.findOne(match.params.id);
  if(project) {
    return {
      project,
      found: true
    }
  }
  return {};

})(jss(styles)(OpenedProject));