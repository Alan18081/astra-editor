import React from 'react';
import {TextField, InputAdornment} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export default ({onSearch,query}) => (
  <TextField
    label="Search"
    onChange={onSearch}
    value={query}
    inputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon/>
        </InputAdornment>
      )
    }}
  />
);