import React, { useContext, useEffect } from 'react';
import DateFilter from './DateRange/DateFilter';
import CategoryFilter from './Category/CategoryFilter';
import { DateRangesContext } from './DateRange/DateRangesContext';
import { CategoryContext } from './Category/CategoryContext';
import { useHistory } from 'react-router-dom';
import useQuery from '../../utilities/useQuery';
import mapToObject from '../../utilities/mapToObject';
import mergeObjects from '../../utilities/mergeObjects';
import toSearchString from '../../utilities/toSearchString';

const Filter = () => {
  const { endtDate: endDate, startDate } = useContext(DateRangesContext);
  const { selectedCategoryId } = useContext(CategoryContext);
  const filterHistory = useHistory();

  const queryMap = useQuery();
  const queryObject = mapToObject(queryMap);

  const filterParams = {
    startDate,
    endDate,
    category: selectedCategoryId !== 0 ? selectedCategoryId : undefined
  };

  const searchParams = mergeObjects(queryObject, filterParams);
  const url = toSearchString(searchParams);

  useEffect(() => {
    filterHistory.push(`/events?${url}`);
  }, [url, filterHistory]);

  return (
    <form className='form-inline d-flex justify-content-between'>
      <DateFilter />
      <CategoryFilter />
    </form>
  );
};

export default Filter;
