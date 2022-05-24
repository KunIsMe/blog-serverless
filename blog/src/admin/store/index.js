import { createStore, combineReducers } from 'redux';
import commonReducer from './reducer';

const reducer = combineReducers({
    common: commonReducer
});

const store = createStore(reducer);

export default store;
