import { combineReducers } from 'redux';
import transactionList from './transactionList';
import transactionsFilter from './transactionFilter';
import message from './message';

const rootReducer = combineReducers({
  transactionList,
  transactionsFilter,
  message
});

export default rootReducer;
