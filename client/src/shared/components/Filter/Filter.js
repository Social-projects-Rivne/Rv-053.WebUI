import React, { useContext, useEffect } from 'react';
import DateFilter from './DateRange/DateFilter';
import CategoryFilter from './Category/CategoryFilter';
import { DateRangesContext } from './DateRange/DateRangesContext';
import { CategoryContext } from './Category/CategoryContext';
import { useHistory } from 'react-router-dom';

const Filter = () => {
  const { endtDate, startDate } = useContext(DateRangesContext);
  const { selectedCategoryId } = useContext(CategoryContext);
  const filterHistory = useHistory();
  const url = `startDate=${startDate}&endDate=${endtDate}&category=${
    selectedCategoryId !== 0 ? selectedCategoryId : ''
  }`;

  useEffect(() => {
    filterHistory.push(`/events?${url}`);
  }, [url, filterHistory]);

  return (
    <form className="form-inline d-flex justify-content-between">
      <DateFilter />
      <CategoryFilter />
    </form>
  );
};

export default Filter;
