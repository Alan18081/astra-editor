import React from 'react';
import {AppBar,Toolbar,withStyles} from '@material-ui/core';

import Logo from '../../Logo/index';
import UserBlock from '../UserBlock/index';

import styles from './styles';

const Header = ({classes}) => (
  <AppBar position="static">
    <Toolbar className={classes.container}>
      <Logo small/>
      <UserBlock/>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);