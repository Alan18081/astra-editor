import React from 'react';
import CodeIcon from '@material-ui/icons/Code';
import jss from 'react-jss';

const styles = {
  logo: {
    fontFamily: '"Space Mono", monospace',
    display: 'flex',
    alignItems: 'center',
    fontSize: 30,
    color: '#fff'
  },
  small: {
    fontSize: 20,
    flexGrow: 1
  },
  icon: {
    margin: {
      right: 10
    }
  }
};

const Logo = ({classes,small}) => (
  <div className={[classes.logo,small ? classes.small : null].join(' ')}>
    <CodeIcon className={classes.icon}/>
    Astra Editor
  </div>
);

export default jss(styles)(Logo);