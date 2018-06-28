import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/core';

import Header from './dashboard/Header';

const styles = theme => ({
  content: {
    margin: theme.spacing.unit * 3,
  }
});

const Layout = ({classes,children}) => (
  <Fragment>
    <Header/>
    <main className={classes.content}>
      {children}
    </main>
  </Fragment>
);

export default withStyles(styles)(Layout);