import React from 'react';
import {withStyles} from '@material-ui/core';

import Logo from '../Logo/index';
import styles from './styles';

const Landing = ({classes}) => (
  <header className={classes.header}>
    <Logo/>
  </header>
);

export default withStyles(styles)(Landing);