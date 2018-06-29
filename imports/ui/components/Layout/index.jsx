import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/core';

import Header from '../dashboard/Header/index';

import styles from './styles';

const Layout = ({classes,children}) => (
  <Fragment>
    <Header/>
    <main className={classes.content}>
      {children}
    </main>
  </Fragment>
);

export default withStyles(styles)(Layout);