import React, {Component,Fragment} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {withStyles} from '@material-ui/core';

import Header from './Header';
import ProjectsList from './ProjectsList';
import AddProject from './AddProject';

const styles = theme => ({
  content: {
    padding: `0 ${theme.spacing.unit * 3}px 0`
  }
});

class Dashboard extends Component {
  state = {
    foundProjects: []
  };
  render() {
    const {classes} = this.props;
    return (
      <Fragment>
        <Header/>
        <main className={classes.content}>
          <ProjectsList
            projects={[
              {
                _id: 1213232,
                title: 'Test channel',
                lastVisited: 1230000,
                participants: [],
                messages: [],
                lines: 30
              }
            ]}
          />
          <AddProject/>
        </main>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard);