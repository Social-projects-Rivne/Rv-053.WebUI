import React, { useState, useContext, useReducer, useEffect } from 'react';
import { GET_ALL } from './DateReducer';
import moment from 'moment';
import { DateRangesContext } from './DateRangesContext';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const DateFilter = props => {
  const classes = useStyles();
  // const { dateRanges } = useContext(DateRangesContext);
  // const initialDateRange = dateRanges[0].type;
  // const [selectDateRange, setSelectDateRange] = useState(initialDateRange);
  // const { dispatch } = useContext(DateRangesContext);
  const { dateRanges, timeStamp, dispatch } = useContext(DateRangesContext);
  console.log({ timeStamp });
  const handleDate = e => {
    e.preventDefault();
    dispatch({
      type: e.target.value,
      timeStamp: {}
    });
    // setSelectDateRange(e.target.value);
  };
  useEffect(() => {
    dispatch({
      type: GET_ALL
    });
  }, []);

  return (
    <>
      <FormControl variant='filled' className={classes.formControl}>
        <InputLabel id='demo-simple-select-filled-label'>By date</InputLabel>
        <Select
          labelId='demo-simple-select-filled-label'
          id='demo-simple-select-filled'
          onChange={handleDate}
          onLoad={handleDate}
          className={classes.root}
        >
          {dateRanges.map(item => (
            <MenuItem key={item.id} value={item.type}>
              {item.dateRange}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default DateFilter;
