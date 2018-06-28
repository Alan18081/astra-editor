import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Projects from '../../../api/projects';

import Layout from '../Layout';
import ProjectsList from '../projects/ProjectsList';
import AddProject from './AddProject';


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
  return {
    projects: Projects.find().fetch()
  }
})(Dashboard);