import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Projects from '../../../../api/projects';

import Layout from '../../Layout/index';
import ProjectsList from '../../projects/ProjectsList/index';
import AddProject from '../AddProject/index';

class Dashboard extends Component {
  state = {
    foundProjects: []
  };
  render() {
    const {projects} = this.props;
    return (
      <Layout>
        <ProjectsList
          projects={projects}
        />
        <AddProject/>
      </Layout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('projects');
  Meteor.subscribe('users');
  return {
    projects: Projects.find().fetch()
  }
})(Dashboard);