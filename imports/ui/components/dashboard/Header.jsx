import React from 'react';
import {AppBar,Toolbar,Grid} from '@material-ui/core';
import jss from 'react-jss';

import Logo from '../Logo';
import UserBlock from './UserBlock';

const styles = {
  container: {
    display: 'flex',
    '@media (max-width: 500px)' : {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },

};

const Header = ({classes}) => (
  <AppBar position="static">
    <Toolbar className={classes.container}>
      <Logo small/>
      <UserBlock/>
    </Toolbar>
  </AppBar>
);

export default jss(styles)(Header);