import moment from 'moment';


export const toRestDate = (date) => {
  return moment(new Date(date)).format('YYYY-MM-DD');
};
