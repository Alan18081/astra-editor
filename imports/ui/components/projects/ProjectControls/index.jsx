import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  withStyles
} from '@material-ui/core';

import CopyLink from '../../CopyLink/index';

import styles from './styles';

const generateFontSizes = (start,end) => {
  let items = [];
  for(let i = start; i <= end; i++) {
    items.push(
      <MenuItem key={i} value={i}>{i}</MenuItem>
    );
  }
  return items;
};

const ProjectControls = ({classes,fontSize,changeFontSize,theme,changeTheme}) => (
  <div className={classes.container}>
    <FormControl className={classes.select}>
      <InputLabel htmlFor="fontSize">
        Font size
      </InputLabel>
      <Select
        value={fontSize}
        onChange={changeFontSize}
        inputProps={{
          name: 'fontSize',
          id: 'fontSize',
        }}
      >
        {generateFontSizes(8,25)}
      </Select>
    </FormControl>
    <FormControl className={classes.select}>
      <InputLabel htmlFor="fontSize">
        Font size
      </InputLabel>
      <Select
        value={fontSize}
        onChange={changeFontSize}
        inputProps={{
          name: 'fontSize',
          id: 'fontSize',
        }}
      >
        {generateFontSizes(8,25)}
      </Select>
    </FormControl>
    <div className={classes.copy}>
      <CopyLink text={location.href}/>
    </div>
  </div>
);

export default withStyles(styles)(ProjectControls);