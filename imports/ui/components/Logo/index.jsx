import React from 'react';
import CodeIcon from '@material-ui/icons/Code';
import {withStyles} from '@material-ui/core';

import styles from './styles';

const Logo = ({classes,small}) => (
  <div className={[classes.logo,small ? classes.small : null].join(' ')}>
    <CodeIcon className={classes.icon}/>
    Astra Editor
  </div>
);

export default withStyles(styles)(Logo);