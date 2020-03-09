import React, { useContext } from 'react';
import moment from 'moment';
import { DateRangesContext } from './DateRange/DateRangesContext';
import { CategoryContext } from './Category/CategoryContext';

const OutputFilterMsg = () => {
  const { selectedCategoryId, selectedCategory } = useContext(CategoryContext);
  const { startDate, endtDate } = useContext(DateRangesContext);
  // console.log(
  //   `Selected category ID: ${selectedCategoryId}\nSelected category: ${selectedCategory}`
  // );
  return (
    <>
      <div className="text-center">
        {`Selected time from ${moment(startDate).format('MMMM Do YYYY, h:mm a')} to ${moment(
          endtDate
        ).format('MMMM Do YYYY, h:mm a')}`}
      </div>
    </>
  );
};

export default OutputFilterMsg;
