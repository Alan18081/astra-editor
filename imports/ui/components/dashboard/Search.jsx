import React from 'react';
import {TextField, InputAdornment} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export default ({onSearch}) => (
  <TextField
    label="Search"
    inputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon/>
        </InputAdornment>
      )
    }}
  />
);