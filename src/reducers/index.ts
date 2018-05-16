import { combineReducers } from 'redux';
import { transactionsReducer } from './transactionsReducers';

const rootReducer = combineReducers({
    transactionsReducer
});

export default rootReducer;