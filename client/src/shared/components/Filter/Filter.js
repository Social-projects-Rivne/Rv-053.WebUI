import React from 'react';
import DateFilter from './DateRange/DateFilter';
import CategoryFilter from './Category/CategoryFilter';

const Filter = () => {
  return (
    <form>
      <DateFilter />
      <CategoryFilter />
    </form>
  );
};

export default Filter;
