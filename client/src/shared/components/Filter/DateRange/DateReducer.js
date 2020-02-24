import moment from 'moment';

export const GET_ALL = 'GET_All';
export const GET_TODAY = 'GET_TODAY';
export const GET_SEVEN = 'GET_SEVEN';
export const GET_THIRTY = 'GET_THIRTY';

const convertToTimeStamp = (start, end) => {
  const first = moment()
    .startOf('day')
    .add(start, 'day')
    .valueOf();
  const last = moment()
    .endOf('day')
    .add(end, 'day')
    .valueOf();
  return { first, last };
};

export const dateReducer = (state, action) => {
  switch (action.type) {
    case 'GET_All':
      return {
        startDate: convertToTimeStamp(0, 365).first,
        endDate: convertToTimeStamp(0, 365).last
      };
    case 'GET_TODAY':
      return {
        startDate: convertToTimeStamp(0, 0).first,
        endDate: convertToTimeStamp(0, 0).last
      };
    case 'GET_SEVEN':
      return {
        startDate: convertToTimeStamp(0, 7).first,
        endDate: convertToTimeStamp(0, 7).last
      };
    case 'GET_THIRTY':
      return {
        startDate: convertToTimeStamp(0, 30).first,
        endDate: convertToTimeStamp(0, 30).last
      };
    default:
      return {
        startDate: convertToTimeStamp(0, 365).first,
        endDate: convertToTimeStamp(0, 365).last
      };
  }
};
