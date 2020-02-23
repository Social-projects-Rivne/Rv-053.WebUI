import React, { useState, useEffect, useContext } from 'react';
import { CategoryContext } from './CategoryContext.js';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const CategoryFilter = () => {
  const classes = useStyles();
  const { setSelectedCategory } = useContext(CategoryContext);
  const { data } = useContext(CategoryContext);

  const getUnique = (arr, comp) => {
    const unique = arr
      //store the comparison values in array
      .map(e => e[comp])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
      .map(e => arr[e]);

    return unique;
  };

  const handleCategory = e => {
    e.preventDefault();
    setSelectedCategory(e.target.value);
  };

  const uniqueCategory = getUnique(data, 'category');

  return (
    <>
      <FormControl variant='filled' className={classes.formControl}>
        <InputLabel id='demo-simple-select-filled-label'>
          By category
        </InputLabel>
        <Select
          labelId='demo-simple-select-filled-label'
          id='demo-simple-select-filled'
          onChange={handleCategory}
          // onLoad={handleDate}
          className={classes.root}
        >
          {uniqueCategory.map(item => (
            <MenuItem key={item.id} value={item.category}>
              {item.category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default CategoryFilter;
