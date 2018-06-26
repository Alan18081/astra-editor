import React from 'react';
import jss from 'react-jss';

import Logo from './Logo';

const styles = {
  header: {
    backgroundImage: 'url("images/landing.jpg")',
    height: '100vh',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: {
      top: 20
    }
  }
};

const Landing = ({classes}) => (
  <header className={classes.header}>
    <Logo/>
  </header>
);

export default jss(styles)(Landing);